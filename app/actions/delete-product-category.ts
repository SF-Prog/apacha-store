import { supabase } from "@/lib/supabase/client";

const defaultErrorMessage = 'Failed to delete product category';

export const deleteProductCategory = async (id: string) => {
  try {
    const { error } = await supabase
      .from('product_category')
      .delete()
      .eq('id', id);

    if (error) {
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