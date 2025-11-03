import React from 'react';

import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/lib/router';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
