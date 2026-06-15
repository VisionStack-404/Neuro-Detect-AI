import os
import torch
import torch.nn as nn
import torchvision.models as models
from torch.utils.data import Dataset, DataLoader
import pandas as pd
from PIL import Image
import numpy as np

# ==========================================
# DATASETS: Where the data is loaded and used

class DementiaMultimodalDataset(Dataset):
    """
    Custom PyTorch Dataset that loads both MRI (ADNI/OASIS)
    and Speech features (DementiaBank).
    """
    def __init__(self, metadata_csv, mri_dir, speech_dir, transform=None):
        # The metadata CSV contains filenames and labels linking the two datsets
        self.metadata = pd.read_csv(metadata_csv)
        self.mri_dir = mri_dir
        self.speech_dir = speech_dir
        self.transform = transform

    def __len__(self):
        return len(self.metadata)

    def __getitem__(self, idx):
        row = self.metadata.iloc[idx]
        
        # 1. Load the dataset for Branch 1 (OASIS / ADNI MRI)
        mri_path = os.path.join(self.mri_dir, row['mri_filename'])
        # Load 2D/3D MRI slide (converting to RGB for ResNet compatibility here)
        mri_image = Image.open(mri_path).convert('RGB')
        
        if self.transform:
            mri_image = self.transform(mri_image)
            
        # 2. Load the dataset for Branch 2 (DementiaBank MFCCs / Cognitive array)
        speech_path = os.path.join(self.speech_dir, row['speech_filename'])
        # Load pre-extracted acoustic features (e.g., shape: [frames, features])
        speech_features = np.load(speech_path) 
        speech_tensor = torch.tensor(speech_features, dtype=torch.float32)
        
        # 3. Label (e.g., 0=CN, 1=MCI, 2=AD)
        label = torch.tensor(row['label'], dtype=torch.long)
        
        return mri_image, speech_tensor, label

# ==========================================
# ARCHITECTURE: The Hybrid Deep Learning Model
# ==========================================
class MultimodalDementiaModel(nn.Module):
    def __init__(self, tabular_input_dim=128, lstm_hidden_dim=256, num_classes=3):
        super(MultimodalDementiaModel, self).__init__()
        
        # --- MRI Branch (Image Learning - ResNet50) ---
        resnet = models.resnet50(pretrained=True)
        self.mri_feature_extractor = nn.Sequential(*list(resnet.children())[:-1])
        self.mri_fc = nn.Linear(resnet.fc.in_features, 512)
        
        # --- Cognitive/Speech Branch (LSTM) ---
        self.lstm = nn.LSTM(
            input_size=tabular_input_dim, 
            hidden_size=lstm_hidden_dim, 
            num_layers=2, 
            batch_first=True, 
            dropout=0.3
        )
        self.speech_fc = nn.Linear(lstm_hidden_dim, 512)
        
        # --- Fusion Layer ---
        fusion_dim = 1024 # 512 (MRI) + 512 (Speech)
        self.attention = nn.Sequential(
            nn.Linear(fusion_dim, fusion_dim),
            nn.Tanh(),
            nn.Linear(fusion_dim, 1),
            nn.Softmax(dim=1)
        )
        
        # --- Classification Layer ---
        self.classifier = nn.Sequential(
            nn.Linear(fusion_dim, 256),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(256, num_classes)
        )

    def forward(self, mri_imgs, speech_seq):
        # 1. Branch 1 Processing
        x_mri = self.mri_feature_extractor(mri_imgs)     # [batch, 2048, 1, 1]
        x_mri = x_mri.view(x_mri.size(0), -1)            
        mri_vec = torch.relu(self.mri_fc(x_mri))         # [batch, 512]
        
        # 2. Branch 2 Processing
        lstm_out, (hn, cn) = self.lstm(speech_seq)
        last_hidden = hn[-1]                             
        speech_vec = torch.relu(self.speech_fc(last_hidden)) # [batch, 512]
        
        # 3. Fusion & Attention
        fused_vector = torch.cat((mri_vec, speech_vec), dim=1) # [batch, 1024]
        attn_weights = self.attention(fused_vector)
        attended_features = fused_vector * attn_weights
        
        # 4. Final Output
        logits = self.classifier(attended_features)
        
        return logits

# ==========================================
# EXECUTION: Training Pipeline Setup & Paths
# ==========================================
if __name__ == "__main__":
    from torchvision import transforms

    # --- 1. Define Dataset Paths Here ---
    # MRI (Image) Dataset: OASIS Image Dataset from Kaggle
    # Download from: https://www.kaggle.com/datasets/ninadaithal/imagesoasis
    MRI_DATA_DIR = "./dataset/imagesoasis/Data"
    
    # Speech Dataset: DementiaBank Pitt Corpus
    # Download from: https://dementia.talkbank.org/access/English/Pitt.html
    # (Requires access request, followed by local MFCC extraction)
    SPEECH_DATA_DIR = "./dataset/DementiaBank/Pitt/MFCCs"
    
    # Metadata CSV mapping MRI images to their corresponding Audio/Speech features
    METADATA_CSV_PATH = "./dataset/train_metadata.csv"

    print("--- Initializing Dementia Hybrid Model ---")
    print(f"Loading MRI data from Kaggle OASIS: {MRI_DATA_DIR}")
    print(f"Loading Speech data from DementiaBank Pitt: {SPEECH_DATA_DIR}")

    # --- 2. Initialize Transforms & Dataset ---
    mri_transforms = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    train_dataset = DementiaMultimodalDataset(
        metadata_csv=METADATA_CSV_PATH,
        mri_dir=MRI_DATA_DIR,
        speech_dir=SPEECH_DATA_DIR,
        transform=mri_transforms
    )

    # --- 3. Create DataLoader ---
    train_dataloader = DataLoader(train_dataset, batch_size=16, shuffle=True)

    # --- 4. Initialize Model ---
    # Assuming MFCC features have 40 coefficients per frame
    model = MultimodalDementiaModel(tabular_input_dim=40, lstm_hidden_dim=256, num_classes=3)
    
    # --- 5. Evaluation / Accuracy Calculation Loop (Example) ---
    def calculate_accuracy(model, data_loader, device='cpu'):
        model.eval()
        correct = 0
        total = 0
        with torch.no_grad():
            for mri_imgs, speech_seq, labels in data_loader:
                mri_imgs, speech_seq, labels = mri_imgs.to(device), speech_seq.to(device), labels.to(device)
                
                outputs = model(mri_imgs, speech_seq)
                _, predicted = torch.max(outputs.data, 1)
                
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
                
        accuracy = 100 * correct / total
        return accuracy

    print("Model and DataLoaders are ready for the training loop!")
    # Example usage after training:
    # val_accuracy = calculate_accuracy(model, val_dataloader)
    # print(f"Validation Accuracy: {val_accuracy:.2f}%")
