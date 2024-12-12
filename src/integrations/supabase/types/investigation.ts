import { Database } from "./database";

export type InvestigationLog = Database['public']['Tables']['service_investigation_logs']['Row'];
export type InvestigationLogInsert = Database['public']['Tables']['service_investigation_logs']['Insert'];
export type InvestigationLogUpdate = Database['public']['Tables']['service_investigation_logs']['Update'];