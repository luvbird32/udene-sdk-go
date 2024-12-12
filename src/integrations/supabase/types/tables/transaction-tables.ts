import { Json } from '../database';

export interface TransactionsTable {
  Row: {
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
  };
  Insert: {
    id?: string;
    amount: number;
    merchant_id: string;
    customer_id: string;
    timestamp?: string;
    location: string;
    device_id: string;
    ip_address: string;
    transaction_type: string;
    card_present: boolean;
    recurring: boolean;
    risk_score?: number | null;
    is_fraudulent?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
    risk_factors?: Json | null;
    feature_importance?: Json | null;
    feedback_status?: string | null;
    feedback_notes?: string | null;
    appeal_timestamp?: string | null;
    message_velocity?: number | null;
    profile_changes?: Json | null;
    interaction_patterns?: Json | null;
  };
  Update: {
    id?: string;
    amount?: number;
    merchant_id?: string;
    customer_id?: string;
    timestamp?: string;
    location?: string;
    device_id?: string;
    ip_address?: string;
    transaction_type?: string;
    card_present?: boolean;
    recurring?: boolean;
    risk_score?: number | null;
    is_fraudulent?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
    risk_factors?: Json | null;
    feature_importance?: Json | null;
    feedback_status?: string | null;
    feedback_notes?: string | null;
    appeal_timestamp?: string | null;
    message_velocity?: number | null;
    profile_changes?: Json | null;
    interaction_patterns?: Json | null;
  };
}

export interface RewardsTransactionsTable {
  Row: {
    id: string;
    user_id: string;
    transaction_id: string | null;
    points_earned: number;
    points_redeemed: number;
    program_type: string;
    merchant_id: string;
    device_fingerprint: string | null;
    ip_address: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    user_id: string;
    transaction_id?: string | null;
    points_earned?: number;
    points_redeemed?: number;
    program_type: string;
    merchant_id: string;
    device_fingerprint?: string | null;
    ip_address?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    user_id?: string;
    transaction_id?: string | null;
    points_earned?: number;
    points_redeemed?: number;
    program_type?: string;
    merchant_id?: string;
    device_fingerprint?: string | null;
    ip_address?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export interface AffiliateActivitiesTable {
  Row: {
    id: string;
    affiliate_id: string;
    click_id: string | null;
    conversion_id: string | null;
    ip_address: string | null;
    user_agent: string | null;
    transaction_amount: number | null;
    commission_amount: number | null;
    status: string | null;
    risk_score: number | null;
    fraud_indicators: Json | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    affiliate_id: string;
    click_id?: string | null;
    conversion_id?: string | null;
    ip_address?: string | null;
    user_agent?: string | null;
    transaction_amount?: number | null;
    commission_amount?: number | null;
    status?: string | null;
    risk_score?: number | null;
    fraud_indicators?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    affiliate_id?: string;
    click_id?: string | null;
    conversion_id?: string | null;
    ip_address?: string | null;
    user_agent?: string | null;
    transaction_amount?: number | null;
    commission_amount?: number | null;
    status?: string | null;
    risk_score?: number | null;
    fraud_indicators?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}
