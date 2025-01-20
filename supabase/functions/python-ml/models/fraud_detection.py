from datetime import datetime, timedelta
from typing import Dict, Any, List
from .base_model import BaseModel
from .neural_network import FraudNeuralNetwork

class FraudDetectionModel(BaseModel):
    def __init__(self):
        super().__init__()
        self.neural_network = FraudNeuralNetwork()
        self.historical_weights = {
            'neural_network': 0.3,
            'traditional_models': 0.7
        }
    
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

    def analyze_referral_fraud_patterns(self, transaction: Dict, recent_txs: List[Dict]) -> Dict[str, float]:
        risk_factors = {}
        
        if 'referral_data' in transaction:
            referral_data = transaction.get('referral_data', {})
            
            # Check for multiple referrals from same IP
            if 'ip_address' in transaction:
                ip_referrals = [
                    tx for tx in recent_txs 
                    if tx.get('ip_address') == transaction['ip_address'] 
                    and 'referral_data' in tx
                ]
                if len(ip_referrals) > 3:
                    risk_factors['multiple_referrals_same_ip'] = min(len(ip_referrals) / 5, 1.0)

            # Check for rapid referral sequence
            if recent_txs:
                referral_times = [
                    datetime.fromisoformat(tx['timestamp']) 
                    for tx in recent_txs 
                    if 'referral_data' in tx
                ]
                if len(referral_times) >= 2:
                    time_diffs = [
                        (t2 - t1).total_seconds() 
                        for t1, t2 in zip(referral_times[:-1], referral_times[1:])
                    ]
                    avg_time_diff = sum(time_diffs) / len(time_diffs)
                    if avg_time_diff < 300:  # Less than 5 minutes average
                        risk_factors['rapid_referrals'] = 0.8

            # Check for circular referrals
            if 'referrer_chain' in referral_data:
                chain = referral_data['referrer_chain']
                if len(set(chain)) < len(chain):
                    risk_factors['circular_referral'] = 0.9

        return risk_factors

    def analyze_affiliate_fraud_patterns(self, transaction: Dict, recent_txs: List[Dict]) -> Dict[str, float]:
        risk_factors = {}
        
        if 'affiliate_data' in transaction:
            affiliate_data = transaction.get('affiliate_data', {})
            
            # Check for click fraud patterns
            if 'click_timestamp' in affiliate_data:
                click_time = datetime.fromisoformat(affiliate_data['click_timestamp'])
                conversion_time = datetime.fromisoformat(transaction['timestamp'])
                time_to_convert = (conversion_time - click_time).total_seconds()
                
                if time_to_convert < 2:  # Suspiciously fast conversion
                    risk_factors['suspicious_conversion_speed'] = 0.9
                
            # Check for cookie stuffing
            if 'cookie_data' in affiliate_data:
                cookie_count = len(affiliate_data['cookie_data'])
                if cookie_count > 10:
                    risk_factors['excessive_cookies'] = min(cookie_count / 20, 1.0)

            # Analyze traffic quality
            if 'traffic_metrics' in affiliate_data:
                metrics = affiliate_data['traffic_metrics']
                if metrics.get('bounce_rate', 0) > 90:
                    risk_factors['poor_traffic_quality'] = 0.7

        return risk_factors

    def analyze_freetrial_fraud_patterns(self, transaction: Dict, recent_txs: List[Dict]) -> Dict[str, float]:
        risk_factors = {}
        
        if 'trial_data' in transaction:
            trial_data = transaction.get('trial_data', {})
            
            # Check for multiple trials from same device/IP
            device_id = transaction.get('device_id')
            ip_address = transaction.get('ip_address')
            
            if device_id and ip_address:
                related_trials = [
                    tx for tx in recent_txs 
                    if (tx.get('device_id') == device_id or tx.get('ip_address') == ip_address)
                    and 'trial_data' in tx
                ]
                
                if len(related_trials) > 2:
                    risk_factors['multiple_trials'] = min(len(related_trials) / 4, 1.0)

            # Check for payment method cycling
            if 'payment_method_hash' in trial_data:
                payment_methods = set(
                    tx.get('trial_data', {}).get('payment_method_hash')
                    for tx in recent_txs
                    if 'trial_data' in tx
                )
                if len(payment_methods) > 3:
                    risk_factors['payment_method_cycling'] = min(len(payment_methods) / 5, 1.0)

            # Analyze usage patterns
            if 'usage_metrics' in trial_data:
                metrics = trial_data['usage_metrics']
                if metrics.get('activity_score', 0) < 0.2:  # Low engagement
                    risk_factors['suspicious_usage_pattern'] = 0.8

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

    def get_neural_network_prediction(self, transaction: Dict, recent_txs: List[Dict]) -> float:
        """Get fraud probability from neural network"""
        # Prepare features for neural network
        features = self.neural_network.prepare_features([{
            'amount': transaction.get('amount', 0),
            'message_velocity': transaction.get('message_velocity', 0),
            'device_count': len(transaction.get('device_fingerprints', [])),
            'location_risk': self._calculate_location_risk(transaction),
            'time_risk': self._calculate_time_risk(transaction),
            'ip_risk': self._calculate_ip_risk(transaction),
            'profile_age_days': self._calculate_profile_age(transaction),
            'avg_transaction_amount': self._calculate_avg_amount(recent_txs),
            'daily_transaction_count': self._calculate_daily_tx_count(recent_txs),
            'hour_of_day': datetime.fromisoformat(transaction['timestamp']).hour,
            'day_of_week': datetime.fromisoformat(transaction['timestamp']).weekday(),
            'device_age_days': self._calculate_device_age(transaction),
            'browser_risk': self._calculate_browser_risk(transaction),
            'network_risk': self._calculate_network_risk(transaction),
            'hardware_risk': self._calculate_hardware_risk(transaction),
            'behavior_risk': self._calculate_behavior_risk(transaction),
            'pattern_match_score': self._calculate_pattern_match(transaction),
            'velocity_score': self._calculate_velocity_score(recent_txs),
            'geographical_variance': self._calculate_geo_variance(recent_txs),
            'historical_risk': self._calculate_historical_risk(recent_txs)
        }])
        
        # Get neural network prediction
        prediction = self.neural_network.predict(features)[0][0]
        return float(prediction)

    def _calculate_location_risk(self, transaction: Dict) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_time_risk(self, transaction: Dict) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_ip_risk(self, transaction: Dict) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_profile_age(self, transaction: Dict) -> float:
        return 30.0  # Placeholder - implement actual logic

    def _calculate_avg_amount(self, recent_txs: List[Dict]) -> float:
        if not recent_txs:
            return 0.0
        amounts = [tx.get('amount', 0) for tx in recent_txs]
        return sum(amounts) / len(amounts)

    def _calculate_daily_tx_count(self, recent_txs: List[Dict]) -> float:
        return len(recent_txs)  # Simplified - implement actual daily count

    def _calculate_device_age(self, transaction: Dict) -> float:
        return 30.0  # Placeholder - implement actual logic

    def _calculate_browser_risk(self, transaction: Dict) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_network_risk(self, transaction: Dict) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_hardware_risk(self, transaction: Dict) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_behavior_risk(self, transaction: Dict) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_pattern_match(self, transaction: Dict) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_velocity_score(self, recent_txs: List[Dict]) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_geo_variance(self, recent_txs: List[Dict]) -> float:
        return 0.5  # Placeholder - implement actual logic

    def _calculate_historical_risk(self, recent_txs: List[Dict]) -> float:
        return 0.5  # Placeholder - implement actual logic
