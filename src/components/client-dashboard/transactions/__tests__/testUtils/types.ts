import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';
import { Transaction } from '@/integrations/supabase/types/transactions';

export type TransactionResponse = PostgrestFilterBuilder<
  Database['public'],
  Database['public']['Tables']['transactions']['Row'],
  Transaction[]
>;