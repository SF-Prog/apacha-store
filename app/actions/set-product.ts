import { supabase } from "@/lib/supabase/client";

const defaultErrorMessage = 'Failed to update product';

export const setProduct = async (data: FormData) => {
  const id = data.get('id') as string
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
    id,
    title,
    description,
    price,
    image,
    meassures,
    category,
    qty,
    is_published,
    priority
  };

  try {
    const { error } = await supabase
      .from('products')
      .update({
        title: newProduct.title,
        image: newProduct.image,
        price: newProduct.price,
        description: newProduct.description,
        meassures: newProduct.meassures,
        category: newProduct.category,
        qty: newProduct.qty,
        is_published: newProduct.is_published,
        priority: newProduct.priority
       })
      .eq('id', newProduct.id);

    if (error) {
      return {
        success: false,
        error: error?.message ?? defaultErrorMessage
      };
    };

    return {
      success: true,
      message: 'Product updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message ?? defaultErrorMessage
    }
  }
};