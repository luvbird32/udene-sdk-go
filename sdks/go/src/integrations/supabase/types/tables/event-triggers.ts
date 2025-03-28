import { Json } from '../database';

export interface EventTriggersTable {
  Row: {
    id: string;
    name: string;
    description: string | null;
    event_type: string;
    conditions: Json;
    actions: Json;
    is_active: boolean | null;
    created_at: string | null;
    updated_at: string | null;
    user_id: string;
  };
  Insert: {
    id?: string;
    name: string;
    description?: string | null;
    event_type: string;
    conditions?: Json;
    actions?: Json;
    is_active?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
    user_id: string;
  };
  Update: {
    id?: string;
    name?: string;
    description?: string | null;
    event_type?: string;
    conditions?: Json;
    actions?: Json;
    is_active?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
    user_id?: string;
  };
}