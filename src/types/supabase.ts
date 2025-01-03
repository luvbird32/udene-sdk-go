export interface Profile {
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
  mfa_enabled: boolean;
  mfa_secret: string | null;
  backup_codes: Json[];
  session_timeout_minutes: number;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]