import { AdminProvider } from '@/context/admin-context';

interface AdminLayoutProps {
  children: React.ReactNode,
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  );
};