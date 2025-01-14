import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import Settings from '@/pages/Settings'
import Users from '@/pages/Users'
import ClientSettings from '@/pages/ClientSettings'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Loader2 } from 'lucide-react'

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App