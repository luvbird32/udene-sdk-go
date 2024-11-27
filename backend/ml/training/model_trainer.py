from typing import Dict, Any, List
import numpy as np
from datetime import datetime, timedelta
import os
import json
from ..models.behavioral_model import BehavioralAnomalyDetector
from ..models.bot_classifier import BotClassifier
from ..models.risk_scorer import RiskScorer

class ModelTrainer:
    def __init__(
        self,
        feedback_dir: str = "data/feedback",
        retrain_threshold: int = 1000,  # Number of new samples before retraining
        min_accuracy_threshold: float = 0.95  # Minimum accuracy before forcing retrain
    ):
        self.feedback_dir = feedback_dir
        self.retrain_threshold = retrain_threshold
        self.min_accuracy_threshold = min_accuracy_threshold
        self.last_training_time = self._load_last_training_time()
        
    def _load_last_training_time(self) -> datetime:
        metadata_file = os.path.join(self.feedback_dir, "training_metadata.json")
        if os.path.exists(metadata_file):
            with open(metadata_file, "r") as f:
                metadata = json.load(f)
                return datetime.fromisoformat(metadata.get("last_training_time", "2000-01-01T00:00:00"))
        return datetime.fromisoformat("2000-01-01T00:00:00")
    
    def _save_last_training_time(self):
        metadata_file = os.path.join(self.feedback_dir, "training_metadata.json")
        with open(metadata_file, "w") as f:
            json.dump({"last_training_time": datetime.now().isoformat()}, f)
    
    def collect_training_data(self) -> tuple[List[Dict[str, Any]], List[bool]]:
        features_list = []
        labels = []
        
        # Collect all feedback files since last training
        for filename in os.listdir(self.feedback_dir):
            if not filename.startswith("feedback_"):
                continue
                
            filepath = os.path.join(self.feedback_dir, filename)
            file_timestamp = datetime.fromisoformat(
                filename.replace("feedback_", "").replace(".json", "")
            )
            
            if file_timestamp > self.last_training_time:
                with open(filepath, "r") as f:
                    feedback = json.load(f)
                    features_list.append(feedback["features"])
                    labels.append(feedback["actual_outcome"])
        
        return features_list, labels
    
    def should_retrain(self, current_accuracy: float) -> bool:
        # Check if we have enough new samples
        features_list, _ = self.collect_training_data()
        if len(features_list) >= self.retrain_threshold:
            return True
            
        # Check if accuracy is below threshold
        if current_accuracy < self.min_accuracy_threshold:
            return True
            
        # Check if it's been too long since last training
        if datetime.now() - self.last_training_time > timedelta(days=7):
            return True
            
        return False
    
    def retrain_models(self):
        features_list, labels = self.collect_training_data()
        
        if not features_list:
            return False
            
        # Retrain behavioral model
        behavioral_model = BehavioralAnomalyDetector()
        behavioral_model.train(features_list, labels)
        
        # Retrain bot classifier
        bot_classifier = BotClassifier()
        bot_classifier.train(features_list, labels)
        
        # Retrain risk scorer
        risk_scorer = RiskScorer()
        risk_scorer.train(features_list, labels)
        
        # Update last training time
        self._save_last_training_time()
        
        return True