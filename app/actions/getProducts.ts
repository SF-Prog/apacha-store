import { supabase } from '@/lib/supabase';

export async function getProducts() {
  const { data, error } = await supabase.rpc('get_products_grouped_by_category');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  };

  return data;
}