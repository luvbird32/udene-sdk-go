export interface ClientSettings {
  notification_preferences: {
    email: boolean;
    sms: boolean;
  };
  risk_threshold: number;
  contact_email: string;
}