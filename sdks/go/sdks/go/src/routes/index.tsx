import { adminRoutes } from './adminRoutes';
import { authRoutes } from './authRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { publicRoutes } from './publicRoutes';

export const createRoutes = (user: any, loading: boolean) => {
  const routeProps = { user, loading };
  
  return [
    ...publicRoutes.map(route => ({
      ...route,
      element: typeof route.element === 'function' ? route.element(routeProps) : route.element
    })),
    ...authRoutes.map(route => ({
      ...route,
      element: typeof route.element === 'function' ? route.element(routeProps) : route.element
    })),
    ...dashboardRoutes,
    ...adminRoutes
  ];
};