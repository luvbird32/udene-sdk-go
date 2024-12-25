import { render, screen, waitFor } from '@testing-library/react';
import { TransactionHistory } from './TransactionHistory';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Transaction } from '@/integrations/supabase/types/transactions';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';

// Mock the Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: () => Promise.resolve({ data: { user: { id: 'test-user' } } })
    },
    from: () => ({
      select: () => ({
        order: () => ({
          limit: () => ({
            data: [
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
                recurring: false
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
                recurring: false
              }
            ] as Transaction[],
            error: null
          }) as unknown as PostgrestFilterBuilder<Database['public'], Database['public']['Tables']['transactions'], Transaction[]>
        })
      })
    })
  }
}));

describe('TransactionHistory', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it('renders loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionHistory />
      </QueryClientProvider>
    );
    
    expect(screen.getByText(/Recent Transactions/)).toBeInTheDocument();
    // Should find 3 skeleton loaders
    const skeletons = document.querySelectorAll('.h-[68px]');
    expect(skeletons).toHaveLength(3);
  });

  it('displays transactions after loading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionHistory />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('$100')).toBeInTheDocument();
      expect(screen.getByText('$200')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('Flagged')).toBeInTheDocument();
  });

  it('displays empty state when no transactions', async () => {
    // Override the mock for this specific test
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: () => ({
        order: () => ({
          limit: () => ({
            data: [],
            error: null
          }) as unknown as PostgrestFilterBuilder<Database['public'], Database['public']['Tables']['transactions'], Transaction[]>
        })
      })
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <TransactionHistory />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No recent transactions/)).toBeInTheDocument();
    });
  });
});