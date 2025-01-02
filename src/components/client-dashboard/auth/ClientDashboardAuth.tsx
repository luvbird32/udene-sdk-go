import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ClientDashboardAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if user has client role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile?.role === 'client') {
          navigate('/client-dashboard');
        } else {
          toast({
            title: "Access Denied",
            description: "You need client access to view this dashboard",
            variant: "destructive"
          });
          navigate('/login');
        }
      }
    };

    checkAuth();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-green-400 mb-8">
          Client Dashboard Access
        </h1>
        <div className="max-w-md mx-auto">
          <AuthFormWrapper />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardAuth;