
import axios, { AxiosInstance } from 'axios';
import { InteractionData, MetricsResponse } from '../types';

/**
 * Client for interacting with the Udene fraud detection API
 */
export class FraudClient {
  private api: AxiosInstance;
  private apiKey: string;

  /**
   * Create a new FraudClient instance
   * 
   * @param apiKey The API key for authentication
   * @param baseUrl Optional custom API URL
   */
  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    
    this.api = axios.create({
      baseURL: baseUrl || 'https://api.udene.net/v1',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Client-SDK': 'react-native'
      }
    });
  }

  /**
   * Track user interaction for fraud analysis
   * 
   * @param data The interaction data to track
   * @returns Promise resolving to the API response
   */
  public async trackInteraction(data: InteractionData): Promise<any> {
    try {
      const response = await this.api.post('/interactions', data);
      return response.data;
    } catch (error) {
      console.error('Error tracking interaction:', error);
      throw error;
    }
  }

  /**
   * Get current fraud metrics
   * 
   * @returns Promise resolving to metrics data
   */
  public async getMetrics(): Promise<MetricsResponse> {
    try {
      const response = await this.api.get('/metrics');
      return response.data;
    } catch (error) {
      console.error('Error getting metrics:', error);
      throw error;
    }
  }
}
