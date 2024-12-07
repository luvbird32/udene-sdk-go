/**
 * Represents risk factors identified in transaction analysis
 */
export interface RiskFactors {
  multiple_platforms?: string;
  fraud_history?: string;
  [key: string]: string | undefined;
}

/**
 * Represents a transaction with associated risk metrics and patterns
 */
export interface Transaction {
  risk_score?: number;
  message_velocity?: number;
  profile_changes?: Record<string, any>;
  interaction_patterns?: {
    multiple_devices?: boolean;
    [key: string]: any;
  };
  risk_factors?: RiskFactors;
  feature_importance?: Record<string, number>;
}

/**
 * Represents a risk indicator with its display properties
 */
export interface RiskIndicator {
  iconType: 'message' | 'user' | 'device' | 'mail' | 'info';
  title: string;
  description: string;
}