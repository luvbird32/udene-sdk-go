from typing import Dict, List, Any
from datetime import datetime, timedelta
from .base_fraud_model import BaseFraudModel

class PatternDetectionModel(BaseFraudModel):
    def __init__(self):
        super().__init__()
        self.pattern_weights = {
            'velocity': 0.3,
            'amount': 0.3,
            'location': 0.2,
            'device': 0.2
        }

    def analyze_patterns(self, transaction: Dict, recent_txs: List[Dict]) -> Dict[str, float]:
        if not recent_txs:
            return {'overall_risk': 0.5}

        velocity_risk = self._analyze_velocity(recent_txs)
        amount_risk = self._analyze_amounts(transaction, recent_txs)
        location_risk = self._analyze_locations(transaction, recent_txs)
        device_risk = self._analyze_devices(transaction, recent_txs)

        overall_risk = (
            velocity_risk * self.pattern_weights['velocity'] +
            amount_risk * self.pattern_weights['amount'] +
            location_risk * self.pattern_weights['location'] +
            device_risk * self.pattern_weights['device']
        )

        return {
            'velocity_risk': velocity_risk,
            'amount_risk': amount_risk,
            'location_risk': location_risk,
            'device_risk': device_risk,
            'overall_risk': overall_risk
        }

    def _analyze_velocity(self, transactions: List[Dict]) -> float:
        if len(transactions) < 2:
            return 0.3

        times = [datetime.fromisoformat(tx['timestamp']) for tx in transactions]
        time_diffs = [(t2 - t1).total_seconds() for t1, t2 in zip(times[:-1], times[1:])]
        avg_time_diff = sum(time_diffs) / len(time_diffs)

        return min(1.0, 300 / max(avg_time_diff, 1))

    def _analyze_amounts(self, current: Dict, historical: List[Dict]) -> float:
        amounts = [tx.get('amount', 0) for tx in historical]
        if not amounts:
            return 0.5

        avg_amount = sum(amounts) / len(amounts)
        current_amount = current.get('amount', 0)

        if current_amount > 3 * avg_amount:
            return 0.8
        return 0.2

    def _analyze_locations(self, current: Dict, historical: List[Dict]) -> float:
        locations = set(tx.get('location') for tx in historical)
        current_location = current.get('location')

        if current_location not in locations and len(locations) > 2:
            return 0.9
        return 0.1

    def _analyze_devices(self, current: Dict, historical: List[Dict]) -> float:
        devices = set(tx.get('device_id') for tx in historical)
        current_device = current.get('device_id')

        if current_device not in devices and len(devices) > 2:
            return 0.8
        return 0.2