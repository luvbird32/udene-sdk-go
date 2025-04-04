import { DatabaseTransaction as Transaction } from "@/integrations/supabase/types/transactions";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 100,
    merchant_id: "merchant_1",
    customer_id: "customer_1",
    timestamp: "2023-01-01T12:00:00Z",
    location: "Location 1",
    device_id: "device_1",
    ip_address: "192.168.1.1",
    transaction_type: "purchase",
    card_present: true,
    recurring: false,
    risk_score: 30,
    is_fraudulent: false,
    created_at: "2023-01-01T12:00:00Z",
    updated_at: "2023-01-01T12:00:00Z",
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
    timestamp: "2023-01-02T12:00:00Z",
    location: "Location 2",
    device_id: "device_2",
    ip_address: "192.168.1.2",
    transaction_type: "refund",
    card_present: false,
    recurring: false,
    risk_score: 50,
    is_fraudulent: true,
    created_at: "2023-01-02T12:00:00Z",
    updated_at: "2023-01-02T12:00:00Z",
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
