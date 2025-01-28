import { Navigate } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Users from '@/pages/Users';
import AdminDashboard from '@/pages/AdminDashboard';
import SecurityScan from '@/pages/SecurityScan';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import ClientSettings from '@/pages/ClientSettings';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { InvestigationSection } from '@/components/admin-dashboard/investigation/InvestigationSection';

export const createRoutes = (user: any, loading: boolean) => [
  // Public routes
  {
    path: '/',
    element: user ? <Navigate to="/dashboard" replace /> : <Landing />
  },
  {
    path: '/login',
    element: user ? <Navigate to="/dashboard" replace /> : <Login />
  },
  {
    path: '/signup',
    element: user ? <Navigate to="/dashboard" replace /> : <Signup />
  },
  
  // Blog routes
  {
    path: '/blog',
    element: <Blog />
  },
  {
    path: '/blog/:slug',
    element: <BlogPost />
  },
  
  // Protected routes
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
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/investigations',
    element: (
      <ProtectedRoute>
        <InvestigationSection />
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
  },
  
  // Catch-all redirect
  {
    path: '*',
    element: <Navigate to={user ? "/dashboard" : "/"} replace />
  }
];