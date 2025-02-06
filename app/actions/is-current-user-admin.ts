import { supabase } from '@/lib/supabase/client';

export async function isAdmin(email) {
  const { data, error } = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', email)
    .single();

  // Returns true if user is an admin
  if (!error) return !!data;

  console.error('Error checking admin role:', error);
  return false;
};