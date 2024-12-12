import { Json } from '../database';

export interface ClientServicesTable {
  Row: {
    id: string;
    user_id: string;
    service_type: string;
    is_active: boolean | null;
    settings: Json | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    user_id: string;
    service_type: string;
    is_active?: boolean | null;
    settings?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    user_id?: string;
    service_type?: string;
    is_active?: boolean | null;
    settings?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}