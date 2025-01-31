import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { lazyLoadWithRetry } from '@/utils/lazyLoad'
import { LoadingSpinner } from '@/components/ui/states/LoadingSpinner'

// Lazy load route components
const Landing = lazyLoadWithRetry(() => import('@/pages/Landing'))
const Login = lazyLoadWithRetry(() => import('@/pages/Login'))
const Signup = lazyLoadWithRetry(() => import('@/pages/Signup'))
const Blog = lazyLoadWithRetry(() => import('@/pages/Blog'))
const BlogPost = lazyLoadWithRetry(() => import('@/pages/BlogPost'))
const Dashboard = lazyLoadWithRetry(() => import('@/pages/Dashboard'))
const ClientDashboard = lazyLoadWithRetry(() => import('@/pages/ClientDashboard'))
const Settings = lazyLoadWithRetry(() => import('@/pages/Settings'))

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App