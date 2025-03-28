import type { Json } from '../database';

export interface PromoCodeTable {
  Row: {
    id: string;
    code: string;
    description?: string;
    usage_limit: number;
    times_used: number;
    is_active: boolean;
    risk_score?: number;
    validation_rules?: Json;
    ip_patterns?: Json;
    device_patterns?: Json;
    created_at?: string;
    updated_at?: string;
    expires_at?: string;
  };
  Insert: {
    id?: string;
    code: string;
    description?: string;
    usage_limit?: number;
    times_used?: number;
    is_active?: boolean;
    risk_score?: number;
    validation_rules?: Json;
    ip_patterns?: Json;
    device_patterns?: Json;
    created_at?: string;
    updated_at?: string;
    expires_at?: string;
  };
  Update: {
    id?: string;
    code?: string;
    description?: string;
    usage_limit?: number;
    times_used?: number;
    is_active?: boolean;
    risk_score?: number;
    validation_rules?: Json;
    ip_patterns?: Json;
    device_patterns?: Json;
    created_at?: string;
    updated_at?: string;
    expires_at?: string;
  };
}

export interface PromoCodeUsageTable {
  Row: {
    id: string;
    promo_code_id?: string;
    user_id?: string;
    ip_address?: string;
    device_fingerprint?: string;
    usage_timestamp?: string;
    risk_score?: number;
    is_flagged?: boolean;
    validation_results?: Json;
  };
  Insert: {
    id?: string;
    promo_code_id?: string;
    user_id?: string;
    ip_address?: string;
    device_fingerprint?: string;
    usage_timestamp?: string;
    risk_score?: number;
    is_flagged?: boolean;
    validation_results?: Json;
  };
  Update: {
    id?: string;
    promo_code_id?: string;
    user_id?: string;
    ip_address?: string;
    device_fingerprint?: string;
    usage_timestamp?: string;
    risk_score?: number;
    is_flagged?: boolean;
    validation_results?: Json;
  };
}