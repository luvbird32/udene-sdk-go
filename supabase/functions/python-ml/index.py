import os
import json
from typing import Dict, Any
import numpy as np
from datetime import datetime, timedelta
from collections import defaultdict

class FraudDetectionModel:
    def __init__(self):
        self.historical_weights = defaultdict(float)
        self.performance_metrics = {
            'true_positives': 0,
            'false_positives': 0,
            'true_negatives': 0,
            'false_negatives': 0
        }
        
    def update_weights(self, transaction: Dict, is_fraud: bool):
        """Update model weights based on confirmed fraud cases"""
        hour = datetime.fromisoformat(transaction['timestamp']).hour
        amount_bucket = self._get_amount_bucket(transaction['amount'])
        
        # Adjust weights based on fraud confirmation
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

    def _get_amount_bucket(self, amount: float) -> str:
        """Categorize transaction amount into buckets"""
        if amount < 100:
            return 'low'
        elif amount < 1000:
            return 'medium'
        else:
            return 'high'

    def update_metrics(self, predicted_fraud: bool, actual_fraud: bool):
        """Update performance metrics"""
        if predicted_fraud and actual_fraud:
            self.performance_metrics['true_positives'] += 1
        elif predicted_fraud and not actual_fraud:
            self.performance_metrics['false_positives'] += 1
        elif not predicted_fraud and not actual_fraud:
            self.performance_metrics['true_negatives'] += 1
        else:
            self.performance_metrics['false_negatives'] += 1

    def get_performance_metrics(self):
        """Calculate current model performance metrics"""
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

# Global model instance
model = FraudDetectionModel()

def analyze_historical_patterns(transactions: list) -> float:
    """Analyze historical transaction patterns for anomalies"""
    if not transactions:
        return 0.0
        
    # Group transactions by hour to detect unusual timing
    hourly_counts = defaultdict(int)
    for tx in transactions:
        hour = datetime.fromisoformat(tx['timestamp']).hour
        hourly_counts[hour] += 1
    
    # Calculate average transactions per hour
    avg_per_hour = sum(hourly_counts.values()) / max(len(hourly_counts), 1)
    
    # Get current transaction's hour
    current_hour = datetime.fromisoformat(transactions[-1]['timestamp']).hour
    current_count = hourly_counts[current_hour]
    
    # Calculate anomaly score (0-1)
    if current_count > avg_per_hour * 2:
        return min((current_count - avg_per_hour) / avg_per_hour, 1.0)
    return 0.0

def analyze_network_patterns(transactions: list, current_tx: Dict) -> float:
    """Simple network analysis of connected transactions"""
    if not transactions:
        return 0.0
        
    # Look for connections through merchant or location
    connected_txs = [
        tx for tx in transactions 
        if tx['merchant_id'] == current_tx['merchant_id'] or
        tx['location'] == current_tx['location']
    ]
    
    if not connected_txs:
        return 0.0
    
    # Check for rapid succession of connected transactions
    time_diffs = []
    current_time = datetime.fromisoformat(current_tx['timestamp'])
    
    for tx in connected_txs:
        tx_time = datetime.fromisoformat(tx['timestamp'])
        diff = abs((current_time - tx_time).total_seconds() / 3600)  # hours
        time_diffs.append(diff)
    
    # If transactions are too close together, increase risk score
    close_txs = sum(1 for diff in time_diffs if diff < 1)  # within 1 hour
    if close_txs > 2:  # More than 2 connected transactions within an hour
        return min(close_txs / 5, 1.0)  # Cap at 1.0
    return 0.0

def calculate_time_based_risk(timestamp: str) -> float:
    """Calculate risk based on transaction time"""
    hour = datetime.fromisoformat(timestamp).hour
    
    # Higher risk during unusual hours (midnight to 5 AM)
    if 0 <= hour < 5:
        return 0.7
    # Moderate risk during off-peak hours
    elif 20 <= hour <= 23:
        return 0.4
    # Normal risk during business hours
    return 0.0

def handler(event, context):
    try:
        # Set CORS headers
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        }

        # Handle CORS preflight request
        if event['method'] == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': headers,
                'body': ''
            }

        # Parse request body
        body = json.loads(event.get('body', '{}'))
        current_tx = body.get('transaction', {})
        recent_txs = body.get('recent_transactions', [])
        is_confirmed_fraud = body.get('is_confirmed_fraud')
        
        if not current_tx:
            raise ValueError("No transaction data provided")
            
        # If this is a fraud confirmation update
        if is_confirmed_fraud is not None and recent_txs:
            latest_tx = recent_txs[-1]
            model.update_weights(latest_tx, is_confirmed_fraud)
            model.update_metrics(latest_tx.get('risk_score', 0) > 70, is_confirmed_fraud)
            
            # Return updated performance metrics
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'performance_metrics': model.get_performance_metrics()
                })
            }
            
        # Calculate risk scores from different patterns
        historical_risk = analyze_historical_patterns(recent_txs)
        network_risk = analyze_network_patterns(recent_txs, current_tx)
        time_risk = calculate_time_based_risk(current_tx['timestamp'])
        
        # Apply learned weights
        hour = datetime.fromisoformat(current_tx['timestamp']).hour
        amount_bucket = model._get_amount_bucket(current_tx['amount'])
        
        weighted_risk = (
            historical_risk * 0.3 +
            network_risk * 0.3 +
            time_risk * 0.2 +
            model.historical_weights[f'hour_{hour}'] * 0.1 +
            model.historical_weights[f'amount_{amount_bucket}'] * 0.1
        )
        
        if not current_tx['card_present']:
            weighted_risk += model.historical_weights['card_not_present'] * 0.1
            
        total_risk = min(weighted_risk * 100, 100)
        
        response = {
            'risk_score': round(total_risk, 2),
            'risk_factors': {
                'historical_patterns': round(historical_risk * 100, 2),
                'network_patterns': round(network_risk * 100, 2),
                'time_based': round(time_risk * 100, 2)
            },
            'performance_metrics': model.get_performance_metrics()
        }
        
        print(f"Risk analysis completed: {json.dumps(response)}")
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(response)
        }

    except Exception as e:
        print(f"Error in python-ml function: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': str(e)
            })
        }