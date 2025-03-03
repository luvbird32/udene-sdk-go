
/**
 * FraudClient.ts
 * 
 * Client for interacting with the Udene fraud detection API
 * Enhanced to support the hybrid model approach with both
 * local processing and server-side analysis.
 */

import axios, { AxiosInstance } from 'axios';
import { 
  InteractionData, 
  MetricsResponse, 
  TransactionData, 
  DeviceInfo, 
  NetworkInfo,
  RiskAssessment 
} from '../types';

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
        'X-Client-SDK': 'react-native',
        'X-Hybrid-Mode': 'enabled'
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
  
  /**
   * Send transaction data to server for comprehensive analysis
   * Used by the hybrid detection engine when local analysis requires verification
   * 
   * @param data Transaction and context data for analysis
   * @returns Server-side risk assessment
   */
  public async analyzeTransaction(data: {
    transaction: TransactionData;
    deviceFingerprint: string | null;
    deviceInfo: DeviceInfo;
    networkInfo: NetworkInfo;
    localAssessment?: RiskAssessment;
  }): Promise<RiskAssessment> {
    try {
      const response = await this.api.post('/analyze-transaction', {
        ...data,
        sdk_version: '1.0.0',
        analysis_mode: 'hybrid'
      });
      
      return response.data;
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      throw error;
    }
  }
  
  /**
   * Fetch latest detection models for local use
   * Gets updated fraud patterns and detection algorithms
   * 
   * @returns Latest model data for updating local detection
   */
  public async getDetectionModels(): Promise<any> {
    try {
      const response = await this.api.get('/detection-models', {
        params: {
          platform: 'react-native',
          version: '1.0.0'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching detection models:', error);
      throw error;
    }
  }
  
  /**
   * Submit telemetry data for model improvement
   * Only sends anonymized data when enabled by user
   * 
   * @param telemetryData Anonymous usage data to improve models
   */
  public async submitTelemetry(telemetryData: any): Promise<void> {
    try {
      await this.api.post('/telemetry', {
        data: telemetryData,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      // Silently fail telemetry - shouldn't impact main functionality
      console.warn('Failed to submit telemetry:', error);
    }
  }
}
