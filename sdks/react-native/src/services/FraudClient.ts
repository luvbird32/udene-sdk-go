
import axios, { AxiosInstance } from 'axios';
import type { InteractionData, MetricsResponse, DeviceInfo } from '../types';

export class FraudClient {
  private readonly apiKey: string;
  private readonly client: AxiosInstance;
  private deviceFingerprint: string | null = null;

  constructor(apiKey: string, baseUrl: string = 'https://udene.net/v1') {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-SDK-Type': 'react-native',
        'X-SDK-Version': '1.0.0'
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        // Log errors but don't expose them to the client
        console.error('Udene API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Initialize the SDK with device information
   */
  async initialize(deviceInfo: DeviceInfo): Promise<void> {
    try {
      // Generate a device fingerprint based on the device info
      this.deviceFingerprint = await this.generateFingerprint(deviceInfo);
      
      // Log initialization
      await this.client.post('/initialize', {
        deviceInfo,
        deviceFingerprint: this.deviceFingerprint
      });
    } catch (error) {
      console.error('Initialization error:', error);
      throw error;
    }
  }

  /**
   * Track user interaction
   */
  async trackInteraction(data: InteractionData): Promise<any> {
    try {
      // Add device fingerprint to the data if available
      const enrichedData = {
        ...data,
        deviceFingerprint: this.deviceFingerprint,
        timestamp: new Date().toISOString()
      };

      const response = await this.client.post('/track', enrichedData);
      return response.data;
    } catch (error) {
      console.error('Failed to track interaction:', error);
      throw error;
    }
  }

  /**
   * Get fraud metrics
   */
  async getMetrics(): Promise<MetricsResponse> {
    try {
      const response = await this.client.get('/metrics');
      return response.data;
    } catch (error) {
      console.error('Failed to get metrics:', error);
      throw error;
    }
  }

  /**
   * Generate a device fingerprint based on device information
   * This is a simplified version; real implementation would be more robust
   */
  private async generateFingerprint(deviceInfo: DeviceInfo): Promise<string> {
    // In a real implementation, this would use more sophisticated fingerprinting
    const fingerprintData = JSON.stringify(deviceInfo);
    
    // Simple hash function for demo purposes
    let hash = 0;
    for (let i = 0; i < fingerprintData.length; i++) {
      const char = fingerprintData.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return `fp-${Math.abs(hash).toString(16)}`;
  }
}
