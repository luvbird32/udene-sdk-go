import os
import json
from typing import Dict, Any
from models.fraud_detection import FraudDetectionModel
from utils.analysis import (
    analyze_historical_patterns,
    analyze_network_patterns,
    calculate_time_based_risk
)

# Global model instance
model = FraudDetectionModel()

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
            
        # Handle fraud confirmation update
        if is_confirmed_fraud is not None and recent_txs:
            latest_tx = recent_txs[-1]
            model.update_weights(latest_tx, is_confirmed_fraud)
            model.update_metrics(latest_tx.get('risk_score', 0) > 70, is_confirmed_fraud)
            
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
        
        # Analyze romance scam patterns
        romance_scam_risks = model.analyze_romance_scam_patterns(current_tx, recent_txs)
        
        # Calculate weighted risk score
        base_risk = (
            historical_risk * 0.2 +
            network_risk * 0.2 +
            time_risk * 0.1
        )
        
        # Add romance scam risk factors
        romance_risk = sum(romance_scam_risks.values()) / max(len(romance_scam_risks), 1) * 0.5
        total_risk = min((base_risk + romance_risk) * 100, 100)
        
        response = {
            'risk_score': round(total_risk, 2),
            'risk_factors': {
                'historical_patterns': round(historical_risk * 100, 2),
                'network_patterns': round(network_risk * 100, 2),
                'time_based': round(time_risk * 100, 2),
                'romance_scam_patterns': romance_scam_risks
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