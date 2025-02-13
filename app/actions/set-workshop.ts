'use server'

import { supabase } from '@/lib/supabase/client';

export async function setWorkshop(data: FormData) {
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

  const newWorkshop: Workshop = {
    id: 'placeholder',
    title,
    description,
    location,
    date,
    initial_time,
    finalization_time,
    image,
    is_published,
    price,
    priority
  };

  try {
    const { error } = await supabase.from('workshops').update({
      title: newWorkshop.title,
      description: newWorkshop.description,
      location: newWorkshop.location,
      date: newWorkshop.date,
      initial_time: newWorkshop.initial_time,
      finalization_time: newWorkshop.finalization_time,
      image: newWorkshop.image,
      is_published: newWorkshop.is_published,
      price: newWorkshop.price,
      priority: newWorkshop.priority,
    });

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