import type { Database } from '@/integrations/supabase/types';

export type ClientService = Database['public']['Tables']['client_services']['Row'];
export type ClientServiceInsert = Database['public']['Tables']['client_services']['Insert'];
export type ClientServiceUpdate = Database['public']['Tables']['client_services']['Update'];

export interface FraudDetectionService {
  type: string;
  title: string;
  description: string;
  features: string[];
}