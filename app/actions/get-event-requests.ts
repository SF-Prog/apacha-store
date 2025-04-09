
import { supabase } from '@/lib/supabase/client';

export async function getEventRequests() {

  try {
    const { data, error } = await supabase.from('event_requests')
      .select('*');

    if (error) {
      console.error('Error fetching event requests:', error);
      return [];
    };

    return data;
  } catch (error) {
    return error;
  };
}