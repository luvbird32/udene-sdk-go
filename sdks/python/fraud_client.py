import requests

class FraudClient:
    def __init__(self, api_key, base_url='https://api.example.com/v1'):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }

    def get_metrics(self):
        response = requests.get(f'{self.base_url}/metrics', headers=self.headers)
        response.raise_for_status()
        return response.json()

    def get_activity(self):
        response = requests.get(f'{self.base_url}/activity', headers=self.headers)
        response.raise_for_status()
        return response.json()

    def track_interaction(self, data):
        response = requests.post(f'{self.base_url}/track', headers=self.headers, json=data)
        response.raise_for_status()
        return response.json()