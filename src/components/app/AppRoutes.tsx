import { Routes, Route } from 'react-router-dom'
import { useAuth } from '@/components/auth/AuthProvider'
import { LoadingSpinner } from '@/components/ui/states/LoadingSpinner'
import { createRoutes } from '@/routes'

export const AppRoutes = () => {
  const { user, loading } = useAuth()
  
  console.log("AppRoutes rendering with:", { user, loading })

  if (loading) {
    console.log("AppRoutes showing loading state")
    return <LoadingSpinner />
  }

  console.log("AppRoutes rendering routes")
  const routes = createRoutes(user, loading)

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={route.path || index} {...route} />
      ))}
    </Routes>
  )
}