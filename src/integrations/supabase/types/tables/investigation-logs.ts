import { Json } from "../database";

export interface InvestigationLogsTable {
  Row: {
    id: string;
    service_id: string;
    user_id: string;
    investigation_type: string;
    status: string;
    findings: Json;
    sanitization_steps: Json;
    manual_actions: Json;
    notes: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    service_id: string;
    user_id: string;
    investigation_type: string;
    status?: string;
    findings?: Json;
    sanitization_steps?: Json;
    manual_actions?: Json;
    notes?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    service_id?: string;
    user_id?: string;
    investigation_type?: string;
    status?: string;
    findings?: Json;
    sanitization_steps?: Json;
    manual_actions?: Json;
    notes?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}