import uploadImageToBucket from './utils/upload-image-to-bucket';
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
  const is_published = (data.get('is_published') == 'true') as boolean
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
    const response = await uploadImageToBucket({
      base64Image: image,
      bucketName: 'product-images',
    });

    if (!response.success) throw new Error(response.message);

    // If the iamge was modified on the udpate we need to gather new path:
    const imageDataForUpdate = response.imageNotModified
      ? image
      : response.data?.path;

    const { error } = await supabase
      .from('products')
      .update({
        title: newProduct.title,
        image: imageDataForUpdate,
        price: newProduct.price,
        description: newProduct.description,
        meassures: newProduct.meassures,
        category: newProduct.category,
        qty: newProduct.qty,
        is_published: newProduct.is_published,
        priority: newProduct.priority
      })
      .eq('id', newProduct.id);

    if (error) throw new Error(error.message ?? defaultErrorMessage)

    return {
      success: true,
      message: 'Product updated successfully'
    };
  } catch (error) {
    return error;
  }
};