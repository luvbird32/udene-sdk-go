import { Json } from "./index";

export interface ClientService {
  id: string;
  user_id: string;
  service_type: string;
  is_active: boolean;
  settings: Json;
  created_at: string | null;
  updated_at: string | null;
}

export interface ClientServiceInsert extends Omit<ClientService, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ClientServiceUpdate extends Partial<ClientServiceInsert> {}