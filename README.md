# 🧠 NeuroDetect AI: Hybrid Multi-Modal Deep Learning for Early Dementia Detection

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-indigo)](https://react.dev/)
[![Express](https://img.shields.io/badge/Backend-Express%20%2B%20TSX-green)](https://expressjs.com/)
[![PyTorch](https://img.shields.io/badge/Model-PyTorch%202.x-red)](https://pytorch.org/)

**NeuroDetect AI** is a state-of-the-art hybrid multi-modal deep learning platform designed for the early detection and classification of dementia. By integrating structural spatial data from **3D MRI scans** with temporal acoustic data from **spontaneous speech recordings**, the system creates a holistic, highly robust patient profile. 

The application consists of a high-fidelity interactive **Clinical Dashboard** (React/Vite/Express) paired with a **Hybrid Deep Learning Pipeline** implemented in PyTorch.

---

## 🏛️ Deep Learning Model Architecture

Dementia manifests both structurally (brain atrophy visible in MRI scans) and cognitively (linguistic and acoustic deficits in speech). NeuroDetect AI utilizes a **dual-branch late-fusion neural network** that extracts rich embeddings from these orthogonal domains, applies a self-attention mechanism, and classifies patients into three diagnostic categories:
1. **Cognitive Normal (CN)**
2. **Mild Cognitive Impairment (MCI)**
3. **Alzheimer's Disease (AD)**

```mermaid
graph TD
    %% Define Styles
    classDef input fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;
    classDef mri fill:#eff6ff,stroke:#2563eb,stroke-width:2px,color:#1d4ed8;
    classDef speech fill:#ecfdf5,stroke:#059669,stroke-width:2px,color:#047857;
    classDef fusion fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px,color:#6d28d9;
    classDef output fill:#fff7ed,stroke:#ea580c,stroke-width:2px,color:#c2410c;

    %% Branch 1: MRI Scans
    A1[3D T1-Weighted MRI Volume] -->|Slice Extraction| A2[2D Axial Slices]
    A2 --> A3[Parallel CNN Backbone]
    subgraph Branch 1: Spatial Path (MRI)
        A3 -->|Feature Extractor| A3a[Pre-trained ResNet-50]
        A3 -->|Feature Extractor| A3b[Pre-trained Inception-V3]
        A3a & A3b -->|Concatenate & GAP| A4[Slice Feature Vectors]
        A4 -->|Spatial Sequence| A5[Bidirectional LSTM]
        A5 -->|Final Hidden State| A6[MRI Embedding <br> 512-D Vector]
    end

    %% Branch 2: Speech
    B1[Spontaneous Speech Audio] -->|Preprocessing| B2[VAD & MFCC Extraction]
    B2 --> B3[2D Spectrogram Tensor]
    subgraph Branch 2: Acoustic Path (Speech)
        B3 --> B4[2D Convolutional Blocks]
        B4 -->|Local Acoustic Patterns| B5[Temporal LSTM Network]
        B5 -->|Final Hidden State| B6[Speech Embedding <br> 512-D Vector]
    end

    %% Fusion and Classifier
    A6 & B6 -->|Concatenate| C1[Joint Vector <br> 1024-D]
    subgraph Late Fusion & Classification
        C1 --> C2[Self-Attention Layer]
        C2 -->|Attended Features| C3[Dense Layer 512-D]
        C3 -->|ReLU + Dropout 0.4| C4[Dense Layer 256-D]
        C4 -->|Softmax Classifier| C5[Output Layer 3-D]
    end

    %% Final Outputs
    C5 --> D1[Cognitive Normal - CN]
    C5 --> D2[Mild Cognitive Impairment - MCI]
    C5 --> D3[Alzheimer's Disease - AD]

    class A1,A2 input;
    class B1,B2,B3 input;
    class A3,A3a,A3b,A4,A5,A6 mri;
    class B4,B5,B6 speech;
    class C1,C2,C3,C4,C5 fusion;
    class D1,D2,D3 output;
```

### 🧠 Branch 1: Spatial MRI Path (CNN-LSTM)
* **Goal**: Extract spatial structural changes, particularly hippocampal shrinkage and ventricular enlargement.
* **Feature Extraction**: 3D MRI volumes (such as those from the **OASIS** or **ADNI** databases) are decomposed into a sequence of 2D axial slices. Each slice is processed by parallel pre-trained backbones (**ResNet-50** and **Inception-v3**) to extract coarse and fine textural features. Global Average Pooling (GAP) produces a unified representation per slice.
* **Sequence Modeling**: The sequential slice features are fed into a **Bidirectional LSTM** to capture the continuous 3D spatial dependencies across the brain's z-axis. The final hidden state generates a robust **512-D MRI-embedding**.

### 🎤 Branch 2: Temporal Speech Path (CNN-LSTM)
* **Goal**: Analyze speech features to identify cognitive-linguistic decline (e.g., increased pausing, phonetic errors, or slowed articulation).
* **Feature Extraction**: Spontaneous speech audio (e.g., from the **DementiaBank Pitt Corpus**) undergoes Voice Activity Detection (VAD) followed by 40-coefficient **Mel-Frequency Cepstral Coefficients (MFCCs)** extraction over 25ms windows.
* **Sequence Modeling**: The MFCC feature matrix is passed through a **2D CNN** (2-3 blocks) to extract local phonetic patterns, which are then modeled chronologically by a **temporal LSTM** to capture long-term speaking dynamics. This generates a **512-D Speech-embedding**.

### 🤝 Joint Fusion & Attention Block
* **Feature Fusion**: Late fusion concatenates the MRI and Speech embeddings into a **1024-D joint vector**.
* **Attention Mechanism**: A custom self-attention network computes weights for the fused features, dynamically emphasizing the modality that displays stronger diagnostic signals.
* **MLP Classifier**: The attended features pass through fully-connected layers (`FC(512) -> ReLU -> Dropout(0.4) -> FC(256) -> FC(3)`) to yield class probabilities via a Softmax layer.

---

## 💻 Interactive Clinical Dashboard

NeuroDetect AI features a premium, responsive medical dashboard built using **React 19**, **Tailwind CSS**, and **Framer Motion**, served via an **Express** server in development.

### 🌟 Key Dashboard Features
1. **Interactive Clinical Inference**: Upload a patient's T1 MRI scan (axial slice sequence) and speech recording (audio wav file) to perform real-time mock inferences.
2. **Dynamic Visualizer**: Interactive visualizations of ResNet-50 activation maps, speech spectrogram overlays, and LSTM sequence signals.
3. **Architecture Walkthrough**: Comprehensive, component-by-component breakdowns of each neural network branch directly inside the UI.
4. **Dataset Integration Details**: Guide on how to plug in **Kaggle OASIS** and **DementiaBank Pitt** datasets.
5. **Real-time Metrics**: Displays loss/accuracy curves, confusion matrices, and ROC-AUC curve visualizers.

---

## 📁 Repository Structure

```text
├── src/
│   ├── App.tsx          # High-fidelity React 19 Clinical Dashboard
│   ├── main.tsx         # Frontend React entrypoint
│   └── index.css        # Core Tailwind CSS configuration
├── backend.py           # PyTorch deep learning training & model definition
├── server.ts            # Express server (handles routing, mock inference, Vite SPA)
├── package.json         # Node.js workspace dependencies & scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite bundler configurations
└── README.md            # Interactive documentation (this file)
```

---

## 🚀 Quick Start Guide

### 1. Running the Interactive Dashboard (Node.js)

#### **Prerequisites**
* Node.js (v18 or higher recommended)
* npm or yarn

#### **Installation & Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/ScriptOrbit-132/Neuro-Detect-AI.git
   cd Neuro-Detect-AI
   ```
2. Install front-end and back-end dependencies:
   ```bash
   npm install
   ```
3. Set your environment variables (optional - copies `.env.example` to `.env`):
   ```bash
   cp .env.example .env
   ```
4. Start the interactive development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the Clinical Dashboard.

---

### 2. Running the Deep Learning Pipeline (Python/PyTorch)

The PyTorch code resides in `backend.py` and outlines the custom `DementiaMultimodalDataset` and `MultimodalDementiaModel`.

#### **Prerequisites**
* Python 3.8+
* CUDA-enabled GPU (Highly recommended for training)

#### **Installation & Training**
1. Create a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
2. Install PyTorch and required Python scientific packages:
   ```bash
   pip install torch torchvision pandas pillow numpy pandas
   ```
3. Prepare your datasets:
   * **OASIS MRI Dataset**: Download the [Kaggle OASIS Image Dataset](https://www.kaggle.com/datasets/ninadaithal/imagesoasis) and place it in `./dataset/imagesoasis/Data`.
   * **DementiaBank Speech Dataset**: Request access and download the [Pitt Corpus](https://dementia.talkbank.org/access/English/Pitt.html), extract acoustic MFCCs, and place them in `./dataset/DementiaBank/Pitt/MFCCs`.
   * **Metadata file**: Place your linking metadata CSV at `./dataset/train_metadata.csv`.
4. Run the training setup script:
   ```bash
   python backend.py
   ```

---

## 📜 Academic Reference & License

This project is licensed under the **Apache License 2.0**. Feel free to use, modify, and distribute this codebase for academic and clinical research.
Testing GitHub Pull Request Achievement
First contribution for Pull Shark achievement 🚀
Second contribution for Pull Shark achievement 🦈🚀
