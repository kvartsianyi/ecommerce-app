import { RouterProvider } from '@tanstack/react-router';

import { useAuth } from '@/features/auth/api/hooks/useAuth';
import { router } from './router';

export function RouterWithContextProvider() {
  const { isAuthenticated } = useAuth();
  return (
    <RouterProvider router={router} context={{ auth: { isAuthenticated } }} />
  );
}
