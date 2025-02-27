import { supabase } from '@/lib/supabase/client';
import uploadImageToBucket from './utils/upload-image-to-bucket';

export async function createProduct(data: FormData) {
  const title = data.get('title') as string
  const description = data.get('description') as string
  const price = parseFloat(data.get('price') as string)
  const image = data.get('image') as string
  const meassures = data.get('meassures') as string
  const category = data.get('category') as string
  const qty = parseFloat(data.get('qty') as string)
  const is_published = (data.get('is_published') == 'true')   
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
    const { data: user, error: errorUser} = await supabase.auth.getSession();

    const response = await uploadImageToBucket({
      base64Image: image,
      bucketName: 'product-images',
      imageName: title.replace(' ', '-')
    });

    if (!response.success) return {
      success: false,
      error: response?.message ?? 'Failed to create product'
    };

    const { error } = await supabase.from('products')
      .insert({ ...newProduct, image: response.data.path });

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