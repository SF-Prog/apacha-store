// import base64ToFile from './utils/base64-to-file';
import base64ToFile from './utils/base64-to-file';
import { getExtensionFromBase64 } from './utils/get-base64-file-extension';

interface SetWeeklyMenuPayload {
  image: string
}

// export const setWeeklyMenu = async (payload: SetWeeklyMenuPayload) => {
//   const image = payload.image as string
//   const storage = await getStorageClient();

//   try {
//     const ext = getExtensionFromBase64(image);
//     const name = `images/${Math.random().toString(36).substring(2, 15)}.${ext}`;
//     const file = base64ToFile(image);

//     const response = await storage.from('weekly-menu').upload(
//       name,
//       file,
//     );

//     if (!response.success) throw new Error('Something went wrong!')

//     return {
//       success: true,
//       message: 'Product updated successfully'
//     };
//   } catch (error) {
//     return error;
//   }
// };


import { getStorageClient, supabase } from "@/lib/supabase/client";

export const setWeeklyMenu = async (payload: SetWeeklyMenuPayload) => {


  const image = payload.image as string
  const storage = await getStorageClient();

  try {
    const ext = getExtensionFromBase64(image);

    // Prefix filename with timestamp
    const timestamp = Date.now()
    const filePath = `images/${timestamp}.${ext}`;
    // const name = `images/${Math.random().toString(36).substring(2, 15)}.${ext}`;
    const file = base64ToFile(image);

    const { data, error } = await storage.from('weekly-menu').upload(
      filePath,
      file,
      {
        cacheControl: '3600',
        upsert: false
      }
    );

    if (error) {
      console.error('Upload error:', error.message)
      return null
    }

    console.log('File uploaded:', data.path)
    return data.path
  } catch (e) {
    return e;
  }
}