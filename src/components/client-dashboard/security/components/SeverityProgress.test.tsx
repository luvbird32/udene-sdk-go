import { render, screen } from '@testing-library/react';
import { SeverityProgress } from './SeverityProgress';
import { describe, it, expect } from 'vitest';

describe('SeverityProgress', () => {
  const defaultProps = {
    label: 'Critical',
    count: 5,
    total: 20,
    colorClass: 'text-red-500'
  };

  it('renders label and count correctly', () => {
    render(<SeverityProgress {...defaultProps} />);
    
    expect(screen.getByText('Critical')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('applies correct color classes', () => {
    const { container } = render(<SeverityProgress {...defaultProps} />);
    
    const progressBar = container.querySelector('.bg-red-500');
    expect(progressBar).toBeInTheDocument();
  });

  it('calculates progress percentage correctly', () => {
    const { container } = render(<SeverityProgress {...defaultProps} />);
    
    const progressElement = container.querySelector('progress');
    expect(progressElement).toHaveAttribute('value', '25');
  });
});