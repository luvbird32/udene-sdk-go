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