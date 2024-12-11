import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Settings from "./pages/Settings";
import ClientSettings from "./pages/ClientSettings";
import Users from "./pages/Users";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { AuthFormWrapper } from "./components/auth/AuthFormWrapper";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<AuthFormWrapper />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/client-dashboard"
            element={isAuthenticated ? <ClientDashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <Settings /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/client-settings"
            element={isAuthenticated ? <ClientSettings /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/users"
            element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />}
          />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;