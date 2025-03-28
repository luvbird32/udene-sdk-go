import { Json } from './json';

export interface Transaction {
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