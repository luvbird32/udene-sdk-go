import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ClientProfile } from './ClientProfile';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the hooks
vi.mock('./profile/useProfileData', () => ({
  useProfileData: () => ({
    data: {
      username: 'testuser',
      organization_name: 'Test Org',
      organization_role: 'Admin',
      phone_number: '123-456-7890',
      timezone: 'UTC',
      preferences: {
        notifications: {
          email: true,
          sms: false
        }
      }
    },
    isLoading: false,
    refetch: vi.fn()
  })
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

describe('ClientProfile', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it('renders profile information correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ClientProfile />
      </QueryClientProvider>
    );
    
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('Test Org')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
  });

  it('toggles edit mode when edit button is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ClientProfile />
      </QueryClientProvider>
    );

    const editButton = screen.getByText('Edit Profile');
    fireEvent.click(editButton);

    // Check if form inputs are displayed
    const usernameInput = screen.getByDisplayValue('testuser');
    expect(usernameInput).toBeInTheDocument();

    // Check if cancel button appears
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});