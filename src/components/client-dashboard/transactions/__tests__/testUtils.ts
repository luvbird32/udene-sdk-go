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
  }
];

export const createMockFilterBuilder = (): TransactionFilterBuilder => {
  const response = {
    data: mockTransactionData,
    error: null,
    count: null,
    status: 200,
    statusText: 'OK',
    then: () => Promise.resolve(response),
    catch: () => Promise.resolve(response),
    finally: () => Promise.resolve(response),
    throwOnError: () => response,
    limit: () => response,
    order: () => response,
    range: () => response,
    single: () => response,
    maybeSingle: () => response,
    select: () => response,
    textSearch: () => response,
    match: () => response,
    eq: () => response,
    neq: () => response,
    gt: () => response,
    gte: () => response,
    lt: () => response,
    lte: () => response,
    like: () => response,
    ilike: () => response,
    likeAllOf: () => response,
    likeAnyOf: () => response,
    ilikeAllOf: () => response,
    ilikeAnyOf: () => response,
    is: () => response,
    in: () => response,
    contains: () => response,
    containedBy: () => response,
    rangeGt: () => response,
    rangeGte: () => response,
    rangeLt: () => response,
    rangeLte: () => response,
    rangeAdjacent: () => response,
    overlaps: () => response,
    not: () => response,
    filter: () => response,
    or: () => response,
  } as unknown as TransactionFilterBuilder;

  return response;
};

export const createEmptyMockFilterBuilder = (): TransactionFilterBuilder => {
  return {
    ...createMockFilterBuilder(),
    data: [],
  } as unknown as TransactionFilterBuilder;
};

export const mockSupabaseClient = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: { id: 'test-user' } } })
  },
  from: () => ({
    select: () => ({
      order: () => ({
        limit: () => createMockFilterBuilder()
      })
    })
  })
};