
/**
 * Common types used throughout the SDK
 */

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
}
