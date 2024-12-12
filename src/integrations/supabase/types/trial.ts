import { Json } from './database';

export type TrialUsage = {
  id: string;
  user_id: string;
  trial_type: string;
  start_date: string;
  end_date: string;
  ip_addresses?: Json | null;
  device_fingerprints?: Json | null;
  usage_patterns?: Json | null;
  risk_score?: number | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type TrialUsageInsert = Omit<TrialUsage, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
};

export type TrialUsageUpdate = Partial<TrialUsage>;