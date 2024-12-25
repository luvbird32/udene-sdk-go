import { render, screen, waitFor } from '@testing-library/react';
import { TransactionHistory } from './TransactionHistory';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestFilterBuilder, PostgrestBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';

type TransactionRow = Database['public']['Tables']['transactions']['Row'];

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
                is_fraudulent: false
              },
              {
                id: '2',
                amount: 200,
                created_at: '2024-01-02T00:00:00Z',
                is_fraudulent: true
              }
            ],
            error: null
          })
        })
      }) as unknown as PostgrestFilterBuilder<Database, TransactionRow, TransactionRow>
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
    
    expect(screen.getByText(/Loading transactions/)).toBeInTheDocument();
  });

  it('displays transactions after loading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionHistory />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Loading transactions/)).not.toBeInTheDocument();
    });

    // Check if transactions are displayed
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    
    // Check if badges are displayed correctly
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('Flagged')).toBeInTheDocument();
  });

  it('displays empty state when no transactions', async () => {
    // Override mock for this test
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: () => ({
        order: () => ({
          limit: () => ({
            data: [],
            error: null
          })
        })
      }) as unknown as PostgrestFilterBuilder<Database, TransactionRow, TransactionRow>
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