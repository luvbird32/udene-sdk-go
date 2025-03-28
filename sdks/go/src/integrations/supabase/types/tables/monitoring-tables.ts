import { Json } from '../database';

export interface AIActivityMonitoringTable {
  Row: {
    id: string;
    user_id: string | null;
    activity_type: string;
    tool_signature: string | null;
    risk_score: number | null;
    detection_patterns: Json | null;
    metadata: Json | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    user_id?: string | null;
    activity_type: string;
    tool_signature?: string | null;
    risk_score?: number | null;
    detection_patterns?: Json | null;
    metadata?: Json | null;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    user_id?: string | null;
    activity_type?: string;
    tool_signature?: string | null;
    risk_score?: number | null;
    detection_patterns?: Json | null;
    metadata?: Json | null;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export interface MetricsTable {
  Row: {
    id: string;
    metric_name: string;
    metric_value: number;
    timestamp: string | null;
  };
  Insert: {
    id?: string;
    metric_name: string;
    metric_value: number;
    timestamp?: string | null;
  };
  Update: {
    id?: string;
    metric_name?: string;
    metric_value?: number;
    timestamp?: string | null;
  };
}

export interface AuditLogsTable {
  Row: {
    id: string;
    event_type: string;
    user_id: string | null;
    entity_type: string;
    entity_id: string;
    changes: Json | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string | null;
  };
  Insert: {
    id?: string;
    event_type: string;
    user_id?: string | null;
    entity_type: string;
    entity_id: string;
    changes?: Json | null;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: string | null;
  };
  Update: {
    id?: string;
    event_type?: string;
    user_id?: string | null;
    entity_type?: string;
    entity_id?: string;
    changes?: Json | null;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: string | null;
  };
}