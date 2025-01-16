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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const mounted = React.useRef(true);

  useEffect(() => {
    console.log('AuthProvider: Starting authentication initialization');
    let authListener: any;
    
    const initAuth = async () => {
      try {
        console.log('AuthProvider: Fetching initial session');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider: Session retrieval error:', error);
          throw error;
        }

        if (mounted.current) {
          if (session?.user) {
            console.log('AuthProvider: Initial session found for user:', session.user.id);
            setUser(session.user);
          } else {
            console.log('AuthProvider: No initial session found');
            setUser(null);
          }
          setLoading(false);
        }

        // Set up real-time auth listener
        console.log('AuthProvider: Setting up auth state listener');
        authListener = supabase.auth.onAuthStateChange((event, session) => {
          if (!mounted.current) return;

          console.log('AuthProvider: Auth state changed:', event, session?.user?.id);
          
          if (session?.user) {
            setUser(session.user);
          } else {
            setUser(null);
          }
          setLoading(false);

          if (event === 'SIGNED_IN') {
            console.log('AuthProvider: User signed in successfully');
            toast({
              title: "Welcome!",
              description: "You have been signed in successfully.",
            });
          } else if (event === 'SIGNED_OUT') {
            console.log('AuthProvider: User signed out successfully');
            toast({
              title: "Goodbye!",
              description: "You have been signed out successfully.",
            });
          }
        });

      } catch (error) {
        console.error('AuthProvider: Authentication initialization error:', error);
        if (mounted.current) {
          setLoading(false);
          toast({
            title: "Authentication Error",
            description: "Failed to initialize authentication. Please try refreshing the page.",
            variant: "destructive",
          });
        }
      }
    };

    initAuth();

    return () => {
      console.log('AuthProvider: Cleaning up auth listener');
      mounted.current = false;
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []); // Remove toast from dependencies to avoid re-initialization

  console.log('AuthProvider: Current state:', { user: user?.id, loading });

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};