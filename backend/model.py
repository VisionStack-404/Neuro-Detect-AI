import torch
import torch.nn as nn
from torchvision import models
from torchvision.models import ResNet50_Weights


class MultimodalDementiaModel(nn.Module):
    """
    Hybrid MRI + Speech architecture (Speech branch present for parity but
    optional at inference). Matches the architecture used in training on Kaggle.
    """

    def __init__(self, tabular_input_dim=40, lstm_hidden_dim=256, num_classes=4):
        super().__init__()

        # --- MRI Branch ---
        resnet = models.resnet50(weights=ResNet50_Weights.DEFAULT)
        self.mri_feature_extractor = nn.Sequential(*list(resnet.children())[:-1])
        self.mri_fc = nn.Linear(resnet.fc.in_features, 512)

        # --- Speech Branch (kept for architecture parity, unused at MRI-only inference) ---
        self.lstm = nn.LSTM(
            tabular_input_dim,
            lstm_hidden_dim,
            num_layers=2,
            batch_first=True,
            dropout=0.3,
        )
        self.speech_fc = nn.Linear(lstm_hidden_dim, 512)

        # --- Classifier ---
        self.classifier = nn.Sequential(
            nn.Linear(1024, 256),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(256, num_classes),
        )

    def forward(self, mri_imgs, speech_seq=None):
        x = self.mri_feature_extractor(mri_imgs).flatten(1)
        mri_vec = torch.relu(self.mri_fc(x))

        if speech_seq is None:
            speech_vec = torch.zeros(mri_vec.size(0), 512, device=mri_vec.device)
        else:
            _, (hn, _) = self.lstm(speech_seq)
            speech_vec = torch.relu(self.speech_fc(hn[-1]))

        fused = torch.cat([mri_vec, speech_vec], dim=1)
        return self.classifier(fused)