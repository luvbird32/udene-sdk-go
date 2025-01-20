from typing import Dict, List, Any
from datetime import datetime
from .base_fraud_model import BaseFraudModel
from .neural_fraud_model import NeuralFraudModel
from .pattern_detection_model import PatternDetectionModel

class FraudDetectionModel:
    def __init__(self):
        self.neural_model = NeuralFraudModel()
        self.pattern_model = PatternDetectionModel()
        self.model_weights = {
            'neural': 0.4,
            'pattern': 0.6
        }

    def analyze_transaction(self, transaction: Dict, recent_transactions: List[Dict]) -> Dict[str, Any]:
        # Neural network prediction
        neural_risk = self.neural_model.predict(transaction)

        # Pattern-based analysis
        pattern_risks = self.pattern_model.analyze_patterns(transaction, recent_transactions)

        # Combined risk score
        final_risk_score = (
            neural_risk * self.model_weights['neural'] +
            pattern_risks['overall_risk'] * self.model_weights['pattern']
        )

        return {
            'risk_score': final_risk_score,
            'neural_risk': neural_risk,
            'pattern_risks': pattern_risks,
            'requires_review': final_risk_score > 0.7,
            'timestamp': datetime.now().isoformat()
        }

    def update_weights(self, transaction: Dict, is_fraud: bool):
        """Update model weights based on feedback"""
        if is_fraud:
            self.model_weights['neural'] = min(0.6, self.model_weights['neural'] + 0.05)
            self.model_weights['pattern'] = 1 - self.model_weights['neural']
        else:
            self.model_weights['neural'] = max(0.3, self.model_weights['neural'] - 0.05)
            self.model_weights['pattern'] = 1 - self.model_weights['neural']