import { render, screen } from '@testing-library/react';
import { ClientMetrics } from './ClientMetrics';
import { describe, it, expect } from 'vitest';

describe('ClientMetrics', () => {
  const mockMetrics = {
    riskScore: 85,
    totalTransactions: 150,
    flaggedTransactions: 5
  };

  it('renders metrics correctly', () => {
    render(<ClientMetrics metrics={mockMetrics} isLoading={false} error={null} />);
    
    expect(screen.getByText('Risk Score')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<ClientMetrics isLoading={true} error={null} />);
    
    const skeletons = document.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows error state', () => {
    const error = new Error('Test error');
    render(<ClientMetrics isLoading={false} error={error} />);
    
    expect(screen.getByText(/Error loading metrics/)).toBeInTheDocument();
  });
});