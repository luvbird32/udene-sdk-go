import numpy as np
from datetime import datetime
from typing import Dict, Any, List
import json
import os

class FeedbackCollector:
    def __init__(self, feedback_dir: str = "data/feedback"):
        self.feedback_dir = feedback_dir
        self._ensure_directory_exists()
        self.accuracy_history: List[Dict[str, Any]] = self._load_accuracy_history()
        
    def _ensure_directory_exists(self):
        os.makedirs(self.feedback_dir, exist_ok=True)
        
    def _load_accuracy_history(self) -> List[Dict[str, Any]]:
        history_file = os.path.join(self.feedback_dir, "accuracy_history.json")
        if os.path.exists(history_file):
            with open(history_file, "r") as f:
                return json.load(f)
        return []
    
    def record_prediction_feedback(
        self,
        prediction: Dict[str, Any],
        actual_outcome: bool,
        features: Dict[str, Any]
    ):
        timestamp = datetime.now().isoformat()
        feedback_data = {
            "timestamp": timestamp,
            "prediction": prediction,
            "actual_outcome": actual_outcome,
            "features": features
        }
        
        # Save feedback to file
        feedback_file = os.path.join(
            self.feedback_dir,
            f"feedback_{timestamp}.json"
        )
        with open(feedback_file, "w") as f:
            json.dump(feedback_data, f)
            
        # Update accuracy metrics
        self._update_accuracy_metrics(prediction["is_fraudulent"], actual_outcome)
    
    def _update_accuracy_metrics(self, predicted: bool, actual: bool):
        timestamp = datetime.now().isoformat()
        correct = predicted == actual
        
        metrics = {
            "timestamp": timestamp,
            "correct": correct,
            "predicted": predicted,
            "actual": actual
        }
        
        self.accuracy_history.append(metrics)
        
        # Save updated accuracy history
        history_file = os.path.join(self.feedback_dir, "accuracy_history.json")
        with open(history_file, "w") as f:
            json.dump(self.accuracy_history, f)
    
    def get_accuracy_metrics(self) -> Dict[str, float]:
        if not self.accuracy_history:
            return {
                "accuracy": 0.0,
                "false_positive_rate": 0.0,
                "false_negative_rate": 0.0
            }
            
        total = len(self.accuracy_history)
        correct = sum(1 for entry in self.accuracy_history if entry["correct"])
        
        false_positives = sum(
            1 for entry in self.accuracy_history 
            if entry["predicted"] and not entry["actual"]
        )
        
        false_negatives = sum(
            1 for entry in self.accuracy_history 
            if not entry["predicted"] and entry["actual"]
        )
        
        return {
            "accuracy": correct / total if total > 0 else 0.0,
            "false_positive_rate": false_positives / total if total > 0 else 0.0,
            "false_negative_rate": false_negatives / total if total > 0 else 0.0
        }