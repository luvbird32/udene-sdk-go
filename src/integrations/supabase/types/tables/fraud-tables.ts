import { Json } from '../database';

export interface FraudAlertsTable {
  Row: {
    id: string;
    transaction_id: string | null;
    alert_type: string;
    severity: string;
    description: string;
    status: string;
    created_at: string | null;
    updated_at: string | null;
    email_data: Json | null;
    domain_risk_score: number | null;
    behavioral_indicators: Json | null;
  };
  Insert: {
    id?: string;
    transaction_id?: string | null;
    alert_type: string;
    severity: string;
    description: string;
    status?: string;
    created_at?: string | null;
    updated_at?: string | null;
    email_data?: Json | null;
    domain_risk_score?: number | null;
    behavioral_indicators?: Json | null;
  };
  Update: {
    id?: string;
    transaction_id?: string | null;
    alert_type?: string;
    severity?: string;
    description?: string;
    status?: string;
    created_at?: string | null;
    updated_at?: string | null;
    email_data?: Json | null;
    domain_risk_score?: number | null;
    behavioral_indicators?: Json | null;
  };
}

export interface EmailReputationTable {
  Row: {
    id: string;
    email: string;
    risk_score: number | null;
    fraud_flags: Json;
    platform_occurrences: Json;
    first_seen: string | null;
    last_updated: string | null;
  };
  Insert: {
    id?: string;
    email: string;
    risk_score?: number | null;
    fraud_flags?: Json;
    platform_occurrences?: Json;
    first_seen?: string | null;
    last_updated?: string | null;
  };
  Update: {
    id?: string;
    email?: string;
    risk_score?: number | null;
    fraud_flags?: Json;
    platform_occurrences?: Json;
    first_seen?: string | null;
    last_updated?: string | null;
  };
}