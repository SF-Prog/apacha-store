const { StorageClient } = require('@supabase/storage-js')
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = await createClient(supabaseUrl, supabaseAnonKey);

const getStorageClient = async () => {
  const { data } = await supabase.auth.getSession();
  const url = `${supabaseUrl}/storage/v1`;
  return new StorageClient(url, {
    authorization: `Bearer ${data.session.access_token}`,
  });
};

export { supabase, getStorageClient };