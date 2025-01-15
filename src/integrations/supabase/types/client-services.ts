import { Database } from "./database";
import { Json } from "./database";

export type ClientService = {
  id: string;
  user_id: string;
  service_type: string;
  is_active: boolean | null;
  settings: Json | null;
  created_at: string | null;
  updated_at: string | null;
  project_id: string | null;
  action_preferences: Json | null;
};

export type ClientServiceInsert = Database['public']['Tables']['client_services']['Insert'];
export type ClientServiceUpdate = Database['public']['Tables']['client_services']['Update'];