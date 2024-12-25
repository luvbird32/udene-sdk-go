import { render, screen, waitFor } from '@testing-library/react';
import { RiskOverview } from './RiskOverview';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: () => Promise.resolve({ data: { user: { id: 'test-user' } } })
    },
    from: () => ({
      select: () => ({
        order: () => ({
          limit: () => Promise.resolve({
            data: [
              { risk_score: 75, created_at: '2024-01-01T00:00:00Z' },
              { risk_score: 85, created_at: '2024-01-02T00:00:00Z' }
            ]
          })
        })
      })
    })
  }
}));

describe('RiskOverview', () => {
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
        <RiskOverview />
      </QueryClientProvider>
    );
    
    expect(screen.getByText(/Loading risk data/)).toBeInTheDocument();
  });

  it('displays risk data after loading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RiskOverview />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Loading risk data/)).not.toBeInTheDocument();
    });

    // Chart should be rendered with data
    const chart = document.querySelector('.recharts-wrapper');
    expect(chart).toBeInTheDocument();
  });
});