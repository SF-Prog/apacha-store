'use server'

import { createClient } from '@/lib/supabase/server';

export async function createWorkshop(data: FormData) {
  const supabase = await createClient();
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
    id: undefined,
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
    const { error } = await supabase.from('workshops').insert(newWorkshop);

    if (error) {
      return {
        success: false,
        error: error?.message ?? 'Failed to create workshop'
      };
    };

    return {
      success: true,
      message: 'Workshop successfully created'
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message ?? 'Failed to create workshop'
    }
  }
}