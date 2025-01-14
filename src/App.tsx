import { useEffect } from 'react'
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

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate('/login', { replace: true });
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  return <>{children}</>;
};

function App() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
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
            description: "Failed to verify authentication status. Please try refreshing the page.",
            variant: "destructive",
          });
          navigate('/login', { replace: true });
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

          case 'USER_DELETED':
            localStorage.removeItem('supabase.auth.token');
            navigate('/login', { replace: true });
            toast({
              title: "Account Deleted",
              description: "Your account has been deleted.",
              variant: "destructive",
            });
            break;
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        if (mounted) {
          toast({
            title: "Authentication Error",
            description: "There was a problem with your authentication status. Please try signing in again.",
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
  )
}

export default App