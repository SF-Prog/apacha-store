import { supabase } from '@/lib/supabase';

export async function addProduct(newProduct: ProductItem) {
  const { data, error } = await supabase.from('products').insert([newProduct]);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  };

  return data;
}