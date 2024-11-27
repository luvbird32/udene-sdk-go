/**
 * Main application component that handles routing and global providers.
 * Wraps the entire application with QueryClientProvider for data fetching
 * and Router for navigation.
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EmailVerification } from "./components/auth/EmailVerification";
import { PasswordReset } from "./components/auth/PasswordReset";
import { MFASetup } from "./components/auth/MFASetup";
import { Layout } from "./components/layout/Layout";

// Initialize QueryClient for managing server state
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            {/* Main dashboard route */}
            <Route path="/" element={<Index />} />
            {/* User settings management */}
            <Route path="/settings" element={<Settings />} />
            {/* User management dashboard */}
            <Route path="/users" element={<Users />} />
            {/* Authentication routes */}
            <Route path="/auth/verify-email" element={<EmailVerification />} />
            <Route path="/auth/reset-password" element={<PasswordReset />} />
            <Route path="/auth/mfa-setup" element={<MFASetup />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;