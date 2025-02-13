import { supabase } from '@/lib/supabase/client';

export async function getWorkshops() {
  try {
    const { data, error } = await supabase.from('workshops').select('*');

    if (error) {
      throw new Error(error.message);
    };

    const clearData = data.filter((ws) => ws.id);

    return clearData;
  } catch (error) {
    return error;
  };
}