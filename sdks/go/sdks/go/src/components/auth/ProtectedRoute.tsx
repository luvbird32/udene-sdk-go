import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { LoadingSpinner } from '@/components/ui/states/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  
  console.log('ProtectedRoute:', { 
    isLoading: loading, 
    hasUser: !!user, 
    userId: user?.id 
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    console.log('ProtectedRoute: No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};