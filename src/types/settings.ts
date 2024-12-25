export interface ClientSettings {
  [key: string]: any; // Add index signature to make it compatible with Json
  notification_preferences: {
    email: boolean;
    sms: boolean;
  };
  risk_threshold: number;
  contact_email: string;
}