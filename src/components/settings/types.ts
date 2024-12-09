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