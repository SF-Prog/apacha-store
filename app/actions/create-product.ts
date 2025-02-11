'use server'

import { supabase } from '@/lib/supabase/client';

export async function createProduct(data: FormData) {
  const title = data.get('title') as string
  const description = data.get('description') as string
  const price = parseFloat(data.get('price') as string)
  const image = data.get('image') as string
  const meassures = data.get('meassures') as string
  const category = data.get('category') as string
  const qty = parseFloat(data.get('qty') as string)
  const is_published = !!data.get('is_published') as boolean
  const priority = parseFloat(data.get('priority') as string)

  const newProduct: ProductItem = {
    id: Date.now().toString(),
    title,
    description,
    price,
    image,
    meassures,
    category,
    qty,
    priority,
    is_published,
  };

  try {
    const { error } = await supabase.from('products').insert(newProduct);

    if (error) {
      return {
        success: false,
        error: error?.message ?? 'Failed to create product'
      };
    };

    return {
      success: true,
      message: 'Product successfully created'
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message ?? 'Failed to create product'
    }
  }
}