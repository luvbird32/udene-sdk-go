
/**
 * FraudProvider.tsx
 * 
 * React context provider for fraud detection functionality
 * Enhanced to support the hybrid model approach combining
 * on-device detection with cloud-based analysis.
 */

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { FraudClient } from '../services/FraudClient';
import { HybridDetectionEngine } from '../services/HybridDetectionEngine';
import { 
  FraudContextType, 
  InteractionData, 
  MetricsResponse,
  TransactionData,
  DeviceInfo,
  NetworkInfo,
  RiskAssessment,
  HybridModelConfig
} from '../types';

/**
 * Create the fraud context to provide fraud detection functionality throughout the app
 */
const FraudContext = createContext<FraudContextType | undefined>(undefined);

/**
 * Props for the FraudProvider component
 */
interface FraudProviderProps {
  /**
   * Child components that will have access to fraud detection
   */
  children: ReactNode;
  
  /**
   * API key for authenticating with the fraud detection service
   */
  apiKey: string;
  
  /**
   * Optional custom API endpoint URL
   */
  baseUrl?: string;
  
  /**
   * Optional test identifier for automated testing
   */
  testID?: string;
  
  /**
   * Configuration for the hybrid model
   */
  hybridConfig?: Partial<HybridModelConfig>;
}

/**
 * Default configuration for hybrid model
 */
const DEFAULT_HYBRID_CONFIG: HybridModelConfig = {
  enableOfflineMode: true,
  localRiskThreshold: 50,
  modelSyncInterval: 24 * 60 * 60 * 1000, // 24 hours
  enableTelemetry: false
};

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
  testID,
  hybridConfig = {}
}) => {
  // Merge default config with user-provided config
  const config: HybridModelConfig = {
    ...DEFAULT_HYBRID_CONFIG,
    ...hybridConfig
  };

  // Initialize the FraudClient with the provided API key
  const fraudClient = new FraudClient(apiKey, baseUrl);
  
  // Initialize the hybrid detection engine
  const [detectionEngine] = useState(() => 
    new HybridDetectionEngine(fraudClient, config.localRiskThreshold)
  );
  
  // Collect basic device info for risk analysis
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceType: 'mobile',
    os: Platform.OS,
    osVersion: Platform.Version.toString(),
    model: Platform.OS === 'ios' ? 'iPhone' : 'Android Device',
    isRooted: false,
    isEmulator: false
  });
  
  // Initialize network info
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    connectionType: 'unknown',
    isVpn: false,
    isProxy: false
  });
  
  // Effect to sync detection models periodically
  useEffect(() => {
    // Initial sync
    detectionEngine.syncDetectionModels();
    
    // Set up periodic sync based on config
    if (config.modelSyncInterval > 0) {
      const intervalId = setInterval(() => {
        detectionEngine.syncDetectionModels();
      }, config.modelSyncInterval);
      
      return () => clearInterval(intervalId);
    }
  }, [detectionEngine, config.modelSyncInterval]);
  
  // Define the context value with necessary functions
  const contextValue: FraudContextType = {
    // Track user interactions
    trackInteraction: (data: InteractionData) => fraudClient.trackInteraction(data),
    
    // Get fraud metrics
    getMetrics: () => fraudClient.getMetrics(),
    
    // Analyze transaction using hybrid approach
    analyzeTransaction: (
      transaction: TransactionData,
      customDeviceInfo?: DeviceInfo,
      customNetworkInfo?: NetworkInfo
    ): Promise<RiskAssessment> => {
      return detectionEngine.analyzeTransaction(
        transaction,
        customDeviceInfo || deviceInfo,
        customNetworkInfo || networkInfo
      );
    },
    
    // Sync local models with server
    syncModels: () => detectionEngine.syncDetectionModels()
  };

  return (
    <FraudContext.Provider value={contextValue}>
      <View testID={testID} style={{ flex: 1 }}>{children}</View>
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
