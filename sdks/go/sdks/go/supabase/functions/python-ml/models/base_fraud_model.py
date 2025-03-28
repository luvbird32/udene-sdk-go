from typing import Dict, List, Any
from datetime import datetime

class BaseFraudModel:
    def __init__(self):
        self.risk_weights = {
            'device_pattern': 0.3,
            'behavioral': 0.25,
            'temporal': 0.2,
            'network': 0.25
        }

    def _calculate_base_risk(self, transaction: Dict, recent_txs: List[Dict]) -> float:
        device_risk = self._calculate_device_risk(transaction)
        behavioral_risk = self._calculate_behavioral_risk(transaction, recent_txs)
        temporal_risk = self._calculate_temporal_risk(transaction)
        network_risk = self._calculate_network_risk(transaction)

        return (
            device_risk * self.risk_weights['device_pattern'] +
            behavioral_risk * self.risk_weights['behavioral'] +
            temporal_risk * self.risk_weights['temporal'] +
            network_risk * self.risk_weights['network']
        )

    def _calculate_device_risk(self, transaction: Dict) -> float:
        if not transaction.get('device_fingerprints'):
            return 0.8
        return 0.2

    def _calculate_behavioral_risk(self, transaction: Dict, recent_txs: List[Dict]) -> float:
        if not recent_txs:
            return 0.5
        return len([tx for tx in recent_txs if tx.get('is_suspicious')]) / len(recent_txs)

    def _calculate_temporal_risk(self, transaction: Dict) -> float:
        hour = datetime.fromisoformat(transaction['timestamp']).hour
        return 0.8 if hour >= 23 or hour <= 4 else 0.2

    def _calculate_network_risk(self, transaction: Dict) -> float:
        return 0.7 if transaction.get('vpn_detected') else 0.1