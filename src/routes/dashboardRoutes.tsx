import { Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Users from '@/pages/Users';
import SecurityScan from '@/pages/SecurityScan';
import ClientSettings from '@/pages/ClientSettings';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProjectProvider } from '@/contexts/ProjectContext';

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <ProjectProvider>
          <Dashboard />
        </ProjectProvider>
      </ProtectedRoute>
    )
  },
  {
    path: '/security-scan',
    element: (
      <ProtectedRoute>
        <SecurityScan />
      </ProtectedRoute>
    )
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <ProjectProvider>
          <Settings />
        </ProjectProvider>
      </ProtectedRoute>
    )
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    )
  },
  {
    path: '/client-settings',
    element: (
      <ProtectedRoute>
        <ProjectProvider>
          <ClientSettings />
        </ProjectProvider>
      </ProtectedRoute>
    )
  }
];