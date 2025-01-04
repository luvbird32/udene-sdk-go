import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  allowedRole: 'admin' | 'client';
}

export const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setHasAccess(false);
          setIsLoading(false);
          return;
        }

        // Check user's account type from profiles
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('account_type')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: "Error",
            description: "Failed to verify access. Please try again.",
            variant: "destructive",
          });
          setHasAccess(false);
        } else {
          // Check if user's account type matches the allowed role
          const hasPermission = 
            (allowedRole === 'admin' && profile.account_type === 'admin') ||
            (allowedRole === 'client' && profile.account_type === 'personal');
          
          setHasAccess(hasPermission);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [allowedRole, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    );
  }

  return hasAccess ? <Outlet /> : <Navigate to="/login" replace />;
};