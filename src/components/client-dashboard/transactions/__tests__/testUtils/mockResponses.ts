import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';
import { Transaction } from '@/integrations/supabase/types/transactions';

type TransactionResponse = PostgrestFilterBuilder<
  Database['public'],
  Database['public']['Tables']['transactions']['Row'],
  Transaction[]
>;

const mockTransactionData: Transaction[] = [
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

const createBaseResponse = () => ({
  data: null,
  error: null,
  count: null,
  status: 200,
  statusText: 'OK',
  then: () => Promise.resolve(mockTransactionData),
  catch: () => Promise.resolve(mockTransactionData),
  finally: () => Promise.resolve(mockTransactionData),
  throwOnError: () => createBaseResponse(),
  limit: () => createBaseResponse(),
  order: () => createBaseResponse(),
  range: () => createBaseResponse(),
  single: () => createBaseResponse(),
  maybeSingle: () => createBaseResponse(),
  select: () => createBaseResponse(),
  textSearch: () => createBaseResponse(),
  match: () => createBaseResponse(),
  eq: () => createBaseResponse(),
  neq: () => createBaseResponse(),
  gt: () => createBaseResponse(),
  gte: () => createBaseResponse(),
  lt: () => createBaseResponse(),
  lte: () => createBaseResponse(),
  like: () => createBaseResponse(),
  ilike: () => createBaseResponse(),
  likeAllOf: () => createBaseResponse(),
  likeAnyOf: () => createBaseResponse(),
  ilikeAllOf: () => createBaseResponse(),
  ilikeAnyOf: () => createBaseResponse(),
  is: () => createBaseResponse(),
  in: () => createBaseResponse(),
  contains: () => createBaseResponse(),
  containedBy: () => createBaseResponse(),
  rangeGt: () => createBaseResponse(),
  rangeGte: () => createBaseResponse(),
  rangeLt: () => createBaseResponse(),
  rangeLte: () => createBaseResponse(),
  rangeAdjacent: () => createBaseResponse(),
  overlaps: () => createBaseResponse(),
  not: () => createBaseResponse(),
  filter: () => createBaseResponse(),
  or: () => createBaseResponse(),
  execute: () => Promise.resolve(createBaseResponse())
});

export const createMockResponse = (): TransactionResponse => {
  return {
    ...createBaseResponse(),
    data: mockTransactionData,
  } as unknown as TransactionResponse;
};

export const createEmptyMockResponse = (): TransactionResponse => {
  return {
    ...createBaseResponse(),
    data: [],
  } as unknown as TransactionResponse;
};