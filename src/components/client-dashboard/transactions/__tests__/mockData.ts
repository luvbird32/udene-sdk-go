import { Transaction } from '@/integrations/supabase/types/transactions';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';

export const mockTransactions: Transaction[] = [
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

type TransactionResponse = PostgrestFilterBuilder<
  Database['public'],
  Database['public']['Tables']['transactions']['Row'],
  Transaction[]
>;

const createBaseResponse = () => ({
  data: null,
  error: null,
  count: null,
  status: 200,
  statusText: 'OK'
});

export const createMockResponse = (data: Transaction[] = mockTransactions): TransactionResponse => {
  const baseResponse = {
    ...createBaseResponse(),
    data,
  };

  const response = {
    ...baseResponse,
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
    // Add missing methods from PostgrestFilterBuilder
    execute: () => Promise.resolve(response),
    abortSignal: () => response,
    returns: () => response,
    csv: () => response,
  } as unknown as TransactionResponse;

  return response;
};

export const createEmptyMockResponse = (): TransactionResponse => {
  return createMockResponse([]);
};

export const mockSupabaseClient = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: { id: 'test-user' } } })
  },
  from: () => ({
    select: () => ({
      order: () => ({
        limit: () => createMockResponse()
      })
    })
  })
};