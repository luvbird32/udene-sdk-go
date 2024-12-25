import { Transaction } from '@/integrations/supabase/types/transactions';

export const mockTransactionData: Transaction[] = [
  {
    id: '1',
    amount: 100,
    created_at: '2024-01-01T00:00:00Z',
    is_fraudulent: false,
    merchant_id: 'merchant-1',
    customer_id: 'customer-1',
    timestamp: '2024-01-01T00:00:00Z',
    location: 'Test Location',
    device_id: 'device-1',
    ip_address: '127.0.0.1',
    transaction_type: 'purchase',
    card_present: true,
    recurring: false,
    risk_score: null,
    risk_factors: null,
    feature_importance: null,
    feedback_status: null,
    feedback_notes: null,
    appeal_timestamp: null,
    message_velocity: null,
    profile_changes: null,
    interaction_patterns: null,
    updated_at: null
  }
];