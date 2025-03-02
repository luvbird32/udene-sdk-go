
import React, { createContext, useContext, ReactNode } from 'react';
import { FraudClient } from '../services/FraudClient';
import { FraudContextType } from '../types';

// Create the fraud detection context
const FraudContext = createContext<FraudContextType | null>(null);

// Provider props interface
interface FraudProviderProps {
  apiKey: string;
  baseUrl?: string;
  children: ReactNode;
  testID?: string;
}

/**
 * FraudProvider component that initializes the fraud detection SDK
 * and provides context for all fraud detection features
 */
export const FraudProvider: React.FC<FraudProviderProps> = ({
  apiKey,
  baseUrl,
  children,
  testID,
}) => {
  // Initialize the fraud client with the API key and optional base URL
  const client = new FraudClient(apiKey, baseUrl);

  // Create the context value with all available fraud detection methods
  const contextValue: FraudContextType = {
    trackInteraction: client.trackInteraction.bind(client),
    getMetrics: client.getMetrics.bind(client),
  };

  return (
    <FraudContext.Provider value={contextValue} testID={testID}>
      {children}
    </FraudContext.Provider>
  );
};

/**
 * Custom hook to access fraud detection functionality
 * Must be used within a FraudProvider component
 */
export const useFraud = (): FraudContextType => {
  const context = useContext(FraudContext);
  
  if (!context) {
    throw new Error('useFraud must be used within a FraudProvider');
  }
  
  return context;
};
