import torch
import torch.nn as nn
from typing import Dict, Any
import numpy as np

class BotClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(10, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        return self.layers(x)
    
    def predict(self, features: Dict[str, Any]) -> float:
        feature_vector = self._preprocess_features(features)
        with torch.no_grad():
            prediction = self(torch.FloatTensor(feature_vector))
        return float(prediction.item())
    
    def _preprocess_features(self, features: Dict[str, Any]) -> np.ndarray:
        return np.array([
            features.get('request_frequency', 0),
            features.get('pattern_regularity', 0),
            features.get('user_agent_consistency', 0),
            features.get('mouse_movements', 0),
            # ... other bot detection features
        ])