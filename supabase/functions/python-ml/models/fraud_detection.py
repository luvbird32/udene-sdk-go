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

        # Check message velocity patterns with time-based thresholds
        if 'message_velocity' in transaction and transaction['message_velocity']:
            velocity = transaction['message_velocity']
            if velocity > 50:  # More than 50 messages per hour
                risk_factors['high_message_velocity'] = min(velocity / 100, 1.0)
            elif velocity > 30:  # 30-50 messages per hour
                risk_factors['elevated_message_velocity'] = min(velocity / 60, 0.7)

        # Analyze profile changes with more detail
        if 'profile_changes' in transaction and transaction['profile_changes']:
            changes = transaction['profile_changes']
            if isinstance(changes, dict):
                # Check frequency of changes
                change_count = len(changes)
                if change_count > 3:
                    risk_factors['frequent_profile_changes'] = min(change_count / 5, 1.0)
                
                # Check specific high-risk changes
                sensitive_fields = {'location', 'age', 'occupation', 'income'}
                sensitive_changes = len(sensitive_fields.intersection(changes.keys()))
                if sensitive_changes > 0:
                    risk_factors['sensitive_info_changes'] = min(sensitive_changes / 3, 1.0)

        # Enhanced device pattern analysis
        if 'interaction_patterns' in transaction and transaction['interaction_patterns']:
            patterns = transaction['interaction_patterns']
            if isinstance(patterns, dict):
                # Multiple devices check
                if patterns.get('multiple_devices', False):
                    device_count = patterns.get('device_count', 1)
                    if device_count > 3:
                        risk_factors['multiple_devices'] = min((device_count - 2) / 3, 1.0)
                
                # Location inconsistency check
                if patterns.get('location_mismatch', False):
                    risk_factors['location_inconsistency'] = 0.8
                
                # Unusual timing patterns
                if patterns.get('odd_hours_activity', False):
                    risk_factors['suspicious_timing'] = 0.7
                
                # VPN/Proxy usage
                if patterns.get('vpn_detected', False):
                    risk_factors['vpn_usage'] = 0.6

        # Behavioral red flags
        if transaction.get('behavioral_flags'):
            flags = transaction['behavioral_flags']
            if isinstance(flags, dict):
                # Check for copy-paste patterns in messages
                if flags.get('message_copy_paste', False):
                    risk_factors['automated_messages'] = 0.8
                
                # Check for template-like messages
                if flags.get('template_messages', False):
                    risk_factors['template_usage'] = 0.7
                
                # Check for rapid relationship progression
                if flags.get('rapid_progression', False):
                    risk_factors['rushed_relationship'] = 0.9

        return risk_factors

    def _calculate_dating_risk_score(self, risk_factors: Dict[str, float]) -> float:
        # Weighted scoring for different risk categories
        weights = {
            'rapid_amount_escalation': 0.9,
            'high_message_velocity': 0.7,
            'elevated_message_velocity': 0.5,
            'frequent_profile_changes': 0.6,
            'sensitive_info_changes': 0.8,
            'multiple_devices': 0.7,
            'location_inconsistency': 0.8,
            'suspicious_timing': 0.6,
            'vpn_usage': 0.5,
            'automated_messages': 0.8,
            'template_usage': 0.7,
            'rushed_relationship': 0.9
        }
        
        total_weight = 0
        weighted_score = 0
        
        for factor, score in risk_factors.items():
            if factor in weights:
                weight = weights[factor]
                weighted_score += score * weight
                total_weight += weight
        
        return weighted_score / max(total_weight, 1)