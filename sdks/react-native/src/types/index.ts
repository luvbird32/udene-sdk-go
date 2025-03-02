
// Core types for the SDK

export interface InteractionData {
  action: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

export interface MetricsResponse {
  riskScore: number;
  activeUsers: number;
  alertCount: number;
  lastUpdated?: string;
}

export interface DeviceInfo {
  platform: string;
  version: any;
  brand?: string;
  model?: string;
  uniqueId?: string;
  appVersion?: string;
  [key: string]: any;
}

export interface FraudContextType {
  trackInteraction: (data: InteractionData) => Promise<any>;
  getMetrics: () => Promise<MetricsResponse>;
  isInitialized: boolean;
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface FraudAnalysisResult {
  riskLevel: RiskLevel;
  score: number;
  reason?: string;
  recommendedAction?: string;
}

export interface TransactionData extends InteractionData {
  amount: number;
  currency: string;
  paymentMethod: string;
}
