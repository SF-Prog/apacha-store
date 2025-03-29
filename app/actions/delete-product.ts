import { supabase } from "@/lib/supabase/client";
import deleteImageFromBucket from "./utils/delete-image-from-bucket";

const defaultErrorMessage = 'Failed to delete product';

export const deleteProduct = async (product: ProductItem) => {
  try {
    await deleteImageFromBucket({
      bucketName: 'product-images',
      imageNames: [product.image]
    });

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id);

    if (error ) {
      return {
        success: false,
        error: error?.message ?? defaultErrorMessage
      };
    };

    return {
      success: true,
      message: 'Product Category deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message ?? defaultErrorMessage
    }
  }
};