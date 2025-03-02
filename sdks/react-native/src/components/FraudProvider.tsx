
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { FraudClient } from '../services/FraudClient';
import type { 
  FraudContextType, 
  InteractionData, 
  MetricsResponse 
} from '../types';

const FraudContext = createContext<FraudContextType | null>(null);

interface FraudProviderProps {
  apiKey: string;
  baseUrl?: string;
  children: ReactNode;
  testID?: string;
}

export const FraudProvider: React.FC<FraudProviderProps> = ({ 
  apiKey, 
  baseUrl, 
  children,
  testID 
}) => {
  const [client] = useState(() => new FraudClient(apiKey, baseUrl));
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // Initialize device fingerprinting and other setup tasks
        const deviceInfo = {
          platform: Platform.OS,
          version: Platform.Version,
          // Additional device information would be collected here
        };
        
        await client.initialize(deviceInfo);
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Udene SDK:', error);
      }
    };

    initializeSDK();
    
    return () => {
      // Cleanup if needed
    };
  }, [client]);

  const trackInteraction = async (data: InteractionData) => {
    if (!isInitialized) {
      console.warn('Udene SDK not fully initialized yet');
    }
    return client.trackInteraction(data);
  };

  const getMetrics = async (): Promise<MetricsResponse> => {
    if (!isInitialized) {
      console.warn('Udene SDK not fully initialized yet');
    }
    return client.getMetrics();
  };

  const contextValue: FraudContextType = {
    trackInteraction,
    getMetrics,
    isInitialized,
  };

  return (
    <View testID={testID} style={{ flex: 1 }}>
      <FraudContext.Provider value={contextValue}>
        {children}
      </FraudContext.Provider>
    </View>
  );
};

export const useFraud = (): FraudContextType => {
  const context = useContext(FraudContext);
  if (!context) {
    throw new Error('useFraud must be used within a FraudProvider');
  }
  return context;
};
