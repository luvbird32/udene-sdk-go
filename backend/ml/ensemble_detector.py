from .models.behavioral_model import BehavioralAnomalyDetector
from .models.bot_classifier import BotClassifier
from .models.risk_scorer import RiskScorer
from .training.feedback_collector import FeedbackCollector
from .training.model_trainer import ModelTrainer
from typing import Dict, Any

class EnsembleDetector:
    def __init__(self):
        self.behavioral_detector = BehavioralAnomalyDetector()
        self.bot_classifier = BotClassifier()
        self.risk_scorer = RiskScorer()
        self.feedback_collector = FeedbackCollector()
        self.model_trainer = ModelTrainer()
    
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
        
        prediction = {
            'probability': float(ensemble_score),
            'is_fraudulent': ensemble_score > 0.5,
            'confidence': abs(0.5 - ensemble_score) * 2,
            'component_scores': {
                'behavioral': float(behavioral_score),
                'bot': float(bot_score),
                'risk': float(risk_score)
            }
        }
        
        # Check if retraining is needed
        accuracy_metrics = self.feedback_collector.get_accuracy_metrics()
        if self.model_trainer.should_retrain(accuracy_metrics["accuracy"]):
            self.model_trainer.retrain_models()
        
        return prediction
    
    def record_feedback(self, prediction: Dict[str, Any], actual_outcome: bool, features: Dict[str, Any]):
        """Record feedback for continuous learning"""
        self.feedback_collector.record_prediction_feedback(prediction, actual_outcome, features)