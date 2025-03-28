export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  account_type: string;
  organization_id: string | null;
  organization_name: string | null;
  organization_role: string | null;
  status: string;
  settings: Record<string, any> | null;
  phone_number: string | null;
  timezone: string;
  email_verified: boolean;
  last_login: string | null;
  preferences: Record<string, any>;
  security_settings: Record<string, any>;
  mfa_enabled: boolean;
  mfa_secret: string | null;
  backup_codes: string[];
  session_timeout_minutes: number;
}