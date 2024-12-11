export interface ProfileFormData {
  username: string | null;
  avatar_url: string | null;
  account_type: string;
  organization_name: string | null;
  organization_role: string | null;
}

export interface ProfileSettingsProps {
  className?: string;
}

export interface ClientSettingsData {
  [key: string]: any; // This makes it compatible with Json type
  notification_preferences: {
    email: boolean;
    sms: boolean;
  };
  risk_threshold: number;
  contact_email: string;
}