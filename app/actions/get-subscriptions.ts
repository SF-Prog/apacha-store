import { supabase } from '@/lib/supabase/client';

export async function getSubscriptions() {
  try {
    const { data, error } = await supabase.from('subscriptions').select('*');

    if (error) {
      throw new Error(error.message);
    };

    return data;
  } catch (error) {
    return error;
  };
}