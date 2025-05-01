import { supabase } from '@/lib/supabase/client';

export async function createWorkshopSubscription(phone: string) {
  try {

    const { error } = await supabase.from('subscriptions').insert({
      phone,
      type: 'workshops'
    });

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