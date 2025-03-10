
/**
 * Core types used throughout the Udene SDK
 * Enhanced to support the hybrid model approach
 */

/**
 * Transaction data that will be analyzed for fraud
 */
export interface TransactionData {
  /**
   * Unique identifier for the transaction
   */
  id?: string;
  
  /**
   * Transaction amount 
   */
  amount: number;
  
  /**
   * Type of transaction (e.g., 'purchase', 'withdrawal', 'transfer')
   */
  transactionType: string;
  
  /**
   * Currency code (e.g., 'USD', 'EUR')
   */
  currency: string;
  
  /**
   * ISO timestamp of when the transaction occurred
   */
  timestamp: string;
  
  /**
   * Optional additional metadata about the transaction
   */
  metadata?: Record<string, any>;
}

/**
 * Device information for risk analysis
 */
export interface DeviceInfo {
  /**
   * Type of device (e.g., 'mobile', 'tablet')
   */
  deviceType: string;
  
  /**
   * Operating system (e.g., 'iOS', 'Android')
   */
  os: string;
  
  /**
   * OS version (e.g., '14.5', '11.0')
   */
  osVersion: string;
  
  /**
   * Device model (e.g., 'iPhone 12', 'Pixel 6')
   */
  model?: string;
  
  /**
   * Is the device jailbroken/rooted
   */
  isRooted?: boolean;
  
  /**
   * Is the device an emulator
   */
  isEmulator?: boolean;
  
  /**
   * Device installation date of the app
   */
  installDate?: string;
}

/**
 * Network information for risk analysis
 */
export interface NetworkInfo {
  /**
   * IP address
   */
  ipAddress?: string;
  
  /**
   * Connection type (e.g., 'wifi', 'cellular')
   */
  connectionType: string;
  
  /**
   * Is a VPN detected
   */
  isVpn?: boolean;
  
  /**
   * Is a proxy detected
   */
  isProxy?: boolean;
  
  /**
   * Risk score associated with this IP (0-100)
   */
  ipRiskScore?: number;
}

/**
 * Risk assessment result returned from analysis
 */
export interface RiskAssessment {
  /**
   * Risk score from 0-100 (higher means more risk)
   */
  riskScore: number;
  
  /**
   * Factors contributing to the risk assessment
   */
  riskFactors: string[];
  
  /**
   * Whether this transaction requires additional verification 
   */
  requiresRemoteVerification?: boolean;
  
  /**
   * Was this assessment performed locally only
   */
  isLocalOnly?: boolean;
  
  /**
   * Was this verified by cloud services
   */
  cloudVerified?: boolean;
  
  /**
   * ISO timestamp of the assessment
   */
  timestamp: string;
  
  /**
   * Timestamp of the local assessment if cloud verification was used
   */
  localAssessmentTime?: string;
  
  /**
   * Additional context about the risk assessment
   */
  additionalContext?: Record<string, any>;
  
  /**
   * Any errors that occurred during assessment
   */
  error?: string;
}

/**
 * Data structure for tracking user interactions
 */
export interface InteractionData {
  /**
   * Type of action performed by the user
   */
  action: string;
  
  /**
   * Additional data related to the interaction
   */
  metadata?: Record<string, any>;
}

/**
 * Response format for risk metrics
 */
export interface MetricsResponse {
  /**
   * Risk score from 0-100 where higher means more risky
   */
  riskScore: number;
  
  /**
   * Factors contributing to the risk assessment
   */
  riskFactors?: string[];
  
  /**
   * Timestamp when metrics were calculated
   */
  timestamp: string;
}

/**
 * Hybrid model configuration options
 */
export interface HybridModelConfig {
  /**
   * Enable/disable offline risk assessment
   */
  enableOfflineMode: boolean;
  
  /**
   * Risk threshold for local processing (0-100)
   * Transactions with risk below this threshold won't be sent to server
   */
  localRiskThreshold: number;
  
  /**
   * How often to sync detection models with server (in milliseconds)
   */
  modelSyncInterval: number;
  
  /**
   * Whether to send anonymous telemetry for model improvement
   */
  enableTelemetry?: boolean;
}

/**
 * Context type provided by the FraudProvider
 */
export interface FraudContextType {
  /**
   * Tracks user interaction for fraud analysis
   */
  trackInteraction: (data: InteractionData) => Promise<any>;
  
  /**
   * Retrieves current risk metrics
   */
  getMetrics: () => Promise<MetricsResponse>;
  
  /**
   * Analyzes a transaction for fraud risk using the hybrid model
   */
  analyzeTransaction: (
    transaction: TransactionData,
    deviceInfo: DeviceInfo,
    networkInfo: NetworkInfo
  ) => Promise<RiskAssessment>;
  
  /**
   * Synchronizes local detection models with server
   */
  syncModels: () => Promise<void>;
}
