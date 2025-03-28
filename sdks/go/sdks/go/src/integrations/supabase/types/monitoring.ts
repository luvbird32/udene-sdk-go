import { Database } from "./database";

export type AIActivityMonitoring = Database['public']['Tables']['ai_activity_monitoring']['Row'];
export type AIActivityMonitoringInsert = Database['public']['Tables']['ai_activity_monitoring']['Insert'];
export type AIActivityMonitoringUpdate = Database['public']['Tables']['ai_activity_monitoring']['Update'];

export type MetricsRow = Database['public']['Tables']['metrics']['Row'];
export type MetricsInsert = Database['public']['Tables']['metrics']['Insert'];
export type MetricsUpdate = Database['public']['Tables']['metrics']['Update'];

export type AuditLog = Database['public']['Tables']['audit_logs']['Row'];
export type AuditLogInsert = Database['public']['Tables']['audit_logs']['Insert'];
export type AuditLogUpdate = Database['public']['Tables']['audit_logs']['Update'];