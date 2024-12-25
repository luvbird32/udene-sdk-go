import { Json } from "@/integrations/supabase/types/core";

export interface ClientSettings {
  [key: string]: Json | any; // Make it compatible with both Json and our specific types
  notification_preferences: {
    email: boolean;
    sms: boolean;
  };
  risk_threshold: number;
  contact_email: string;
}