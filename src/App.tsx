import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import ClientDashboard from '@/pages/ClientDashboard'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import Settings from '@/pages/Settings'
import Users from '@/pages/Users'
import ClientSettings from '@/pages/ClientSettings'
import { supabase } from "@/integrations/supabase/client"
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

function App() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user?.id);
        navigate('/client-dashboard');
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        navigate('/');
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Admin Routes (No Auth) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<Users />} />

        {/* Protected Client Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-settings" element={<ClientSettings />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App