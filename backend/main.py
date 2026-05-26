import io
import json
from pathlib import Path

import torch
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from torchvision import transforms

from model import MultimodalDementiaModel

# ---------------- config ----------------
ASSETS = Path(__file__).parent / "assets"
WEIGHTS_PATH  = ASSETS / "neurodetect_mri.pth"
CLASSMAP_PATH = ASSETS / "class_map.json"
IMG_SIZE = 192  # must match training
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# ---------------- load class map ----------------
if not CLASSMAP_PATH.exists():
    raise FileNotFoundError(
        f"Missing {CLASSMAP_PATH}. Download class_map.json from Kaggle "
        f"and place it in backend/assets/"
    )

with open(CLASSMAP_PATH) as f:
    name_to_idx = json.load(f)
idx_to_name = {v: k for k, v in name_to_idx.items()}
NUM_CLASSES = len(idx_to_name)

# ---------------- load model once at startup ----------------
if not WEIGHTS_PATH.exists():
    raise FileNotFoundError(
        f"Missing {WEIGHTS_PATH}. Download neurodetect_mri.pth from Kaggle "
        f"and place it in backend/assets/"
    )

model = MultimodalDementiaModel(num_classes=NUM_CLASSES).to(DEVICE)
model.load_state_dict(torch.load(WEIGHTS_PATH, map_location=DEVICE))
model.eval()
print(f"Model loaded on {DEVICE}. Classes: {idx_to_name}")

# Same preprocessing as training/validation
preprocess = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std =[0.229, 0.224, 0.225],
    ),
])

# ---------------- FastAPI app ----------------
app = FastAPI(title="Neuro Detect AI", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Neuro Detect AI API. POST an MRI to /predict."}


@app.get("/health")
def health():
    return {
        "status": "ok",
        "device": DEVICE,
        "num_classes": NUM_CLASSES,
        "classes": idx_to_name,
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(400, "File must be an image (jpg/png)")

    raw = await file.read()
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGB")
    except Exception:
        raise HTTPException(400, "Could not decode image")

    tensor = preprocess(img).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        logits = model(tensor)                       # speech_seq=None
        probs  = torch.softmax(logits, dim=1)[0]
        top_idx = int(probs.argmax().item())

    return {
        "predicted_class": idx_to_name[top_idx],
        "confidence": round(float(probs[top_idx]), 4),
        "all_probabilities": {
            idx_to_name[i]: round(float(probs[i]), 4)
            for i in range(NUM_CLASSES)
        },
    }