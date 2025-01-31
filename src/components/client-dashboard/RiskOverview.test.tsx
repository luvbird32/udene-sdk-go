import { render, screen, waitFor } from '@testing-library/react';
import { RiskOverview } from './RiskOverview';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the useRiskData hook
vi.mock('./analytics/risk/useRiskData', () => ({
  useRiskData: () => ({
    data: [
      { date: '2024-01-01', riskScore: 75 },
      { date: '2024-01-02', riskScore: 85 }
    ],
    isLoading: false,
    error: null
  }),
}));

describe('RiskOverview', () => {
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

  it('renders risk score trend title', () => {
    renderWithProviders(<RiskOverview />);
    expect(screen.getByText('Risk Score Trend')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    vi.mock('./analytics/risk/useRiskData', () => ({
      useRiskData: () => ({
        data: null,
        isLoading: true,
        error: null
      }),
    }));

    renderWithProviders(<RiskOverview />);
    expect(screen.getByText(/Loading risk data/i)).toBeInTheDocument();
  });

  it('handles error state', () => {
    vi.mock('./analytics/risk/useRiskData', () => ({
      useRiskData: () => ({
        data: null,
        isLoading: false,
        error: new Error('Failed to load risk data')
      }),
    }));

    renderWithProviders(<RiskOverview />);
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });

  it('displays empty state when no data is available', () => {
    vi.mock('./analytics/risk/useRiskData', () => ({
      useRiskData: () => ({
        data: [],
        isLoading: false,
        error: null
      }),
    }));

    renderWithProviders(<RiskOverview />);
    expect(screen.getByText(/No risk data available/i)).toBeInTheDocument();
  });
});