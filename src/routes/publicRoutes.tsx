import { Navigate } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';

export const publicRoutes = [
  {
    path: '/',
    element: (props: any) => props.user ? <Navigate to="/dashboard" replace /> : <Landing />
  },
  {
    path: '/blog',
    element: <Blog />
  },
  {
    path: '/blog/:slug',
    element: <BlogPost />
  },
  {
    path: '*',
    element: (props: any) => <Navigate to={props.user ? "/dashboard" : "/"} replace />
  }
];