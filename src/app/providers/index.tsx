import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { ThemeProvider } from './theme';
import { QueryProvider } from './query';
import { router } from './router';

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <QueryProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <TanStackRouterDevtools router={router} />
          {children}
        </ThemeProvider>
      </QueryProvider>
    </>
  );
}
