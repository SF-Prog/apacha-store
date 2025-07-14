import base64ToFile from './utils/base64-to-file';
import { getExtensionFromBase64 } from './utils/get-base64-file-extension';
import { getStorageClient } from "@/lib/supabase/client";

interface SetWeeklyMenuPayload {
  image: string
}


export const setWeeklyMenu = async (payload: SetWeeklyMenuPayload) => {


  const image = payload.image as string
  const storage = await getStorageClient();

  try {
    const ext = getExtensionFromBase64(image);

    const timestamp = Date.now()
    const filePath = `images/${timestamp}.${ext}`;
    const file = base64ToFile(image);

    const { data, error } = await storage.from('weekly-menu').upload(
      filePath,
      file,
      {
        cacheControl: '3600',
        upsert: false
      }
    );
console.log('e', error, data)
    if (error) {
      return null
    }

    return { success: true, path: data.path }
  } catch (e) {
    console.log('e', e);
    return e;
  }
}