import { createRootRouteWithContext } from '@tanstack/react-router';

import { MainLayout } from '@/app/layouts';
import type { RouterContext } from '@/app/providers/router';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: MainLayout,
});
