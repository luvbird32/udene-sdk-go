
import { Platform } from 'react-native';
import axios, { AxiosInstance } from 'axios';

interface UdeneClientConfig {
  apiKey: string;
  baseURL?: string;
  platform?: 'ios' | 'android';
}

/**
 * UdeneClient for React Native
 * A client for interacting with the Udene Fraud Detection API
 */
export class UdeneClient {
  private client: AxiosInstance;
  private platform: string;

  /**
   * Create a new UdeneClient instance
   * @param config - Configuration options for the client
   */
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

  /**
   * Get fraud metrics for the current user/device
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
   * Analyze an email for Business Email Compromise (BEC) threats
   * @param emailData - Email data to analyze
   * @returns BEC analysis results
   */
  async analyzeBEC(emailData: any) {
    const response = await this.client.post('/analyze-bec', emailData);
    return response.data;
  }
}

// React Native specific components
import React, { createContext, useContext, ReactNode } from 'react';

interface FraudContextType {
  client: UdeneClient | null;
  trackInteraction: (data: any) => Promise<any>;
  getMetrics: () => Promise<any>;
}

const FraudContext = createContext<FraudContextType>({
  client: null,
  trackInteraction: async () => ({}),
  getMetrics: async () => ({}),
});

interface FraudProviderProps {
  apiKey: string;
  baseURL?: string;
  children: ReactNode;
}

/**
 * Provider component for Fraud detection features
 */
export const FraudProvider: React.FC<FraudProviderProps> = ({ 
  apiKey, 
  baseURL,
  children 
}) => {
  const client = new UdeneClient({ apiKey, baseURL });
  
  const trackInteraction = async (data: any) => {
    return client.trackInteraction(data);
  };
  
  const getMetrics = async () => {
    return client.getMetrics();
  };
  
  return (
    <FraudContext.Provider value={{ client, trackInteraction, getMetrics }}>
      {children}
    </FraudContext.Provider>
  );
};

/**
 * Hook for accessing fraud detection functionality
 * @returns Fraud detection methods and client
 */
export const useFraud = () => {
  const context = useContext(FraudContext);
  if (!context) {
    throw new Error('useFraud must be used within a FraudProvider');
  }
  return context;
};
