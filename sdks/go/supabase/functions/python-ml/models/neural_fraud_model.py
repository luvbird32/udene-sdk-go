
import numpy as np
from typing import Dict, List, Any
from .base_fraud_model import BaseFraudModel

class NeuralFraudModel(BaseFraudModel):
    def __init__(self):
        super().__init__()
        # Enhanced feature weights for better pattern recognition
        self.feature_weights = np.random.uniform(0, 1, 25)  # Expanded feature set
        self.hidden_weights = np.random.uniform(0, 1, (25, 15))  # Larger hidden layer
        self.output_weights = np.random.uniform(0, 1, 15)
        self.update_frequency = 100  # Update weights every 100 transactions
        self.transaction_counter = 0
        self.pattern_memory = []  # Store recent patterns for real-time learning

    def prepare_features(self, transaction: Dict) -> np.ndarray:
        """Enhanced feature extraction with additional behavioral patterns"""
        base_features = [
            float(transaction.get('amount', 0)),
            float(transaction.get('message_velocity', 0)),
            float(transaction.get('device_count', 0)),
            float(transaction.get('location_risk', 0)),
            float(transaction.get('time_risk', 0)),
            float(transaction.get('ip_risk', 0)),
            float(transaction.get('profile_age_days', 0)),
            float(transaction.get('avg_transaction_amount', 0)),
            float(transaction.get('daily_transaction_count', 0)),
            float(transaction.get('hour_of_day', 0)),
            float(transaction.get('day_of_week', 0)),
            float(transaction.get('device_age_days', 0)),
            float(transaction.get('browser_risk', 0)),
            float(transaction.get('network_risk', 0)),
            float(transaction.get('hardware_risk', 0)),
            float(transaction.get('behavior_risk', 0)),
            float(transaction.get('pattern_match_score', 0)),
            float(transaction.get('velocity_score', 0)),
            float(transaction.get('geographical_variance', 0)),
            float(transaction.get('historical_risk', 0))
        ]

        # New advanced features
        interaction_score = self._calculate_interaction_score(transaction)
        temporal_pattern_score = self._analyze_temporal_patterns(transaction)
        network_anomaly_score = self._detect_network_anomalies(transaction)
        behavioral_consistency = self._check_behavioral_consistency(transaction)
        cross_device_score = self._analyze_cross_device_patterns(transaction)

        advanced_features = [
            interaction_score,
            temporal_pattern_score,
            network_anomaly_score,
            behavioral_consistency,
            cross_device_score
        ]

        return np.array(base_features + advanced_features)

    def _calculate_interaction_score(self, transaction: Dict) -> float:
        """Analyze user interaction patterns"""
        patterns = transaction.get('interaction_patterns', {})
        score = 0.0
        
        if patterns:
            typing_speed = patterns.get('typing_speed', 0)
            mouse_movement = patterns.get('mouse_movement', 0)
            session_duration = patterns.get('session_duration', 0)
            
            # Normalize and combine scores
            score = (typing_speed + mouse_movement + session_duration) / 3
            
        return min(max(score, 0.0), 1.0)

    def _analyze_temporal_patterns(self, transaction: Dict) -> float:
        """Analyze timing patterns in user behavior"""
        current_hour = transaction.get('hour_of_day', 0)
        historical_hours = [p.get('hour', 0) for p in self.pattern_memory[-10:]]
        
        if not historical_hours:
            return 0.5
            
        # Calculate deviation from normal activity hours
        avg_hour = sum(historical_hours) / len(historical_hours)
        deviation = abs(current_hour - avg_hour) / 12  # Normalize to 0-1
        
        return 1 - min(deviation, 1.0)

    def _detect_network_anomalies(self, transaction: Dict) -> float:
        """Detect anomalies in network behavior"""
        network_info = transaction.get('network_info', {})
        suspicious_patterns = 0
        
        if network_info.get('vpn_detected'):
            suspicious_patterns += 1
        if network_info.get('proxy_detected'):
            suspicious_patterns += 1
        if network_info.get('tor_detected'):
            suspicious_patterns += 1
        if network_info.get('datacenter_ip'):
            suspicious_patterns += 1
            
        return suspicious_patterns / 4  # Normalize to 0-1

    def _check_behavioral_consistency(self, transaction: Dict) -> float:
        """Check consistency of user behavior over time"""
        current_behavior = transaction.get('behavior_patterns', {})
        historical_behavior = self.pattern_memory[-5:] if self.pattern_memory else []
        
        if not historical_behavior:
            return 0.5
            
        consistency_score = 0
        behavior_points = len(historical_behavior)
        
        for hist_behavior in historical_behavior:
            if self._compare_behaviors(current_behavior, hist_behavior):
                consistency_score += 1
                
        return consistency_score / behavior_points if behavior_points > 0 else 0.5

    def _analyze_cross_device_patterns(self, transaction: Dict) -> float:
        """Analyze patterns across different devices"""
        devices = transaction.get('known_devices', [])
        if not devices:
            return 0.5
            
        suspicious_count = 0
        for device in devices:
            if device.get('is_suspicious'):
                suspicious_count += 1
                
        return suspicious_count / len(devices)

    def _compare_behaviors(self, current: Dict, historical: Dict) -> bool:
        """Compare current behavior with historical behavior"""
        threshold = 0.8
        matches = 0
        total_points = 0
        
        for key in ['typing_pattern', 'navigation_pattern', 'interaction_speed']:
            if key in current and key in historical:
                if abs(current.get(key, 0) - historical.get(key, 0)) < 0.2:
                    matches += 1
                total_points += 1
                
        return (matches / total_points) > threshold if total_points > 0 else False

    def predict(self, transaction: Dict) -> float:
        """Enhanced prediction with real-time pattern updates"""
        # Update pattern memory
        self.pattern_memory.append(transaction)
        if len(self.pattern_memory) > 100:
            self.pattern_memory.pop(0)

        features = self.prepare_features(transaction)
        
        # Forward pass through neural network
        hidden_layer = self._sigmoid(np.dot(features, self.hidden_weights))
        output = self._sigmoid(np.dot(hidden_layer, self.output_weights))
        
        # Combine with traditional risk score
        base_risk = self._calculate_base_risk(transaction, self.pattern_memory)
        
        # Update weights periodically
        self.transaction_counter += 1
        if self.transaction_counter >= self.update_frequency:
            self._update_weights()
            self.transaction_counter = 0
        
        return 0.7 * output + 0.3 * base_risk

    def _sigmoid(self, x: np.ndarray) -> np.ndarray:
        """Activation function"""
        return 1 / (1 + np.exp(-x))

    def _update_weights(self):
        """Real-time weight updates based on recent patterns"""
        if len(self.pattern_memory) > 0:
            recent_patterns = np.array([self.prepare_features(t) for t in self.pattern_memory[-10:]])
            if len(recent_patterns) > 0:
                # Update weights based on recent pattern statistics
                pattern_mean = np.mean(recent_patterns, axis=0)
                pattern_std = np.std(recent_patterns, axis=0)
                
                # Adjust weights based on pattern significance
                weight_adjustments = pattern_std / (pattern_mean + 1e-6)
                self.feature_weights *= (1 + 0.01 * weight_adjustments)
                self.feature_weights = np.clip(self.feature_weights, 0, 1)

    def _calculate_base_risk(self, transaction: Dict, pattern_memory: List[Dict]) -> float:
        """Calculate basic risk score with historical context"""
        base_risk = super()._calculate_base_risk(transaction, [])
        
        if pattern_memory:
            recent_risks = [p.get('risk_score', 0) for p in pattern_memory[-5:]]
            if recent_risks:
                trend_risk = sum(recent_risks) / len(recent_risks)
                base_risk = 0.7 * base_risk + 0.3 * trend_risk
                
        return base_risk
