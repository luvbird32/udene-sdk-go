import { Json } from '../database';

export interface WebhooksTable {
  Row: {
    id: string;
    url: string;
    description: string | null;
    events: string[];
    is_active: boolean | null;
    secret_key: string;
    created_at: string | null;
    updated_at: string | null;
    last_triggered_at: string | null;
    failure_count: number | null;
  };
  Insert: {
    id?: string;
    url: string;
    description?: string | null;
    events: string[];
    is_active?: boolean | null;
    secret_key: string;
    created_at?: string | null;
    updated_at?: string | null;
    last_triggered_at?: string | null;
    failure_count?: number | null;
  };
  Update: {
    id?: string;
    url?: string;
    description?: string | null;
    events?: string[];
    is_active?: boolean | null;
    secret_key?: string;
    created_at?: string | null;
    updated_at?: string | null;
    last_triggered_at?: string | null;
    failure_count?: number | null;
  };
}

export interface WebhookDeliveriesTable {
  Row: {
    id: string;
    webhook_id: string | null;
    event_type: string;
    payload: Json;
    response_status: number | null;
    response_body: string | null;
    created_at: string | null;
  };
  Insert: {
    id?: string;
    webhook_id?: string | null;
    event_type: string;
    payload: Json;
    response_status?: number | null;
    response_body?: string | null;
    created_at?: string | null;
  };
  Update: {
    id?: string;
    webhook_id?: string | null;
    event_type?: string;
    payload?: Json;
    response_status?: number | null;
    response_body?: string | null;
    created_at?: string | null;
  };
}