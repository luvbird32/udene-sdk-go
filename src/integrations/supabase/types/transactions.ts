import { Json } from './core';

export interface DatabaseTransaction {
  id: string;
  amount: number;
  merchant_id: string;
  customer_id: string;
  timestamp: string;
  location: string;
  device_id: string;
  ip_address: string;
  transaction_type: string;
  card_present: boolean;
  recurring: boolean;
  risk_score: number | null;
  is_fraudulent: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  risk_factors: Json | null;
  feature_importance: Json | null;
  feedback_status: string | null;
  feedback_notes: string | null;
  appeal_timestamp: string | null;
  message_velocity: number | null;
  profile_changes: Json | null;
  interaction_patterns: Json | null;
}

export type Transaction = DatabaseTransaction;

export interface TransactionWithPatterns {
  id: string;
  amount: number;
  merchant_id: string;
  customer_id: string;
  timestamp: string;
  location: string;
  device_id: string;
  ip_address: string;
  transaction_type: string;
  card_present: boolean;
  recurring: boolean;
  risk_score: number | null;
  is_fraudulent: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  risk_factors: RiskFactors | null;
  feature_importance: Record<string, number> | null;
  feedback_status: string | null;
  feedback_notes: string | null;
  appeal_timestamp: string | null;
  message_velocity: number | null;
  profile_changes: Record<string, unknown> | null;
  interaction_patterns: InteractionPatterns | null;
}

export interface InteractionPatterns {
  multiple_devices?: boolean;
  vpn_detected?: boolean;
  device_count?: number;
  odd_hours_activity?: boolean;
  [key: string]: boolean | number | undefined;
}

export interface RiskFactors {
  location_mismatch?: boolean;
  suspicious_ip?: boolean;
  multiple_platforms?: string;
  fraud_history?: string;
  [key: string]: string | boolean | undefined;
}