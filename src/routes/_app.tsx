import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Layout } from '@/app/layout';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
