
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Configuration options for the Udene client
 */
interface UdeneClientConfig {
  /**
   * API key for authentication
   */
  apiKey: string;
  
  /**
   * Custom API base URL (optional)
   */
  baseURL?: string;
}

/**
 * UdeneClient for JavaScript
 * A client for interacting with the Udene Fraud Detection API
 */
export class UdeneClient {
  private client: AxiosInstance;

  /**
   * Create a new UdeneClient instance
   * @param apiKey - Your API key
   * @param baseURL - Optional custom API base URL
   */
  constructor(apiKey: string, baseURL: string = 'https://udene.net/v1') {
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

  /**
   * Get fraud metrics for the current user/session
   * @returns Fraud metrics data
   */
  async getMetrics() {
    const response = await this.client.get('/metrics');
    return response.data;
  }

  /**
   * Get activity data for analysis
   * @returns Activity data
   */
  async getActivity() {
    const response = await this.client.get('/activity');
    return response.data;
  }

  /**
   * Track a user interaction for fraud analysis
   * @param data - Interaction data to track
   * @returns Tracking confirmation
   */
  async trackInteraction(data: any) {
    const response = await this.client.post('/track', data);
    return response.data;
  }

  /**
   * Analyze a transaction for fraud
   * @param transaction - Transaction data to analyze
   * @returns Fraud analysis results
   */
  async analyzeTransaction(transaction: any) {
    const response = await this.client.post('/analyze-transaction', transaction);
    return response.data;
  }

  /**
   * Get device fingerprint information 
   * @returns Device fingerprint data
   */
  async getDeviceFingerprint() {
    const response = await this.client.get('/device-fingerprint');
    return response.data;
  }
}
