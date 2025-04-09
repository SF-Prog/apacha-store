import { supabase } from "@/lib/supabase/client";

const defaultErrorMessage = 'Failed to create product category';

export const createProductCategory = async (cat: ProductCategory) => {
  try {
    const newProductCat = { 
      name: cat.name,
      priority: cat.priority, 
      created_at: new Date 
    };

    const { error } = await supabase.from('product_category')
      .insert(newProductCat);

    if (error) {
      return {
        success: false,
        error: error?.message ?? defaultErrorMessage
      };
    };

    return {
      success: true,
      message: 'Product Category successfully created'
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message ?? defaultErrorMessage
    }
  }
};