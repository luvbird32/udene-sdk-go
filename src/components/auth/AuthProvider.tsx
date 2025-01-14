import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            console.log('Session found for user:', session.user.id);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        toast({
          title: "Authentication Error",
          description: "Failed to initialize authentication",
          variant: "destructive",
        });
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      console.log('Auth state changed:', event);
      setUser(session?.user ?? null);

      switch (event) {
        case 'SIGNED_IN':
          navigate('/dashboard', { replace: true });
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          break;

        case 'SIGNED_OUT':
          navigate('/login', { replace: true });
          toast({
            title: "Signed out",
            description: "You have been signed out successfully.",
          });
          break;
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};