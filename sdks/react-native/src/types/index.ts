
/**
 * User interaction data for fraud tracking
 */
export interface InteractionData {
  /** The type of action performed */
  action: string;
  
  /** Optional user identifier */
  userId?: string;
  
  /** Optional session identifier */
  sessionId?: string;
  
  /** Additional data related to the interaction */
  metadata?: Record<string, any>;
}

/**
 * Response structure for fraud metrics
 */
export interface MetricsResponse {
  /** Risk score between 0 and 1 */
  riskScore: number;
  
  /** Number of active users */
  activeUsers: number;
  
  /** Number of fraud alerts */
  alertCount: number;
  
  /** Timestamp of last update */
  lastUpdated?: string;
}

/**
 * Context type for fraud detection features
 */
export interface FraudContextType {
  /** Track user interactions for fraud analysis */
  trackInteraction: (data: InteractionData) => Promise<any>;
  
  /** Get current fraud metrics */
  getMetrics: () => Promise<MetricsResponse>;
}
