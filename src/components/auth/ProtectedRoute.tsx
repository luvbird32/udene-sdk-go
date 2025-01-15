import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { supabase } from "@/integrations/supabase/client";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      if (!user) {
        console.log('No user found, redirecting to login');
        toast({
          title: "Authentication Required",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate('/login', { replace: true });
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session && new Date(session.expires_at * 1000) < new Date()) {
        console.log('Session expired, signing out');
        await supabase.auth.signOut();
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        navigate('/login', { replace: true });
      }
    };

    if (!loading) {
      checkSession();
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return <>{children}</>;
};