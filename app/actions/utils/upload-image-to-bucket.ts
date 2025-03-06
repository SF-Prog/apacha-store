import { supabase } from '@/app/lib/supabase/client';
import base64ToFile from './base64-to-file';
import deleteImageFromBucket from './delete-image-from-bucket';

interface Payload {
  base64Image: string,
  bucketName: string,
  imageName: string
};

const uploadImageToBucket = async (payload: Payload) => {
  const { base64Image, bucketName, imageName } = payload;
  try {
    const file = base64ToFile(base64Image);

    const { data: imageData } = await supabase.storage.from(bucketName).getPublicUrl(imageName);
    const responseImageCheck = await fetch(imageData.publicUrl);
    const alreadyExists = !!responseImageCheck.ok;

    if (alreadyExists) {
      const response = await deleteImageFromBucket({ bucketName: bucketName, imageNames: [imageName] });
      if (!response.success) return { success: false, message: response.message };
    };

    const { data, error } = await supabase.storage.from(bucketName).upload(
      imageName,
      file,
    );

    if (!data || !!error) return { success: false, message: error.message ?? 'Something went wrong' };

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message ?? 'Something failed while uploading the image to the Bucket' };
  };

};

export default uploadImageToBucket;