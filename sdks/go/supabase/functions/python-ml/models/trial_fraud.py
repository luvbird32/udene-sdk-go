from typing import Dict, List, Any
from datetime import datetime, timedelta

class TrialFraudDetection:
    def __init__(self):
        self.velocity_threshold = 3  # Max trials per time window
        self.time_window = timedelta(days=30)
        self.suspicious_patterns = {
            'multiple_devices': 0.7,
            'vpn_usage': 0.6,
            'rapid_signup': 0.8,
            'suspicious_email': 0.75,
            'payment_cycling': 0.9
        }

    def analyze_trial_patterns(self, current_trial: Dict, historical_trials: List[Dict]) -> Dict[str, float]:
        risk_factors = {}
        
        # Check for multiple trials from same IP/device
        if self._check_multiple_trials(historical_trials):
            risk_factors['multiple_trials'] = self.suspicious_patterns['multiple_devices']
        
        # Analyze velocity of trial signups
        if self._check_signup_velocity(historical_trials):
            risk_factors['rapid_signup'] = self.suspicious_patterns['rapid_signup']
        
        # Check payment method cycling
        if self._check_payment_cycling(historical_trials):
            risk_factors['payment_cycling'] = self.suspicious_patterns['payment_cycling']
        
        return risk_factors

    def _check_multiple_trials(self, trials: List[Dict]) -> bool:
        unique_ips = set(trial.get('ip_address') for trial in trials if trial.get('ip_address'))
        unique_devices = set(
            device 
            for trial in trials 
            for device in trial.get('device_fingerprints', [])
        )
        return len(unique_ips) > 2 or len(unique_devices) > 2

    def _check_signup_velocity(self, trials: List[Dict]) -> bool:
        if not trials:
            return False
            
        recent_trials = [
            trial for trial in trials
            if datetime.fromisoformat(trial['created_at']) > datetime.now() - self.time_window
        ]
        return len(recent_trials) > self.velocity_threshold

    def _check_payment_cycling(self, trials: List[Dict]) -> bool:
        payment_methods = set(
            trial.get('payment_method_hash', '') 
            for trial in trials 
            if trial.get('payment_method_hash')
        )
        return len(payment_methods) > 2