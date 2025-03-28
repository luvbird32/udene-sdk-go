
import { Json } from "@/integrations/supabase/types/core";

export interface ClientSettings {
  [key: string]: Json | any;
  notification_preferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    categories: {
      security: boolean;
      fraud: boolean;
      system: boolean;
      account: boolean;
    };
    severity_levels: {
      low: boolean;
      medium: boolean;
      high: boolean;
    };
    quiet_hours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  risk_threshold: number;
  contact_email: string;
}
