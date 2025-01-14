import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import Settings from '@/pages/Settings'
import Users from '@/pages/Users'
import ClientSettings from '@/pages/ClientSettings'
import { supabase, refreshSession } from "@/integrations/supabase/client"
import { Loader2 } from 'lucide-react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth check error:', error);
          throw error;
        }
        
        if (!session && mounted) {
          console.log('No session found, redirecting to login');
          toast({
            title: "Authentication Required",
            description: "Please sign in to access this page",
            variant: "destructive",
          });
          navigate('/login', { replace: true });
          return;
        }
        
        if (session && new Date(session.expires_at * 1000) < new Date()) {
          console.log('Session expired, signing out');
          await supabase.auth.signOut();
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please sign in again.",
            variant: "destructive",
          });
          navigate('/login', { replace: true });
          return;
        }

        console.log('Auth check completed successfully');
      } catch (error) {
        console.error('Auth check error:', error);
        if (mounted) {
          toast({
            title: "Authentication Error",
            description: "Failed to verify authentication status",
            variant: "destructive",
          });
          navigate('/login', { replace: true });
        }
      } finally {
        if (mounted) {
          console.log('Setting loading state to false');
          setIsLoading(false);
        }
      }
    };
    
    checkAuth();
    return () => { mounted = false; };
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return <>{children}</>;
};

function App() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        console.log('Initializing authentication...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session && mounted) {
          console.log('Initial session found:', session.user.id);
          await refreshSession();
          
          const publicRoutes = ['/', '/login', '/signup'];
          const currentPath = window.location.pathname;
          
          if (publicRoutes.includes(currentPath)) {
            navigate('/dashboard', { replace: true });
          }
        } else if (mounted) {
          console.log('No initial session found');
          const publicRoutes = ['/', '/login', '/signup'];
          if (!publicRoutes.includes(window.location.pathname)) {
            navigate('/login', { replace: true });
          }
        }
      } catch (error) {
        console.error('Error checking initial session:', error);
        if (mounted) {
          toast({
            title: "Authentication Error",
            description: "Failed to verify authentication status",
            variant: "destructive",
          });
          navigate('/login', { replace: true });
        }
      } finally {
        if (mounted) {
          console.log('Setting initializing state to false');
          setIsInitializing(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('Auth state change:', event, session?.user?.id);
      
      try {
        switch (event) {
          case 'SIGNED_IN':
            if (session) {
              localStorage.setItem('supabase.auth.token', session.access_token);
              await refreshSession();
              navigate('/dashboard', { replace: true });
              toast({
                title: "Welcome back!",
                description: "You have successfully signed in.",
              });
            }
            break;
            
          case 'SIGNED_OUT':
            localStorage.removeItem('supabase.auth.token');
            navigate('/login', { replace: true });
            toast({
              title: "Signed out",
              description: "You have been signed out successfully.",
            });
            break;
            
          case 'TOKEN_REFRESHED':
            if (session) {
              localStorage.setItem('supabase.auth.token', session.access_token);
              console.log('Token refreshed successfully');
            }
            break;
            
          case 'USER_UPDATED':
            console.log('User profile updated');
            toast({
              title: "Profile Updated",
              description: "Your profile has been updated successfully.",
            });
            break;
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        if (mounted) {
          toast({
            title: "Authentication Error",
            description: "There was a problem with your authentication status",
            variant: "destructive",
          });
          navigate('/login', { replace: true });
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/client-settings" element={<ProtectedRoute><ClientSettings /></ProtectedRoute>} />
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App