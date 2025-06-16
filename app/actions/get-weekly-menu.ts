import { getLastImagePublicUrl } from './utils/get-last-image-from-bucket-folder';

export async function getWeeklyMenu() {
  try {
    const url   = await getLastImagePublicUrl('weekly-menu', 'images');
    return {
      success: true,
      image: url
    };
  } catch (error) {
    return error;
  };
}