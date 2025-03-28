from typing import Dict, Any
from collections import defaultdict
from datetime import datetime

class BaseModel:
    def __init__(self):
        self.historical_weights = defaultdict(float)
        self.performance_metrics = {
            'true_positives': 0,
            'false_positives': 0,
            'true_negatives': 0,
            'false_negatives': 0
        }
    
    def _get_amount_bucket(self, amount: float) -> str:
        if amount < 100:
            return 'low'
        elif amount < 1000:
            return 'medium'
        else:
            return 'high'

    def get_performance_metrics(self):
        total = sum(self.performance_metrics.values())
        if total == 0:
            return {'accuracy': 0, 'precision': 0, 'recall': 0}
            
        tp = self.performance_metrics['true_positives']
        fp = self.performance_metrics['false_positives']
        tn = self.performance_metrics['true_negatives']
        fn = self.performance_metrics['false_negatives']
        
        accuracy = (tp + tn) / total if total > 0 else 0
        precision = tp / (tp + fp) if (tp + fp) > 0 else 0
        recall = tp / (tp + fn) if (tp + fn) > 0 else 0
        
        return {
            'accuracy': round(accuracy * 100, 2),
            'precision': round(precision * 100, 2),
            'recall': round(recall * 100, 2)
        }