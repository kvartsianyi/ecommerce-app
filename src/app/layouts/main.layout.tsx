import { Outlet } from '@tanstack/react-router';

import { Header, Footer } from '@/shared/layout';
import { DialogsProvider } from '../providers/dialogs';

export function MainLayout() {
  return (
    <div className="min-h-screen px-8 py-4 container mx-auto">
      <Header />

      <main className="flex-1 py-6 sm:py-8">{/* <Outlet /> */}</main>

      <Footer />

      <DialogsProvider />
    </div>
  );
}
