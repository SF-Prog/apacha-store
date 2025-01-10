import { supabase } from '@/lib/supabase';

export async function isAdmin(userId) {
  const { data, error } = await supabase
    .from('admin_users')
    .select('uid')
    .eq('uid', userId)
    .single();

  // Returns true if user is an admin
  if (!error) return !!data;

  console.error('Error checking admin role:', error);
  return false;
};