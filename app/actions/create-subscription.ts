import { supabase } from '@/lib/supabase/client';
import { subscriptionTypes } from '../lib/constants';

interface CreateSubscriptionProps {
  phone?: string,
  email?: string,
  topic?: string,
  type: string
}

export async function createSubscription({
  phone,
  email,
  topic,
  type
}: CreateSubscriptionProps) {
  try {
    const descriptionForType = type === subscriptionTypes.WORKSHOP 
      ? topic
      : '';
    const { error } = await supabase.from('subscriptions').insert({
      phone,
      email,
      description: descriptionForType,
      type
    });

    if (error) {
      return {
        success: false,
        error: error?.message ?? 'Failed to create subscription'
      };
    };

    return {
      success: true,
      message: 'Subscription successfully created'
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message ?? 'Failed to create subscription'
    }
  }
}