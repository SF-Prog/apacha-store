
import { supabase } from '@/lib/supabase/client';

export async function getProductCategories() {

  try {
    const { data, error } = await supabase.from('product_category')
      .select('*');

    if (error) {
      console.error('Error fetching product categories:', error);
      return [];
    };

    return data;
  } catch (error) {
    return error;
  };
}