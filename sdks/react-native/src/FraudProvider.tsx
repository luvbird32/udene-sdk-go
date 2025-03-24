
import React, { createContext, useContext, ReactNode } from 'react';
import { UdeneClient, UdeneClientConfig } from './UdeneClient';

interface FraudContextType {
  client: UdeneClient;
  trackInteraction: (data: any) => Promise<any>;
  getMetrics: () => Promise<any>;
  getActivity: () => Promise<any>;
  analyzeBEC: (emailData: any) => Promise<any>;
}

// Create the context with a default value
const FraudContext = createContext<FraudContextType | null>(null);

interface FraudProviderProps {
  apiKey: string;
  baseURL?: string;
  children: ReactNode;
}

/**
 * Provider component for Udene fraud detection services
 */
export const FraudProvider: React.FC<FraudProviderProps> = ({ 
  apiKey, 
  baseURL, 
  children 
}) => {
  // Create the client instance
  const client = React.useMemo(() => {
    const config: UdeneClientConfig = {
      apiKey,
      baseURL
    };
    return new UdeneClient(config);
  }, [apiKey, baseURL]);

  // Create the context value
  const contextValue = React.useMemo(() => ({
    client,
    trackInteraction: (data: any) => client.trackInteraction(data),
    getMetrics: () => client.getMetrics(),
    getActivity: () => client.getActivity(),
    analyzeBEC: (emailData: any) => client.analyzeBEC(emailData)
  }), [client]);

  return (
    <FraudContext.Provider value={contextValue}>
      {children}
    </FraudContext.Provider>
  );
};

/**
 * Hook to use Udene fraud detection services
 * 
 * @returns Fraud detection methods and client
 */
export const useFraud = (): FraudContextType => {
  const context = useContext(FraudContext);
  if (!context) {
    throw new Error('useFraud must be used within a FraudProvider');
  }
  return context;
};
