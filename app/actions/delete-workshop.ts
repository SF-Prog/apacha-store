import { supabase } from "@/lib/supabase/client";

const defaultErrorMessage = 'Failed to delete workshop';

export const deleteWorkshop = async (id: string) => {
  try {
    const { error } = await supabase
      .from('workshops')
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
      message: 'Workshop deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message ?? defaultErrorMessage
    }
  }
};