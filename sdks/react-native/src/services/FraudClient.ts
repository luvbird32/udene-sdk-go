
import axios, { AxiosInstance } from 'axios';
import { InteractionData, MetricsResponse } from '../types';

/**
 * Client for interacting with the Udene fraud detection API
 * Handles all direct communication with the backend services
 */
export class FraudClient {
  private api: AxiosInstance;
  private apiKey: string;

  /**
   * Create a new FraudClient instance
   * 
   * @param apiKey The API key for authentication with the fraud detection service
   * @param baseUrl Optional custom API URL (defaults to production endpoint)
   */
  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    
    // Initialize axios instance with appropriate headers and base URL
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
   * Use this method to send user activities to the fraud detection service
   * 
   * @param data The interaction data to track (action type and optional metadata)
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
   * Retrieves risk assessment data from the fraud detection service
   * 
   * @returns Promise resolving to metrics data including risk scores
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
