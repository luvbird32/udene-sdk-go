
/**
 * Common types used throughout the SDK
 * These type definitions ensure type safety and provide documentation
 */

/**
 * Data structure for tracking user interactions
 * Used when sending interaction data to the fraud detection service
 */
export interface InteractionData {
  /**
   * Type of action performed by the user
   * Examples: 'login', 'purchase', 'view_product', etc.
   */
  action: string;
  
  /**
   * Additional data related to the interaction
   * This can include any relevant context for the action
   * Examples: product details, transaction amount, device info
   */
  metadata?: Record<string, any>;
}

/**
 * Response format for risk metrics
 * Received from the fraud detection service when requesting metrics
 */
export interface MetricsResponse {
  /**
   * Risk score from 0-100 where higher means more risky
   * 0: No risk detected
   * 100: Highest risk level
   */
  riskScore: number;
  
  /**
   * Factors contributing to the risk assessment
   * Array of strings describing why the risk score was assigned
   * Examples: 'unusual_location', 'suspicious_device', 'abnormal_behavior'
   */
  riskFactors?: string[];
  
  /**
   * Timestamp when metrics were calculated
   * ISO 8601 format string
   */
  timestamp: string;
}

/**
 * Context type provided by the FraudProvider
 * These are the methods available through the useFraud hook
 */
export interface FraudContextType {
  /**
   * Tracks user interaction for fraud analysis
   * @param data InteractionData object containing action and optional metadata
   * @returns Promise resolving to the API response
   */
  trackInteraction: (data: InteractionData) => Promise<any>;
  
  /**
   * Retrieves current risk metrics
   * @returns Promise resolving to MetricsResponse with risk information
   */
  getMetrics: () => Promise<MetricsResponse>;
}
