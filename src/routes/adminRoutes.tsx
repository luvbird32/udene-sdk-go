import AdminDashboard from '@/pages/AdminDashboard';
import { InvestigationSection } from '@/components/admin-dashboard/investigation/InvestigationSection';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export const adminRoutes = [
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
  }
];