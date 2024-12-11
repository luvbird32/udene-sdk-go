import { Database } from '@/integrations/supabase/types';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Table Types
export type Profile = Tables<'profiles'>;
export type Transaction = Tables<'transactions'>;
export type ClientApiKey = Tables<'client_api_keys'>;
export type ClientService = Tables<'client_services'>;
export type ComplianceReport = Tables<'compliance_reports'>;
export type EventTrigger = Tables<'event_triggers'>;
export type FraudAlert = Tables<'fraud_alerts'>;
export type Metric = Tables<'metrics'>;
export type UserActivity = Tables<'user_activities'>;
export type Webhook = Tables<'webhooks'>;
export type ApiKey = Tables<'api_keys'>;

// Insertable Types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
export type ClientApiKeyInsert = Database['public']['Tables']['client_api_keys']['Insert'];
export type ClientServiceInsert = Database['public']['Tables']['client_services']['Insert'];
export type ComplianceReportInsert = Database['public']['Tables']['compliance_reports']['Insert'];
export type EventTriggerInsert = Database['public']['Tables']['event_triggers']['Insert'];
export type FraudAlertInsert = Database['public']['Tables']['fraud_alerts']['Insert'];
export type MetricInsert = Database['public']['Tables']['metrics']['Insert'];
export type UserActivityInsert = Database['public']['Tables']['user_activities']['Insert'];
export type WebhookInsert = Database['public']['Tables']['webhooks']['Insert'];
export type ApiKeyInsert = Database['public']['Tables']['api_keys']['Insert'];

// Updatable Types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];
export type ClientApiKeyUpdate = Database['public']['Tables']['client_api_keys']['Update'];
export type ClientServiceUpdate = Database['public']['Tables']['client_services']['Update'];
export type ComplianceReportUpdate = Database['public']['Tables']['compliance_reports']['Update'];
export type EventTriggerUpdate = Database['public']['Tables']['event_triggers']['Update'];
export type FraudAlertUpdate = Database['public']['Tables']['fraud_alerts']['Update'];
export type MetricUpdate = Database['public']['Tables']['metrics']['Update'];
export type UserActivityUpdate = Database['public']['Tables']['user_activities']['Update'];
export type WebhookUpdate = Database['public']['Tables']['webhooks']['Update'];
export type ApiKeyUpdate = Database['public']['Tables']['api_keys']['Update'];