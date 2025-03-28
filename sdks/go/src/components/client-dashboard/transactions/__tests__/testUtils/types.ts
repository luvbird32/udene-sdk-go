import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';
import { DatabaseTransaction as Transaction } from "@/integrations/supabase/types/transactions";

export type TransactionResponse = PostgrestFilterBuilder<
  Database['public'],
  Database['public']['Tables']['transactions']['Row'],
  Transaction[]
>;

export type MockTransaction = Transaction & {
  // Add any additional mock properties if needed
};

export const mockTransactions: MockTransaction[] = [
  {
    id: "1",
    amount: 100,
    merchant_id: "merchant_1",
    customer_id: "customer_1",
    timestamp: new Date().toISOString(),
    location: "Location 1",
    device_id: "device_1",
    ip_address: "192.168.1.1",
    transaction_type: "purchase",
    card_present: true,
    recurring: false,
    risk_score: 30,
    is_fraudulent: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    risk_factors: null,
    feature_importance: null,
    feedback_status: null,
    feedback_notes: null,
    appeal_timestamp: null,
    message_velocity: null,
    profile_changes: null,
    interaction_patterns: null,
  },
  {
    id: "2",
    amount: 200,
    merchant_id: "merchant_2",
    customer_id: "customer_2",
    timestamp: new Date().toISOString(),
    location: "Location 2",
    device_id: "device_2",
    ip_address: "192.168.1.2",
    transaction_type: "refund",
    card_present: false,
    recurring: false,
    risk_score: 20,
    is_fraudulent: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    risk_factors: null,
    feature_importance: null,
    feedback_status: null,
    feedback_notes: null,
    appeal_timestamp: null,
    message_velocity: null,
    profile_changes: null,
    interaction_patterns: null,
  },
];