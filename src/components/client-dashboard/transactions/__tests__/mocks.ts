import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';
import { Transaction } from '@/integrations/supabase/types/transactions';

type TransactionFilterBuilder = PostgrestFilterBuilder<
  Database['public'],
  Database['public']['Tables']['transactions'],
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
  },
  {
    id: '2',
    amount: 200,
    created_at: '2024-01-02T00:00:00Z',
    is_fraudulent: true,
    merchant_id: 'merchant-2',
    customer_id: 'customer-2',
    timestamp: '2024-01-02T00:00:00Z',
    location: 'Test Location 2',
    device_id: 'device-2',
    ip_address: '127.0.0.2',
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

export const createMockFilterBuilder = (): TransactionFilterBuilder => {
  const response = {
    data: mockTransactionData,
    error: null,
    count: null,
    status: 200,
    statusText: 'OK'
  } as const;

  const builder = {
    ...response,
    then: () => Promise.resolve(response),
    catch: () => Promise.resolve(response),
    finally: () => Promise.resolve(response),
    throwOnError: () => builder,
    limit: () => builder,
    order: () => builder,
    range: () => builder,
    single: () => builder,
    maybeSingle: () => builder,
    select: () => builder,
    textSearch: () => builder,
    match: () => builder,
    eq: () => builder,
    neq: () => builder,
    gt: () => builder,
    gte: () => builder,
    lt: () => builder,
    lte: () => builder,
    like: () => builder,
    ilike: () => builder,
    likeAllOf: () => builder,
    likeAnyOf: () => builder,
    ilikeAllOf: () => builder,
    ilikeAnyOf: () => builder,
    is: () => builder,
    in: () => builder,
    contains: () => builder,
    containedBy: () => builder,
    rangeGt: () => builder,
    rangeGte: () => builder,
    rangeLt: () => builder,
    rangeLte: () => builder,
    rangeAdjacent: () => builder,
    overlaps: () => builder,
    not: () => builder,
    filter: () => builder,
    or: () => builder,
  } as unknown as TransactionFilterBuilder;

  return builder;
};

export const mockEmptyFilterBuilder = (): TransactionFilterBuilder => {
  const emptyResponse = {
    ...createMockFilterBuilder(),
    data: [],
  } as unknown as TransactionFilterBuilder;
  return emptyResponse;
};