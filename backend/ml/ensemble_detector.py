from .models.behavioral_model import BehavioralAnomalyDetector
from .models.bot_classifier import BotClassifier
from .models.risk_scorer import RiskScorer
from typing import Dict, Any

class EnsembleDetector:
    def __init__(self):
        self.behavioral_detector = BehavioralAnomalyDetector()
        self.bot_classifier = BotClassifier()
        self.risk_scorer = RiskScorer()
    
    def predict_fraud_probability(self, features: Dict[str, Any]) -> Dict[str, Any]:
        behavioral_score = self.behavioral_detector.predict(features)
        bot_score = self.bot_classifier.predict(features)
        risk_score = self.risk_scorer.predict(features)
        
        # Weighted ensemble prediction
        ensemble_score = (
            behavioral_score * 0.3 +
            bot_score * 0.3 +
            risk_score * 0.4
        )
        
        return {
            'probability': float(ensemble_score),
            'is_fraudulent': ensemble_score > 0.5,
            'confidence': abs(0.5 - ensemble_score) * 2,
            'component_scores': {
                'behavioral': float(behavioral_score),
                'bot': float(bot_score),
                'risk': float(risk_score)
            }
        }