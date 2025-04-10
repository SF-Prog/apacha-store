import { getStorageClient } from '@/app/lib/supabase/client';
import base64ToFile from './base64-to-file';
import { getExtensionFromBase64 } from './get-base64-file-extension';
import { isBase64Image } from './is-base-64';
import deleteImageFromBucket from './delete-image-from-bucket';

interface Payload {
  base64Image: string,
  bucketName: string,
  preExistingImage?: string
};

const uploadImageToBucket = async (payload: Payload) => {
  const { base64Image, bucketName } = payload;
  const storage = await getStorageClient();

  const isNew = isBase64Image(base64Image);
  try {
    if (!isNew) {
      // const response = await deleteImageFromBucket({ bucketName: bucketName, imageNames: [name] });
      // if (!response.success) return { success: false, message: response.message };
      return { success: true, imageNotModified: true };
    };
    const ext = getExtensionFromBase64(base64Image);
    const name = `${Math.random().toString(36).substring(2, 15)}.${ext}`;
    const file = base64ToFile(base64Image);


    const { data, error } = await storage.from(bucketName).upload(
      name,
      file,
    );

    if (!data || !!error) return { success: false, message: error.message ?? 'Something went wrong' };

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message ?? 'Something failed while uploading the image to the Bucket' };
  };

};

export default uploadImageToBucket;