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
        
    def analyze_bec(self, email_data):
        """
        Analyze an email for potential Business Email Compromise (BEC) patterns
        
        Args:
            email_data (dict): Email data containing sender, recipient, subject, content, etc.
            
        Returns:
            dict: Analysis results including risk score and detected patterns
        """
        response = requests.post(
            f'{self.base_url}/analyze-bec',
            headers=self.headers,
            json=email_data
        )
        response.raise_for_status()
        return response.json()