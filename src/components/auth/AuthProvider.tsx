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
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session retrieval error:', error);
          throw error;
        }

        if (mounted) {
          if (session?.user) {
            console.log('Session found for user:', session.user.id);
            setUser(session.user);
          } else {
            console.log('No active session found');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear any stale session data
        localStorage.removeItem('supabase.auth.token');
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

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth state changed:', event);
      
      if (session?.user) {
        setUser(session.user);
        // Store the session
        localStorage.setItem('supabase.auth.token', session.access_token);
      } else {
        setUser(null);
        // Clear session data
        localStorage.removeItem('supabase.auth.token');
      }

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

        case 'TOKEN_REFRESHED':
          console.log('Token refreshed successfully');
          if (session) {
            localStorage.setItem('supabase.auth.token', session.access_token);
          }
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