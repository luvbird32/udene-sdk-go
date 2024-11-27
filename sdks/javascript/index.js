const axios = require('axios');

class FraudClient {
  constructor(apiKey, baseURL = 'https://api.example.com/v1') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getMetrics() {
    const response = await this.client.get('/metrics');
    return response.data;
  }

  async getActivity() {
    const response = await this.client.get('/activity');
    return response.data;
  }

  async trackInteraction(data) {
    const response = await this.client.post('/track', data);
    return response.data;
  }
}

module.exports = { FraudClient };