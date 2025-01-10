import { supabase } from '@/lib/supabase';

export async function loginAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Sign-in error:', error);
    return null;
  };

  return data;
}