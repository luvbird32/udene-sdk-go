import { Platform } from 'react-native';
import axios, { AxiosInstance } from 'axios';

interface UdeneClientConfig {
  apiKey: string;
  baseURL?: string;
  platform?: 'ios' | 'android';
}

export class UdeneClient {
  private client: AxiosInstance;
  private platform: string;

  constructor({ apiKey, baseURL = 'https://udene.net/v1', platform }: UdeneClientConfig) {
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
    const response = await this.client.post('/track', data);
    return response.data;
  }

  async analyzeBEC(emailData: any) {
    const response = await this.client.post('/analyze-bec', emailData);
    return response.data;
  }
}
