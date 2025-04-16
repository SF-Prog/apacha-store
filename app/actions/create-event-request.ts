import { supabase } from '@/lib/supabase/client';

export async function createEventRequest(formData: FormData) {
  try {
    const eventRequest: Omit<EventRequest, 'status' | 'created_at'> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      event_type: formData.get('eventType') as string,
      message: formData.get('message') as string,
      quantity: formData.get('quantity') as string,
      contact_preference: formData.get('contactPreference') as 'email' | 'whatsapp' | 'call',
      newsletter: formData.get('newsletter') === 'on' || formData.get('newsletter') === 'true',
    }

    const newEventRequest: EventRequest = {
      ...eventRequest,
      status: 'pending',
    }

    const { data, error } = await supabase
      .from('event_requests')
      .insert(newEventRequest)

    if (error) {
      return {
        success: false,
        message: 'Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.',
        errors: {
          general: 'Error de base de datos: ' + error.message
        }
      }
    };

    return {
      success: true,
      message: 'Tu solicitud ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto.',
      data
    }
  } catch (error) {
    return {
      success: false,
      message: 'Ocurrió un error inesperado. Por favor intenta nuevamente.',
    }
  }
}