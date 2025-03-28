import { Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';

export const authRoutes = [
  {
    path: '/login',
    element: (props: any) => props.user ? <Navigate to="/dashboard" replace /> : <Login />
  },
  {
    path: '/signup',
    element: (props: any) => props.user ? <Navigate to="/dashboard" replace /> : <Signup />
  }
];