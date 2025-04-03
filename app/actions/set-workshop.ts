import { supabase } from '@/lib/supabase/client';
import uploadImageToBucket from './utils/upload-image-to-bucket';

export async function setWorkshop(data: FormData) {
  const id = data.get('id') as string
  const title = data.get('title') as string
  const description = data.get('description') as string
  const price = parseFloat(data.get('price') as string)
  const image = data.get('image') as string
  const location = data.get('location') as string
  // const date = new Date(data.get('date') as string)
  const date = data.get('date') as string
  const initial_time = data.get('initial_time') as string
  const finalization_time = data.get('finalization_time') as string
  const is_published = !!data.get('is_published') as boolean
  const priority = parseFloat(data.get('priority') as string)
  const capacity = parseFloat(data.get('capacity') as string)
  const author = data.get('author') as string
  const social_media_link = data.get('social_media_link') as string

  const newWorkshop: Workshop = {
    id,
    title,
    description,
    location,
    date,
    initial_time,
    finalization_time,
    image,
    is_published,
    price,
    priority,
    capacity,
    author,
    social_media_link
  };

  try {
    const response = await uploadImageToBucket({
      base64Image: image,
      bucketName: 'workshop-images',
    });

    if (!response.success) return {
      success: false,
      error: response?.message ?? 'Failed to update workshop'
    };

    const updatedWorkshop: Partial<Workshop> = {
      title: newWorkshop.title,
      description: newWorkshop.description,
      location: newWorkshop.location,
      date: newWorkshop.date,
      initial_time: newWorkshop.initial_time,
      finalization_time: newWorkshop.finalization_time,
      is_published: newWorkshop.is_published,
      price: newWorkshop.price,
      priority: newWorkshop.priority,
      author: newWorkshop.author,
      capacity: newWorkshop.capacity,
      social_media_link: newWorkshop.social_media_link,
    };

    if (response.imageNotModified) {
      updatedWorkshop.image = response.data?.path;
    };

    const { error } = await supabase.from('workshops')
      .update(updatedWorkshop)
      .eq('id', newWorkshop.id);;

    if (error) {
      return {
        success: false,
        error: error?.message ?? 'Failed to update workshop'
      };
    };

    return {
      success: true,
      message: 'Workshop successfully updated'
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message ?? 'Failed to update workshop'
    }
  }
}