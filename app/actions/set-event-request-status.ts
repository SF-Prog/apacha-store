import { supabase } from "../lib/supabase/client";

export const setEventRequestStatus = async (id: string, status: string) => {
    try {
      const { data, error } = await supabase.from('event_requests').update({
          status
        }).eq('id', id);
        if (error) throw new Error(error.message ?? "Something went wrong")
          return {success: true, message: "Status updated"};
    } catch (error) {
      return {
        success: false,
        error: error?.message ?? "Something went wrong"
      }
    };
};