from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
import xgboost as xgb
from typing import Dict, Any
import numpy as np

class RiskScorer:
    def __init__(self):
        self.rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.gb_model = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.xgb_model = xgb.XGBClassifier(n_estimators=100, random_state=42)
    
    def predict(self, features: Dict[str, Any]) -> float:
        feature_vector = self._preprocess_features(features)
        
        # Ensemble predictions
        rf_pred = self.rf_model.predict_proba([feature_vector])[0][1]
        gb_pred = self.gb_model.predict_proba([feature_vector])[0][1]
        xgb_pred = self.xgb_model.predict_proba([feature_vector])[0][1]
        
        # Weighted average of predictions
        weights = [0.4, 0.3, 0.3]  # Adjustable weights
        final_score = (
            rf_pred * weights[0] +
            gb_pred * weights[1] +
            xgb_pred * weights[2]
        )
        
        return float(final_score)
    
    def _preprocess_features(self, features: Dict[str, Any]) -> np.ndarray:
        return np.array([
            features.get('transaction_amount', 0),
            features.get('account_age', 0),
            features.get('previous_frauds', 0),
            features.get('transaction_frequency', 0),
            # ... other risk scoring features
        ])