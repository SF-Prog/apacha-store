'use server'

import { supabase } from '@/lib/supabase/client';

export async function createProduct(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const image = formData.get('image') as string
  const meassures = formData.get('meassures') as string
  const category = formData.get('category') as string
  const qty = parseFloat(formData.get('qty') as string)

  const newProduct: ProductItem = {
    id: Date.now().toString(),
    title,
    description,
    price,
    image,
    meassures,
    category,
    qty
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