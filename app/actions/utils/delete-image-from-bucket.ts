import { getStorageClient } from "@/app/lib/supabase/client";

interface Payload {
  bucketName: string,
  imageNames: string[]
};

const deleteImageFromBucket = async (payload: Payload) => {
  const { bucketName, imageNames } = payload;
  try {
    const storage = await getStorageClient();
    const { error } = await storage.from(bucketName).remove([...imageNames]);
    if (error) return { success: false, message: error.message ?? 'Something went wrong' };

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message ?? 'Something failed while deleting the image to the Bucket' };
  };

};

export default deleteImageFromBucket;