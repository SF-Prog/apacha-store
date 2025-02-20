import { supabase } from "@/app/lib/supabase/client";
import base64ToFile from "./base64-to-file";

interface Payload {
  base64Image: string,
  bucketName: string,
  imageName: string
};

const uploadImageToBucket = async (payload: Payload) => {
  const { base64Image, bucketName, imageName } = payload;
  try {
    const file = base64ToFile(base64Image);

    const { data, error } = await supabase.storage.from(bucketName).upload(
      imageName,
      file
    );

    if (!data || !!error) return { success: false, message: error.message ?? 'Something went wrong' };

    return { success: true, data};
  } catch (error) {
    return { success: false, message: error.message ?? 'Something failed while uploading the image' };
  };

};

export default uploadImageToBucket;