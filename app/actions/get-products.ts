import getImageUrl from './utils/get-image-url';
import { supabase } from '@/lib/supabase/client';

export async function getProducts() {
  try {
    const { data, error } = await supabase.rpc('get_products_by_category');

    if (error) {
      throw new Error(error.message);
    };

    // For some reason supabase is returning empty products in case there is no
    // products linked to that category:
    const clearData = data.filter((cat) => {
      const hasSomeProduct = cat.products.some((p) => p.id);
      return hasSomeProduct;
    });

    const parsedData = clearData.map((cat) => {
      const productWithImages = cat.products?.map((p) => {
        const url = getImageUrl('product-images', p.image);
        return { ...p, image: url };
      });
      return { ...cat, products: productWithImages };
    });

    return parsedData;
  } catch (error) {
    return error;
  };
}