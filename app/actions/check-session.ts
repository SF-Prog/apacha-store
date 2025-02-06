'use server'
import { createClient } from '@/lib/supabase/server';

export async function checkSession() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: errorUser } = await supabase.auth.getUser();

    if (errorUser ) {
      throw new Error(errorUser.message ??  'Something went wrong');
    };

    if (!user) {
      throw new Error('Session not found.')
    };

    return { success: true, message: 'Valid session'};
  } catch (error) {
    return { success: false, error };
  };
}