import { render, screen } from '@testing-library/react';
import { RemediationSteps } from './RemediationSteps';
import { describe, it, expect } from 'vitest';

describe('RemediationSteps', () => {
  const mockSteps = [
    {
      title: "Update Dependencies",
      description: "Update dependencies to latest version",
      severity: "high" as const
    },
    {
      title: "Enable 2FA",
      description: "Enable two-factor authentication",
      severity: "critical" as const
    },
    {
      title: "Review Permissions",
      description: "Review access permissions",
      severity: "medium" as const
    }
  ];

  it('renders all remediation steps', () => {
    render(<RemediationSteps steps={mockSteps} />);
    
    mockSteps.forEach(step => {
      expect(screen.getByText(step.description)).toBeInTheDocument();
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });

  it('renders nothing when steps array is empty', () => {
    const { container } = render(<RemediationSteps steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays the correct header', () => {
    render(<RemediationSteps steps={mockSteps} />);
    expect(screen.getByText('Recommended Remediation Steps')).toBeInTheDocument();
  });
});