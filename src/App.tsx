import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import Settings from '@/pages/Settings'
import Users from '@/pages/Users'
import ClientSettings from '@/pages/ClientSettings'
import { supabase, refreshSession } from "@/integrations/supabase/client"

function App() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Initial session check
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session) {
          console.log('Initial session found:', session.user.id);
          // Ensure we have a fresh session
          await refreshSession();
        } else {
          console.log('No initial session found');
          // Only redirect to login if we're not already on a public route
          const publicRoutes = ['/', '/login', '/signup'];
          if (!publicRoutes.includes(window.location.pathname)) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error checking initial session:', error);
        toast({
          title: "Authentication Error",
          description: "Failed to verify authentication status. Please try refreshing the page.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };

    initAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.id);
      
      try {
        switch (event) {
          case 'SIGNED_IN':
            await refreshSession();
            navigate('/dashboard');
            toast({
              title: "Welcome back!",
              description: "You have successfully signed in.",
            });
            break;
            
          case 'SIGNED_OUT':
            navigate('/login');
            toast({
              title: "Signed out",
              description: "You have been signed out successfully.",
            });
            break;
            
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed successfully');
            break;
            
          case 'USER_UPDATED':
            console.log('User profile updated');
            break;
            
          case 'PASSWORD_RECOVERY':
            navigate('/login');
            toast({
              title: "Password Reset",
              description: "Your password has been reset successfully.",
            });
            break;
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        toast({
          title: "Authentication Error",
          description: "There was a problem with your authentication status. Please try signing in again.",
          variant: "destructive",
        });
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<Users />} />
        <Route path="/client-settings" element={<ClientSettings />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App