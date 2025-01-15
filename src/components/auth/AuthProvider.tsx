import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const mounted = React.useRef(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session retrieval error:', error);
          throw error;
        }

        if (mounted.current) {
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
        toast({
          title: "Authentication Error",
          description: "Failed to initialize authentication",
          variant: "destructive",
        });
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted.current) return;

      console.log('Auth state changed:', event, session?.user?.id);
      
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }

      switch (event) {
        case 'SIGNED_IN':
          toast({
            title: "Welcome!",
            description: "You have been signed in successfully.",
          });
          break;

        case 'SIGNED_OUT':
          toast({
            title: "Goodbye!",
            description: "You have been signed out successfully.",
          });
          break;

        case 'TOKEN_REFRESHED':
          console.log('Token refreshed successfully');
          break;

        case 'USER_UPDATED':
          console.log('User data updated');
          break;
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [toast]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};