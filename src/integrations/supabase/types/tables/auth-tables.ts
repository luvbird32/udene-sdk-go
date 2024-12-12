import { Json } from '../database';

export interface APIKeysTable {
  Row: {
    id: string;
    key_value: string;
    name: string;
    status: string;
    created_at: string | null;
    updated_at: string | null;
    description: string | null;
    project_id: string | null;
  };
  Insert: {
    id?: string;
    key_value: string;
    name: string;
    status?: string;
    created_at?: string | null;
    updated_at?: string | null;
    description?: string | null;
    project_id?: string | null;
  };
  Update: {
    id?: string;
    key_value?: string;
    name?: string;
    status?: string;
    created_at?: string | null;
    updated_at?: string | null;
    description?: string | null;
    project_id?: string | null;
  };
}

export interface ClientAPIKeysTable {
  Row: {
    id: string;
    user_id: string;
    key_value: string;
    name: string;
    description: string | null;
    status: string;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    user_id: string;
    key_value: string;
    name: string;
    description?: string | null;
    status?: string;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    user_id?: string;
    key_value?: string;
    name?: string;
    description?: string | null;
    status?: string;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export interface APICreditsTable {
  Row: {
    id: string;
    user_id: string;
    total_credits: number;
    used_credits: number;
    trial_start_date: string | null;
    trial_end_date: string | null;
    is_trial: boolean | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    user_id: string;
    total_credits?: number;
    used_credits?: number;
    trial_start_date?: string | null;
    trial_end_date?: string | null;
    is_trial?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    user_id?: string;
    total_credits?: number;
    used_credits?: number;
    trial_start_date?: string | null;
    trial_end_date?: string | null;
    is_trial?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}