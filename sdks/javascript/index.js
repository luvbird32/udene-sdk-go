const axios = require('axios');

class UdeneClient {
  constructor(apiKey, baseURL = 'https://udene.net/v1') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Client-Version': '1.0.0',
        'X-SDK-Type': 'javascript'
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        console.error('SDK Error:', error?.response?.data || error.message);
        throw error;
      }
    );
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

module.exports = { UdeneClient };