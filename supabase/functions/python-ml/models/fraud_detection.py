from datetime import datetime, timedelta
from typing import Dict, Any, List
from .base_model import BaseModel

class FraudDetectionModel(BaseModel):
    def update_weights(self, transaction: Dict, is_fraud: bool):
        hour = datetime.fromisoformat(transaction['timestamp']).hour
        amount_bucket = self._get_amount_bucket(transaction['amount'])
        
        if is_fraud:
            self.historical_weights[f'hour_{hour}'] += 0.1
            self.historical_weights[f'amount_{amount_bucket}'] += 0.1
            if not transaction['card_present']:
                self.historical_weights['card_not_present'] += 0.1
        else:
            self.historical_weights[f'hour_{hour}'] = max(0, self.historical_weights[f'hour_{hour}'] - 0.05)
            self.historical_weights[f'amount_{amount_bucket}'] = max(0, self.historical_weights[f'amount_{amount_bucket}'] - 0.05)
            if not transaction['card_present']:
                self.historical_weights['card_not_present'] = max(0, self.historical_weights['card_not_present'] - 0.05)

    def analyze_romance_scam_patterns(self, transaction: Dict, recent_txs: List[Dict]) -> Dict[str, float]:
        risk_factors = {}
        
        # Check for rapid escalation in transaction amounts
        if recent_txs:
            amounts = [tx['amount'] for tx in recent_txs]
            if len(amounts) > 1:
                avg_increase = (amounts[-1] - amounts[0]) / len(amounts)
                if avg_increase > 100:  # $100 average increase between transactions
                    risk_factors['rapid_amount_escalation'] = min(avg_increase / 200, 1.0)

        # Check message velocity patterns
        if 'message_velocity' in transaction and transaction['message_velocity']:
            if transaction['message_velocity'] > 50:  # More than 50 messages per hour
                risk_factors['high_message_velocity'] = min(transaction['message_velocity'] / 100, 1.0)

        # Analyze profile changes
        if 'profile_changes' in transaction and transaction['profile_changes']:
            changes = transaction['profile_changes']
            if isinstance(changes, dict) and len(changes) > 2:  # Multiple profile changes
                risk_factors['suspicious_profile_changes'] = 0.8

        # Check device patterns
        if 'interaction_patterns' in transaction and transaction['interaction_patterns']:
            patterns = transaction['interaction_patterns']
            if isinstance(patterns, dict) and patterns.get('multiple_devices', False):
                risk_factors['multiple_devices'] = 0.7

        return risk_factors