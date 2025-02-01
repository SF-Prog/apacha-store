'use server'

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function loginAdmin(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.message) { throw error };

    const cookiesData = await cookies();

    cookiesData.set({
      name: 'supabase-auth',
      value: data.session?.access_token ?? '',
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/admin",
      maxAge: 60 * 60 * 24 * 1,
    });

    cookiesData.set({
      name: 'supabase-refresh-token',
      value: data.session?.refresh_token ?? '',
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/admin",
      maxAge: 60 * 60 * 24 * 1,
    });

    // await supabase.setSession({ session:  })

    return { success: true, message: 'Login successful!'};
  } catch (error) {
    if (typeof error.message !== 'string') return new Error('Something went wrong');
    return new Error(error.message);
  };
} 