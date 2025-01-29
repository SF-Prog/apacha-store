'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers';

export async function createProduct(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  const { data: { session }, error: authError } = await supabase.auth.getSession()
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const image = formData.get('image') as string
  const meassures = formData.get('meassures') as string

  // TODO: Replace this with your actual database logic
  // This is just a mock implementation
  const newProduct: ProductItem = {
    id: Date.now().toString(),
    title,
    description,
    price,
    image,
    meassures,
    category: 'quesos y untables'
  }

  try {

    const { data, error } = await supabase.from('products').insert({...newProduct,
      user_id: session.user.id
    });

    // TODO: Add your database logic here
    // For example: await db.products.create(newProduct)
    console.log('Product created:', newProduct)

    // Revalidate the products page to show the new product
    revalidatePath('/admin/products')

    if (error) {
      console.error('Error Adding new product:', error);
      return { success: false, error: 'Failed to create product' };
    };

    return { success: true, message: 'Product successfully created' };
  } catch (error) {
    console.error('Failed to create product:', error)
    return { success: false, error: 'Failed to create product' }
  }
}