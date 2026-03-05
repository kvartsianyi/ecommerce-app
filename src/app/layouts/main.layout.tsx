import { Outlet } from '@tanstack/react-router';

import { Header, Footer } from '@/shared/layout';
import { DialogsProvider } from '../providers/dialogs';

export function MainLayout() {
  return (
    <div className="min-h-screen">
      <Header />

      <Outlet />

      <DialogsProvider />

      <Footer />
    </div>
  );
}
