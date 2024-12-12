import { ProfileTable } from './tables/profile';
import { ClientServicesTable } from './tables/client-services';
import { EventTriggersTable } from './tables/event-triggers';
import { AdminDataExtractionsTable } from './tables/admin-data-extractions';
import { WhitelistTable } from './tables/whitelist';
import { APIKeysTable, ClientAPIKeysTable, APICreditsTable } from './tables/auth-tables';
import { AIActivityMonitoringTable, MetricsTable, AuditLogsTable } from './tables/monitoring-tables';
import { FraudAlertsTable, EmailReputationTable } from './tables/fraud-tables';
import { TransactionsTable, RewardsTransactionsTable } from './tables/transaction-tables';
import { MLModelsTable, TrainingDatasetsTable } from './tables/ml-tables';
import { UserActivitiesTable, UserNotificationsTable } from './tables/user-tables';
import { SecurityProgramsTable, ComplianceReportsTable } from './tables/security-tables';
import { WebhooksTable, WebhookDeliveriesTable } from './tables/webhook-tables';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: ProfileTable;
      client_services: ClientServicesTable;
      event_triggers: EventTriggersTable;
      admin_data_extractions: AdminDataExtractionsTable;
      whitelist: WhitelistTable;
      api_keys: APIKeysTable;
      client_api_keys: ClientAPIKeysTable;
      api_credits: APICreditsTable;
      ai_activity_monitoring: AIActivityMonitoringTable;
      metrics: MetricsTable;
      audit_logs: AuditLogsTable;
      fraud_alerts: FraudAlertsTable;
      email_reputation: EmailReputationTable;
      transactions: TransactionsTable;
      rewards_transactions: RewardsTransactionsTable;
      ml_models: MLModelsTable;
      training_datasets: TrainingDatasetsTable;
      user_activities: UserActivitiesTable;
      user_notifications: UserNotificationsTable;
      product_security_programs: SecurityProgramsTable;
      compliance_reports: ComplianceReportsTable;
      webhooks: WebhooksTable;
      webhook_deliveries: WebhookDeliveriesTable;
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];