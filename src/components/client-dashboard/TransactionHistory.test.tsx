import { render, screen, waitFor } from '@testing-library/react';
import { TransactionHistory } from './TransactionHistory';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Transaction } from '@/integrations/supabase/types/transactions';

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
            eq: () => Promise.resolve({
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
              ] as Transaction[],
              error: null
            })
          })
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
            eq: () => Promise.resolve({
              data: [],
              error: null
            })
          })
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