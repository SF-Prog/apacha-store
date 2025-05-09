import { supabase } from "@/lib/supabase/client";

const defaultErrorMessage = 'Failed to update product category';

export const setProductCategory = async (cat: ProductCategory) => {
  try {
    const { error } = await supabase
      .from('product_category')
      .update({ name: cat.name, priority: cat.priority })
      .eq('id', cat.id);

    if (error) {
      return {
        success: false,
        error: error?.message ?? defaultErrorMessage
      };
    };

    return {
      success: true,
      message: 'Product Category updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message ?? defaultErrorMessage
    }
  }
};