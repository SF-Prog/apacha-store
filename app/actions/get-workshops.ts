import { supabase } from '@/lib/supabase/client';
import getImageUrl from './utils/get-image-url';

export async function getWorkshops() {
  try {
    const { data, error } = await supabase.from('workshops').select('*');

    if (error) {
      throw new Error(error.message);
    };

    const clearData = data.filter((ws) => ws.id);

    const parsedData = clearData.map((workshop) => {
      const url = getImageUrl('workshop-images', workshop.image);
      return { ...workshop, image: url };
    });

    return parsedData;
  } catch (error) {
    return error;
  };
}