
/**
 * @udene/react-native-sdk
 * Fraud detection and security monitoring for React Native applications
 * 
 * This is the main entry point for the SDK that exports all components,
 * hooks, and types needed by consumers of the library.
 */

// Export components and hooks
export { FraudProvider, useFraud } from './src/components/FraudProvider';

// Export types
export type { 
  InteractionData,
  MetricsResponse,
  FraudContextType
} from './src/types';
