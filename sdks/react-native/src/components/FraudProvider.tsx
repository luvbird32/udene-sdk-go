
import React, { createContext, useContext, ReactNode } from 'react';
import { View } from 'react-native';
import { FraudClient } from '../services/FraudClient';
import { FraudContextType } from '../types';

/**
 * Create the fraud context to provide fraud detection functionality throughout the app
 * This context will hold all the fraud detection related methods and state
 */
const FraudContext = createContext<FraudContextType | undefined>(undefined);

/**
 * Props for the FraudProvider component
 */
interface FraudProviderProps {
  children: ReactNode;      // Child components that will have access to fraud detection
  apiKey: string;           // API key for authenticating with the fraud detection service
  baseUrl?: string;         // Optional custom API endpoint URL
  testID?: string;          // Optional test identifier for automated testing
}

/**
 * FraudProvider component that wraps the application and provides
 * fraud detection functionality through context
 * 
 * This component should be placed near the root of your component tree
 * to make fraud detection available throughout your application.
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
      <View testID={testID}>{children}</View>
    </FraudContext.Provider>
  );
};

/**
 * Custom hook to access fraud detection functionality
 * Must be used within a FraudProvider component higher in the component tree
 * 
 * @returns FraudContextType - Object containing fraud detection methods
 * @throws Error if used outside of a FraudProvider
 */
export const useFraud = (): FraudContextType => {
  const context = useContext(FraudContext);
  
  if (context === undefined) {
    throw new Error('useFraud must be used within a FraudProvider');
  }
  
  return context;
};
