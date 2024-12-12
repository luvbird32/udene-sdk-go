import { Json } from '../database';

export interface PromoCodesTable {
  Row: {
    id: string;
    code: string;
    description: string | null;
    usage_limit: number;
    times_used: number;
    is_active: boolean;
    risk_score: number | null;
    validation_rules: Json | null;
    ip_patterns: Json | null;
    device_patterns: Json | null;
    created_at: string | null;
    updated_at: string | null;
    expires_at: string | null;
  };
  Insert: {
    id?: string;
    code: string;
    description?: string | null;
    usage_limit?: number;
    times_used?: number;
    is_active?: boolean;
    risk_score?: number | null;
    validation_rules?: Json | null;
    ip_patterns?: Json | null;
    device_patterns?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
    expires_at?: string | null;
  };
  Update: {
    id?: string;
    code?: string;
    description?: string | null;
    usage_limit?: number;
    times_used?: number;
    is_active?: boolean;
    risk_score?: number | null;
    validation_rules?: Json | null;
    ip_patterns?: Json | null;
    device_patterns?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
    expires_at?: string | null;
  };
}

export interface PromoCodeUsageTable {
  Row: {
    id: string;
    promo_code_id: string | null;
    user_id: string | null;
    ip_address: string | null;
    device_fingerprint: string | null;
    usage_timestamp: string | null;
    risk_score: number | null;
    is_flagged: boolean | null;
    validation_results: Json | null;
  };
  Insert: {
    id?: string;
    promo_code_id?: string | null;
    user_id?: string | null;
    ip_address?: string | null;
    device_fingerprint?: string | null;
    usage_timestamp?: string | null;
    risk_score?: number | null;
    is_flagged?: boolean | null;
    validation_results?: Json | null;
  };
  Update: {
    id?: string;
    promo_code_id?: string | null;
    user_id?: string | null;
    ip_address?: string | null;
    device_fingerprint?: string | null;
    usage_timestamp?: string | null;
    risk_score?: number | null;
    is_flagged?: boolean | null;
    validation_results?: Json | null;
  };
}