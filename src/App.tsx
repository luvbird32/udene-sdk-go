import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientDashboard from "@/pages/ClientDashboard";
import ClientSettings from "@/pages/ClientSettings";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { supabase } from "@/integrations/supabase/client";

function App() {
  useSessionTimeout();

  useEffect(() => {
    // Add security headers
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self' https://*.supabase.co; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co";
    document.head.appendChild(meta);
  }, []);

  return (
    <>
      <Helmet>
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="geolocation=(), camera=(), microphone=()" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-settings" element={<ClientSettings />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;