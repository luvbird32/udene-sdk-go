import os
import json
from typing import Dict, Any
import numpy as np
from datetime import datetime, timedelta
from collections import defaultdict

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
        
        if not current_tx:
            raise ValueError("No transaction data provided")
            
        # Calculate risk scores from different patterns
        historical_risk = analyze_historical_patterns(recent_txs)
        network_risk = analyze_network_patterns(recent_txs, current_tx)
        time_risk = calculate_time_based_risk(current_tx['timestamp'])
        
        # Combine risk scores with weights
        total_risk = (
            historical_risk * 0.4 +  # Historical patterns
            network_risk * 0.4 +     # Network patterns
            time_risk * 0.2          # Time-based patterns
        )
        
        response = {
            'risk_score': round(total_risk * 100, 2),  # Convert to percentage
            'risk_factors': {
                'historical_patterns': round(historical_risk * 100, 2),
                'network_patterns': round(network_risk * 100, 2),
                'time_based': round(time_risk * 100, 2)
            }
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