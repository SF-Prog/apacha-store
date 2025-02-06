'use server'

import { createClient } from '@/lib/supabase/server';

export async function loginAdmin(email, password) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.message) { throw error };

    await supabase.auth.setSession({ access_token: data.session?.access_token, refresh_token: data.session?.refresh_token });

    return { success: true, message: 'Login successful!'};
  } catch (error) {
    if (typeof error.message !== 'string')
      return { success: false, error: new Error('Something went wrong')};

    return { success: false, error: new Error(error.message)};
  };
}