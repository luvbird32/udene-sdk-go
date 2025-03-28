import { Json } from '../database';

export interface ReferralTrackingTable {
  Row: {
    id: string;
    referrer_id: string;
    referred_id: string;
    referral_code: string;
    ip_address: string | null;
    device_fingerprint: string | null;
    status: string | null;
    reward_claimed: boolean | null;
    risk_score: number | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    referrer_id: string;
    referred_id: string;
    referral_code: string;
    ip_address?: string | null;
    device_fingerprint?: string | null;
    status?: string | null;
    reward_claimed?: boolean | null;
    risk_score?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    referrer_id?: string;
    referred_id?: string;
    referral_code?: string;
    ip_address?: string | null;
    device_fingerprint?: string | null;
    status?: string | null;
    reward_claimed?: boolean | null;
    risk_score?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}