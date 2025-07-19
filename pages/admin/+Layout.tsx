import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Helmet } from '@vuer-ai/react-helmet-async';
import { ThemeProvider } from '@/components/theme-provider.tsx';
import type { PropsWithChildren } from 'react';

export default function AdminLayout({
  children,
}: PropsWithChildren<unknown>) {
  const mockUser = {
    name: 'Admin',
    email: 'admin@example.com',
    avatarUrl: 'https://github.com/vercel.png',
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name='description' content='Admin dashboard' />
        <meta name={mockUser.name} content='v0.dev' />
        <meta name={mockUser.email} content='admin@example.com' />
      </Helmet>
      <ThemeProvider>
        <SidebarProvider>
          <AppSidebar user={mockUser} isAdmin={true} />
          <main className='flex-1 overflow-auto p-4 md:p-6'>{children}</main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}
