import os
import json
from typing import Dict, Any
import numpy as np
from sklearn.ensemble import IsolationForest

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
        
        # Simple test response
        response = {
            'message': 'Python ML function is working',
            'numpy_version': np.__version__,
            'received_data': body
        }

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