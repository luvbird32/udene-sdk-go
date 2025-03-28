from datetime import datetime
from typing import Dict, List
from collections import defaultdict

def analyze_historical_patterns(transactions: List[Dict]) -> float:
    if not transactions:
        return 0.0
        
    hourly_counts = defaultdict(int)
    for tx in transactions:
        hour = datetime.fromisoformat(tx['timestamp']).hour
        hourly_counts[hour] += 1
    
    avg_per_hour = sum(hourly_counts.values()) / max(len(hourly_counts), 1)
    current_hour = datetime.fromisoformat(transactions[-1]['timestamp']).hour
    current_count = hourly_counts[current_hour]
    
    return min((current_count - avg_per_hour) / avg_per_hour, 1.0) if current_count > avg_per_hour * 2 else 0.0

def analyze_network_patterns(transactions: List[Dict], current_tx: Dict) -> float:
    if not transactions:
        return 0.0
        
    connected_txs = [
        tx for tx in transactions 
        if tx['merchant_id'] == current_tx['merchant_id'] or
        tx['location'] == current_tx['location']
    ]
    
    if not connected_txs:
        return 0.0
    
    time_diffs = []
    current_time = datetime.fromisoformat(current_tx['timestamp'])
    
    for tx in connected_txs:
        tx_time = datetime.fromisoformat(tx['timestamp'])
        diff = abs((current_time - tx_time).total_seconds() / 3600)
        time_diffs.append(diff)
    
    close_txs = sum(1 for diff in time_diffs if diff < 1)
    return min(close_txs / 5, 1.0) if close_txs > 2 else 0.0

def calculate_time_based_risk(timestamp: str) -> float:
    hour = datetime.fromisoformat(timestamp).hour
    
    if 0 <= hour < 5:
        return 0.7
    elif 20 <= hour <= 23:
        return 0.4
    return 0.0