import { supabase } from "@/app/lib/supabase/client";


const getImageUrl = (bucketName: string, path: string) => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);

  return data.publicUrl;
};

export default getImageUrl;