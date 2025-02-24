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

    const { data: existe, error: e } = await supabase
    .storage
    .from('product-images')
    .list('/');

    const { data: imageData } = await supabase.storage.from(bucketName).getPublicUrl(imageName);

    const alreadyExists = !!imageData?.publicUrl;

    if (alreadyExists) {
      await deleteImageFromBucket({ bucketName: 'product-images', imageNames: [`product-images/${imageName}.png`] });
    };

    const { data, error } = await supabase.storage.from(bucketName).upload(
      imageName,
      file,
    );

    if (!data || !!error) return { success: false, message: error.message ?? 'Something went wrong' };

    return { success: true, data};
  } catch (error) {
    return { success: false, message: error.message ?? 'Something failed while uploading the image to the Bucket' };
  };

};

export default uploadImageToBucket;