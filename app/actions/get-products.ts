import { supabase } from '@/lib/supabase/client';

export async function getProducts() {
  try {
    const { data, error } = await supabase.rpc('get_products_grouped_by_category');

    if (error) {
      throw new Error(error.message);
    };

    // For some reason supabase is returning empty products in case there is no
    // products linked to that category:
    const clearData = data.filter((cat) => {
      const hasSomeProduct = cat.products.some((p) => p.id);
      return hasSomeProduct;
    });

    return clearData;
  } catch (error) {
    return error;
  };
}