import { supabase } from "@/lib/supabase/client";

const defaultErrorMessage = 'Failed to delete product';

export const deleteProduct = async (product: ProductItem) => {
  try {

    const { error: errorImage } = await supabase
      .storage
      .from('product-images')
      .remove([product.image]);

    if (errorImage ) {
      return {
        success: false,
        error: errorImage?.message ?? defaultErrorMessage
      };
    };
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