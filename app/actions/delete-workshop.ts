import { supabase } from "@/lib/supabase/client";
import deleteImageFromBucket from "./utils/delete-image-from-bucket";

const defaultErrorMessage = 'Failed to delete workshop';

export const deleteWorkshop = async (workshop: Workshop) => {
  try {
    await deleteImageFromBucket({ bucketName: 'workshop-images', imageNames: [workshop.image]})

    const { error } = await supabase
      .from('workshops')
      .delete()
      .eq('id', workshop.id);

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