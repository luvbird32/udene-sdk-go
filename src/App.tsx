import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Dashboard from '@/pages/Dashboard'
import Settings from '@/pages/Settings'
import Users from '@/pages/Users'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import ClientSettings from '@/pages/ClientSettings'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './components/auth/AuthProvider'
import { LoadingSpinner } from './components/ui/states/LoadingSpinner'
import { ProjectProvider } from './contexts/ProjectContext'

// Separate component to use auth hook after AuthProvider is mounted
const AppRoutes = () => {
  const { user, loading } = useAuth();
  
  console.log("AppRoutes rendering with:", { user, loading });

  // Show loading state while checking authentication
  if (loading) {
    console.log("AppRoutes showing loading state");
    return <LoadingSpinner />;
  }

  console.log("AppRoutes rendering routes");
  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to="/dashboard" replace /> 
          ) : (
            <Landing />
          )
        } 
      />
      <Route 
        path="/login" 
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        } 
      />
      <Route 
        path="/signup" 
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Signup />
          )
        } 
      />
      
      {/* Blog routes */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <ProjectProvider>
              <Dashboard />
            </ProjectProvider>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <ProjectProvider>
              <Settings />
            </ProjectProvider>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/client-settings" 
        element={
          <ProtectedRoute>
            <ProjectProvider>
              <ClientSettings />
            </ProjectProvider>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all redirect */}
      <Route 
        path="*" 
        element={
          <Navigate to={user ? "/dashboard" : "/"} replace />
        } 
      />
    </Routes>
  );
};

function App() {
  console.log("App component rendering");
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
