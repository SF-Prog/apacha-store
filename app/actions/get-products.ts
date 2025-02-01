import { supabase } from '@/lib/supabase';

export async function getProducts() {
  try {
    const { data, error } = await supabase.rpc('get_products_grouped_by_category');

    if (error) {
      throw new Error(error.message);
    };

    return data;
  } catch (error) {
    return error;
  };
}