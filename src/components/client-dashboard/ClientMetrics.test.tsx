import { render, screen, waitFor } from '@testing-library/react';
import { ClientMetrics } from './ClientMetrics';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the useAuth hook
vi.mock('@/components/auth/AuthProvider', () => ({
  useAuth: () => ({
    user: { id: 'test-user' },
  }),
}));

// Mock the useMetricsData hook
vi.mock('./metrics/useMetricsData', () => ({
  useMetricsData: () => ({
    data: {
      riskScore: 75,
      totalTransactions: 100,
      flaggedTransactions: 5,
      avgProcessingTime: 150,
      concurrentCalls: 10,
      activeUsers: 25
    },
    isLoading: false,
    error: null
  }),
}));

describe('ClientMetrics', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    );
  };

  it('renders all metric cards with correct values', async () => {
    renderWithProviders(<ClientMetrics />);

    await waitFor(() => {
      expect(screen.getByText('75%')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('150ms')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    renderWithProviders(<ClientMetrics isLoading={true} />);
    const loadingElements = screen.getAllByText('Loading...');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('shows error state', () => {
    const error = new Error('Test error');
    renderWithProviders(<ClientMetrics error={error} />);
    expect(screen.getByText(/Error loading metrics/i)).toBeInTheDocument();
  });

  it('handles empty metrics data', () => {
    renderWithProviders(<ClientMetrics metrics={null} />);
    expect(screen.getByText(/No metrics data available/i)).toBeInTheDocument();
  });
});