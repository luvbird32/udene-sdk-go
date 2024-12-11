from typing import Dict, List, Any
from datetime import datetime, timedelta

class ReferralFraudDetection:
    def __init__(self):
        self.chain_depth_threshold = 3
        self.time_threshold = timedelta(minutes=5)
        self.risk_weights = {
            'circular_referral': 0.9,
            'velocity_abuse': 0.8,
            'ip_correlation': 0.7,
            'device_correlation': 0.7,
            'reward_abuse': 0.85
        }

    def analyze_referral_patterns(self, current_referral: Dict, historical_referrals: List[Dict]) -> Dict[str, float]:
        risk_factors = {}
        
        # Check for circular referrals
        if self._detect_circular_referrals(current_referral, historical_referrals):
            risk_factors['circular_referral'] = self.risk_weights['circular_referral']
        
        # Check for velocity abuse
        if self._check_velocity_abuse(historical_referrals):
            risk_factors['velocity_abuse'] = self.risk_weights['velocity_abuse']
        
        # Check for suspicious correlations
        correlations = self._check_correlations(current_referral, historical_referrals)
        risk_factors.update(correlations)
        
        return risk_factors

    def _detect_circular_referrals(self, current: Dict, historical: List[Dict]) -> bool:
        referral_chain = self._build_referral_chain(current['referred_id'], historical)
        return len(set(referral_chain)) < len(referral_chain)

    def _check_velocity_abuse(self, referrals: List[Dict]) -> bool:
        if not referrals:
            return False
            
        recent_referrals = sorted(
            referrals,
            key=lambda x: datetime.fromisoformat(x['created_at'])
        )
        
        for i in range(len(recent_referrals) - 1):
            time_diff = (
                datetime.fromisoformat(recent_referrals[i + 1]['created_at']) -
                datetime.fromisoformat(recent_referrals[i]['created_at'])
            )
            if time_diff < self.time_threshold:
                return True
        return False

    def _check_correlations(self, current: Dict, historical: List[Dict]) -> Dict[str, float]:
        correlations = {}
        
        # Check IP address correlations
        if self._check_ip_correlation(current, historical):
            correlations['ip_correlation'] = self.risk_weights['ip_correlation']
        
        # Check device fingerprint correlations
        if self._check_device_correlation(current, historical):
            correlations['device_correlation'] = self.risk_weights['device_correlation']
        
        return correlations

    def _check_ip_correlation(self, current: Dict, historical: List[Dict]) -> bool:
        if not current.get('ip_address'):
            return False
            
        related_referrals = [
            ref for ref in historical
            if ref.get('ip_address') == current['ip_address']
        ]
        return len(related_referrals) > 2

    def _check_device_correlation(self, current: Dict, historical: List[Dict]) -> bool:
        if not current.get('device_fingerprint'):
            return False
            
        related_referrals = [
            ref for ref in historical
            if ref.get('device_fingerprint') == current['device_fingerprint']
        ]
        return len(related_referrals) > 2

    def _build_referral_chain(self, user_id: str, referrals: List[Dict], depth: int = 0) -> List[str]:
        if depth >= self.chain_depth_threshold:
            return []
            
        chain = [user_id]
        referrer = next(
            (ref['referrer_id'] for ref in referrals if ref['referred_id'] == user_id),
            None
        )
        
        if referrer:
            chain.extend(self._build_referral_chain(referrer, referrals, depth + 1))
            
        return chain