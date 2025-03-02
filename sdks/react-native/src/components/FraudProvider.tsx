
import React, { createContext, useContext, ReactNode } from 'react';
import { FraudClient } from '../services/FraudClient';
import { FraudContextType } from '../types';

// Create the fraud context
const FraudContext = createContext<FraudContextType | undefined>(undefined);

// Props for the FraudProvider component
interface FraudProviderProps {
  children: ReactNode;
  apiKey: string;
  baseUrl?: string;
  testID?: string;
}

/**
 * FraudProvider component that wraps the application and provides
 * fraud detection functionality through context
 */
export const FraudProvider: React.FC<FraudProviderProps> = ({
  children,
  apiKey,
  baseUrl,
  testID
}) => {
  // Initialize the FraudClient with the provided API key
  const fraudClient = new FraudClient(apiKey, baseUrl);

  // Define the context value with necessary functions
  const contextValue: FraudContextType = {
    trackInteraction: (data) => fraudClient.trackInteraction(data),
    getMetrics: () => fraudClient.getMetrics()
  };

  return (
    <FraudContext.Provider value={contextValue}>
      <div testID={testID}>{children}</div>
    </FraudContext.Provider>
  );
};

/**
 * Custom hook to access fraud detection functionality
 * Must be used within a FraudProvider
 */
export const useFraud = (): FraudContextType => {
  const context = useContext(FraudContext);
  
  if (context === undefined) {
    throw new Error('useFraud must be used within a FraudProvider');
  }
  
  return context;
};
