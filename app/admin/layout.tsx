import { AdminProvider } from '@/context/admin-context';
import { supabase } from '@/lib/supabase';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  );
};