import { Database } from "./database";

export type APIKey = Database['public']['Tables']['api_keys']['Row'];
export type APIKeyInsert = Database['public']['Tables']['api_keys']['Insert'];
export type APIKeyUpdate = Database['public']['Tables']['api_keys']['Update'];

export type ClientAPIKey = Database['public']['Tables']['client_api_keys']['Row'];
export type ClientAPIKeyInsert = Database['public']['Tables']['client_api_keys']['Insert'];
export type ClientAPIKeyUpdate = Database['public']['Tables']['client_api_keys']['Update'];

export type APICredit = Database['public']['Tables']['api_credits']['Row'];
export type APICreditInsert = Database['public']['Tables']['api_credits']['Insert'];
export type APICreditUpdate = Database['public']['Tables']['api_credits']['Update'];