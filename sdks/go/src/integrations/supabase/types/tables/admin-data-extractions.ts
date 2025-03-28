import { Json } from '../database';

export interface AdminDataExtractionsTable {
  Row: {
    id: string;
    admin_id: string;
    extraction_type: string;
    query_params: Json | null;
    status: string;
    file_url: string | null;
    record_count: number | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    admin_id: string;
    extraction_type: string;
    query_params?: Json | null;
    status?: string;
    file_url?: string | null;
    record_count?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    admin_id?: string;
    extraction_type?: string;
    query_params?: Json | null;
    status?: string;
    file_url?: string | null;
    record_count?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}