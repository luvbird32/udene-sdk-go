import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EmailVerification } from "./components/auth/EmailVerification";
import { PasswordReset } from "./components/auth/PasswordReset";
import { MFASetup } from "./components/auth/MFASetup";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/auth/verify-email" element={<EmailVerification />} />
          <Route path="/auth/reset-password" element={<PasswordReset />} />
          <Route path="/auth/mfa-setup" element={<MFASetup />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;