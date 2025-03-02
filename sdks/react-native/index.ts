
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';

// Types definitions
export interface FraudProviderProps {
  apiKey: string;
  baseUrl?: string;
  children: React.ReactNode;
}

export interface InteractionData {
  action: string;
  metadata?: Record<string, any>;
  timestamp?: number;
}

export interface MetricsResponse {
  riskScore: number;
  activeUsers: number;
  alertCount: number;
}

export interface FraudContextType {
  trackInteraction: (data: InteractionData) => Promise<void>;
  getMetrics: () => Promise<MetricsResponse>;
  isInitialized: boolean;
}

// Create context with default values
const FraudContext = createContext<FraudContextType>({
  trackInteraction: async () => {},
  getMetrics: async () => ({ riskScore: 0, activeUsers: 0, alertCount: 0 }),
  isInitialized: false,
});

// Provider component
export const FraudProvider: React.FC<FraudProviderProps> = ({ 
  apiKey, 
  baseUrl = 'https://api.udene.net/v1',
  children 
}) => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Set up the client
  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-SDK-Type': 'react-native',
      'X-SDK-Version': '1.0.0',
      'X-Platform': Platform.OS,
      'X-Device-Model': Platform.constants.Model || '',
    }
  });

  // Initialize the SDK
  useEffect(() => {
    const initialize = async () => {
      try {
        // Check if API key is valid
        await client.get('/auth/validate');
        setIsInitialized(true);
        console.log('Udene SDK initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Udene SDK:', error);
      }
    };

    initialize();
  }, [apiKey]);

  // Track user interaction
  const trackInteraction = async (data: InteractionData) => {
    if (!isInitialized) {
      console.warn('Udene SDK not initialized');
      return;
    }

    try {
      const payload = {
        ...data,
        timestamp: data.timestamp || Date.now(),
        deviceInfo: {
          platform: Platform.OS,
          version: Platform.Version,
        }
      };

      await client.post('/track', payload);
    } catch (error) {
      console.error('Error tracking interaction:', error);
    }
  };

  // Get risk metrics
  const getMetrics = async (): Promise<MetricsResponse> => {
    if (!isInitialized) {
      console.warn('Udene SDK not initialized');
      return { riskScore: 0, activeUsers: 0, alertCount: 0 };
    }

    try {
      const response = await client.get('/metrics');
      return response.data;
    } catch (error) {
      console.error('Error getting metrics:', error);
      return { riskScore: 0, activeUsers: 0, alertCount: 0 };
    }
  };

  const value = {
    trackInteraction,
    getMetrics,
    isInitialized,
  };

  return (
    <FraudContext.Provider value={value}>
      {children}
    </FraudContext.Provider>
  );
};

// Hook for using the SDK
export const useFraud = () => {
  const context = useContext(FraudContext);
  
  if (context === undefined) {
    throw new Error('useFraud must be used within a FraudProvider');
  }
  
  return context;
};

export default {
  FraudProvider,
  useFraud
};
