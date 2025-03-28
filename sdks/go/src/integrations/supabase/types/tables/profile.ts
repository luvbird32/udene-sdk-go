import { Json } from '../database';

export interface ProfileTable {
  Row: {
    id: string;
    username: string | null;
    avatar_url: string | null;
    created_at: string | null;
    updated_at: string | null;
    role: string;
    account_type: string;
    organization_id: string | null;
    organization_name: string | null;
    organization_role: string | null;
    status: string;
    settings: Json | null;
    phone_number: string | null;
    timezone: string | null;
    email_verified: boolean | null;
    last_login: string | null;
    preferences: {
      theme: string;
      notifications: {
        email: boolean;
        sms: boolean;
      };
    } | null;
    security_settings: Json | null;
  };
  Insert: {
    id: string;
    username?: string | null;
    avatar_url?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    role?: string;
    account_type?: string;
    organization_id?: string | null;
    organization_name?: string | null;
    organization_role?: string | null;
    status?: string;
    settings?: Json | null;
    phone_number?: string | null;
    timezone?: string | null;
    email_verified?: boolean | null;
    last_login?: string | null;
    preferences?: Json | null;
    security_settings?: Json | null;
  };
  Update: {
    id?: string;
    username?: string | null;
    avatar_url?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    role?: string;
    account_type?: string;
    organization_id?: string | null;
    organization_name?: string | null;
    organization_role?: string | null;
    status?: string;
    settings?: Json | null;
    phone_number?: string | null;
    timezone?: string | null;
    email_verified?: boolean | null;
    last_login?: string | null;
    preferences?: Json | null;
    security_settings?: Json | null;
  };
}