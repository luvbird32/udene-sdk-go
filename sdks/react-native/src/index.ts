
/**
 * @udene/react-native-sdk
 * Fraud detection and security monitoring for React Native applications
 * with hybrid model support
 * 
 * This is the main entry point for the SDK that exports all components,
 * hooks, and types needed by consumers of the library.
 */

// Export components and hooks
export { FraudProvider, useFraud } from './components/FraudProvider';

// Export services for advanced customization
export { FraudClient } from './services/FraudClient';
export { HybridDetectionEngine } from './services/HybridDetectionEngine';

// Export types
export type { 
  InteractionData,
  MetricsResponse,
  FraudContextType,
  TransactionData,
  DeviceInfo,
  NetworkInfo,
  RiskAssessment,
  HybridModelConfig
} from './types';
