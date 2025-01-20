import numpy as np
from typing import Dict, List, Any
from .base_fraud_model import BaseFraudModel

class NeuralFraudModel(BaseFraudModel):
    def __init__(self):
        super().__init__()
        self.feature_weights = np.random.uniform(0, 1, 20)
        self.hidden_weights = np.random.uniform(0, 1, (20, 10))
        self.output_weights = np.random.uniform(0, 1, 10)

    def prepare_features(self, transaction: Dict) -> np.ndarray:
        return np.array([
            float(transaction.get('amount', 0)),
            float(transaction.get('message_velocity', 0)),
            float(transaction.get('device_count', 0)),
            float(transaction.get('location_risk', 0)),
            float(transaction.get('time_risk', 0)),
            float(transaction.get('ip_risk', 0)),
            float(transaction.get('profile_age_days', 0)),
            float(transaction.get('avg_transaction_amount', 0)),
            float(transaction.get('daily_transaction_count', 0)),
            float(transaction.get('hour_of_day', 0)),
            float(transaction.get('day_of_week', 0)),
            float(transaction.get('device_age_days', 0)),
            float(transaction.get('browser_risk', 0)),
            float(transaction.get('network_risk', 0)),
            float(transaction.get('hardware_risk', 0)),
            float(transaction.get('behavior_risk', 0)),
            float(transaction.get('pattern_match_score', 0)),
            float(transaction.get('velocity_score', 0)),
            float(transaction.get('geographical_variance', 0)),
            float(transaction.get('historical_risk', 0))
        ])

    def _sigmoid(self, x: np.ndarray) -> np.ndarray:
        return 1 / (1 + np.exp(-x))

    def predict(self, transaction: Dict) -> float:
        features = self.prepare_features(transaction)
        
        # Forward pass through neural network
        hidden_layer = self._sigmoid(np.dot(features, self.hidden_weights))
        output = self._sigmoid(np.dot(hidden_layer, self.output_weights))
        
        # Combine with traditional risk score
        base_risk = self._calculate_base_risk(transaction, [])
        return 0.7 * output + 0.3 * base_risk