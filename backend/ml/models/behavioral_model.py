import tensorflow as tf
import numpy as np
from sklearn.ensemble import IsolationForest
from typing import Dict, Any

class BehavioralAnomalyDetector:
    def __init__(self):
        self.isolation_forest = IsolationForest(
            contamination=0.1,
            random_state=42
        )
        self._build_neural_network()
    
    def _build_neural_network(self):
        self.nn_model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu', input_shape=(20,)),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])
        self.nn_model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
    
    def predict(self, features: Dict[str, Any]) -> float:
        feature_vector = self._preprocess_features(features)
        isolation_score = self.isolation_forest.predict([feature_vector])[0]
        nn_score = self.nn_model.predict([feature_vector], verbose=0)[0][0]
        return (float(isolation_score) + float(nn_score)) / 2
    
    def _preprocess_features(self, features: Dict[str, Any]) -> np.ndarray:
        # Convert behavioral features to numerical vector
        return np.array([
            features.get('login_frequency', 0),
            features.get('transaction_velocity', 0),
            features.get('device_changes', 0),
            features.get('location_variance', 0),
            # ... other behavioral features
        ])