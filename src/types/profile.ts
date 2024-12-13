export interface ProfilePreferences {
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
  username: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
  role: string;
  account_type: string;
  organization_id: string;
  organization_name: string;
  organization_role: string;
  status: string;
  settings: any;
  phone_number: string;
  timezone: string;
  email_verified: boolean;
  last_login: string;
  preferences: ProfilePreferences;
  security_settings: any;
}