export interface ProfilePreferences {
  [key: string]: any; // Add index signature to make it compatible with Json
  notifications: {
    email: boolean;
    sms: boolean;
  };
  theme: string;
}

export interface ProfileFormData {
  username: string;
  organization_name: string;
  organization_role: string;
  phone_number: string;
  timezone: string;
  preferences: ProfilePreferences;
}

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
  settings: any;
  phone_number: string | null;
  timezone: string;
  email_verified: boolean | null;
  last_login: string | null;
  preferences: ProfilePreferences;
  security_settings: any;
  full_name: string | null;
}