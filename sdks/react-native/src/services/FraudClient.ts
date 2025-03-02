
import axios, { AxiosInstance } from 'axios';
import { InteractionData, MetricsResponse } from '../types';

/**
 * Fraud detection client that handles API communication
 */
export class FraudClient {
  private api: AxiosInstance;
  private apiKey: string;

  /**
   * Creates a new FraudClient instance
   * 
   * @param apiKey - API key for authentication
   * @param baseUrl - Optional custom API URL (defaults to production)
   */
  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.api = axios.create({
      baseURL: baseUrl || 'https://udene.net/v1',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });
  }

  /**
   * Tracks user interaction for fraud analysis
   * 
   * @param data - Interaction data including action and metadata
   * @returns Promise with the API response
   */
  public async trackInteraction(data: InteractionData): Promise<any> {
    try {
      const response = await this.api.post('/track', data);
      return response.data;
    } catch (error) {
      console.error('Error tracking interaction:', error);
      throw error;
    }
  }

  /**
   * Retrieves current fraud metrics
   * 
   * @returns Promise with metrics response
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
