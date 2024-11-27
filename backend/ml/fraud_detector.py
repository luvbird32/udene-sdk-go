import tensorflow as tf
import torch
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib
import os

class FraudDetector:
    def __init__(self):
        self.tf_model = self._load_tensorflow_model()
        self.torch_model = self._load_pytorch_model()
        self.scaler = StandardScaler()
        
    def _load_tensorflow_model(self):
        # Simple TF model for fraud detection
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=(10,)),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])
        model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        return model

    def _load_pytorch_model(self):
        # Simple PyTorch model for fraud detection
        class PyTorchModel(torch.nn.Module):
            def __init__(self):
                super().__init__()
                self.layers = torch.nn.Sequential(
                    torch.nn.Linear(10, 64),
                    torch.nn.ReLU(),
                    torch.nn.Dropout(0.2),
                    torch.nn.Linear(64, 32),
                    torch.nn.ReLU(),
                    torch.nn.Linear(32, 1),
                    torch.nn.Sigmoid()
                )
            
            def forward(self, x):
                return self.layers(x)
        
        return PyTorchModel()

    def preprocess_features(self, features):
        """Preprocess input features"""
        # Convert features to numpy array and reshape
        features_array = np.array(list(features.values())).reshape(1, -1)
        return self.scaler.fit_transform(features_array)

    def predict_fraud_probability(self, features):
        """Predict fraud probability using ensemble of TF and PyTorch models"""
        # Preprocess features
        processed_features = self.preprocess_features(features)
        
        # TensorFlow prediction
        tf_input = tf.convert_to_tensor(processed_features, dtype=tf.float32)
        tf_pred = self.tf_model.predict(tf_input, verbose=0)[0][0]
        
        # PyTorch prediction
        torch_input = torch.FloatTensor(processed_features)
        with torch.no_grad():
            torch_pred = self.torch_model(torch_input).item()
        
        # Ensemble prediction (average of both models)
        ensemble_pred = (tf_pred + torch_pred) / 2
        
        return {
            'probability': float(ensemble_pred),
            'is_fraudulent': ensemble_pred > 0.5,
            'confidence': abs(0.5 - ensemble_pred) * 2  # Scale confidence 0-1
        }

# Initialize global detector instance
detector = FraudDetector()