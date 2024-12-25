import { render, screen } from '@testing-library/react';
import { RemediationSteps } from './RemediationSteps';
import { describe, it, expect } from 'vitest';

describe('RemediationSteps', () => {
  const mockSteps = [
    'Update dependencies to latest version',
    'Enable two-factor authentication',
    'Review access permissions'
  ];

  it('renders all remediation steps', () => {
    render(<RemediationSteps steps={mockSteps} />);
    
    mockSteps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it('renders nothing when steps array is empty', () => {
    const { container } = render(<RemediationSteps steps={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when steps is undefined', () => {
    const { container } = render(<RemediationSteps steps={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('displays the correct header', () => {
    render(<RemediationSteps steps={mockSteps} />);
    expect(screen.getByText('Recommended Actions')).toBeInTheDocument();
  });
});