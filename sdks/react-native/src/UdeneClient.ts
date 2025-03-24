
import axios, { AxiosInstance } from 'axios';

/**
 * Configuration options for the UdeneClient
 */
export interface UdeneClientConfig {
  /**
   * Your Udene API key (required)
   */
  apiKey: string;
  
  /**
   * Custom API base URL (optional)
   * @default "https://api.udene.com/v1"
   */
  baseURL?: string;
  
  /**
   * Device platform (optional, auto-detected if not provided)
   * @default auto-detected from React Native
   */
  platform?: string;
}

/**
 * Interaction data for tracking user behaviors
 */
export interface InteractionData {
  /**
   * User identifier
   */
  userId?: string;
  
  /**
   * Type of action performed
   */
  action: string;
  
  /**
   * Additional data about the interaction
   */
  metadata?: Record<string, any>;
}

/**
 * Main client for Udene fraud detection services
 */
export class UdeneClient {
  private client: AxiosInstance;
  private platform: string;

  /**
   * Creates a new UdeneClient instance
   * 
   * @param config - Configuration options
   */
  constructor(config: UdeneClientConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.platform = config.platform || 'react-native';
    
    this.client = axios.create({
      baseURL: config.baseURL || 'https://api.udene.com/v1',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'X-Udene-SDK': `react-native-sdk/1.0.0`,
        'X-Udene-Platform': this.platform
      }
    });
  }

  /**
   * Get fraud detection metrics for the current session/user
   * 
   * @returns Promise with metrics data
   */
  async getMetrics(): Promise<any> {
    try {
      const response = await this.client.get('/metrics');
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Analyze Business Email Compromise threats
   * 
   * @param emailData - Email data to analyze
   * @returns Promise with analysis results
   */
  async analyzeBEC(emailData: any): Promise<any> {
    try {
      const response = await this.client.post('/analyze/bec', emailData);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Track user interactions for fraud analysis
   * 
   * @param data - Interaction data
   * @returns Promise with tracking confirmation
   */
  async trackInteraction(data: InteractionData): Promise<any> {
    try {
      const response = await this.client.post('/track', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Get user activity data
   * 
   * @returns Promise with user activity data
   */
  async getActivity(): Promise<any> {
    try {
      const response = await this.client.get('/activity');
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Handle API errors
   * 
   * @param error - Error object from API request
   * @private
   */
  private handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data?.error;
      if (serverError) {
        console.error(`Udene API Error: ${serverError.message || 'Unknown error'}`);
      }
    }
  }
}
