import { render, screen } from '@testing-library/react';
import { TransactionHistory } from '../TransactionHistory';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('TransactionHistory Loading State', () => {
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
    const skeletons = document.querySelectorAll('.h-[68px]');
    expect(skeletons).toHaveLength(3);
  });
});