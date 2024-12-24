import { render, screen } from '@testing-library/react';
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
          limit: () => Promise.resolve({ data: [] })
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
});