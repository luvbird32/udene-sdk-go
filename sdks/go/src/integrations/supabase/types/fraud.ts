import { Database } from "./database";

export type FraudAlert = Database['public']['Tables']['fraud_alerts']['Row'];
export type FraudAlertInsert = Database['public']['Tables']['fraud_alerts']['Insert'];
export type FraudAlertUpdate = Database['public']['Tables']['fraud_alerts']['Update'];

export type EmailReputation = Database['public']['Tables']['email_reputation']['Row'];
export type EmailReputationInsert = Database['public']['Tables']['email_reputation']['Insert'];
export type EmailReputationUpdate = Database['public']['Tables']['email_reputation']['Update'];

export type ReferralTracking = Database['public']['Tables']['referral_tracking']['Row'];
export type ReferralTrackingInsert = Database['public']['Tables']['referral_tracking']['Insert'];
export type ReferralTrackingUpdate = Database['public']['Tables']['referral_tracking']['Update'];