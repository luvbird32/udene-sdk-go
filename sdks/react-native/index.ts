import { Platform } from 'react-native';
import axios, { AxiosInstance } from 'axios';

interface FraudClientConfig {
  apiKey: string;
  baseURL?: string;
  platform?: 'ios' | 'android';
}

export class FraudClient {
  private client: AxiosInstance;
  private platform: string;

  constructor({ apiKey, baseURL = 'https://api.example.com/v1', platform }: FraudClientConfig) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Platform': platform || Platform.OS,
        'X-SDK-Version': '1.0.0',
        'X-SDK-Type': 'react-native'
      }
    });
    this.platform = platform || Platform.OS;
  }

  async getMetrics() {
    const response = await this.client.get('/metrics');
    return response.data;
  }

  async getActivity() {
    const response = await this.client.get('/activity');
    return response.data;
  }

  async trackInteraction(data: any) {
    const deviceInfo = {
      platform: this.platform,
      // Add any React Native specific device info here
    };
    
    const response = await this.client.post('/track', {
      ...data,
      deviceInfo
    });
    return response.data;
  }

  async analyzeBEC(emailData: any) {
    const response = await this.client.post('/analyze-bec', emailData);
    return response.data;
  }
}