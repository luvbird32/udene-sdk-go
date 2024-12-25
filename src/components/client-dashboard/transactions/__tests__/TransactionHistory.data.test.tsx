import { render, screen, waitFor } from '@testing-library/react';
import { TransactionHistory } from '../TransactionHistory';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { createMockResponse } from './testUtils/mockResponses';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
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
  }
}));

describe('TransactionHistory Data Display', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it('displays transactions after loading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TransactionHistory />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('$100')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });
});