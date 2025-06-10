import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveMetaCredentials(appId: string, appSecret: string, accessToken: string) {
  const { data, error } = await supabase
    .from('meta_api_credentials')
    .insert([{ app_id: appId, app_secret: appSecret, access_token: accessToken }]);

  if (error) throw error;
  return data;
}

export async function getMetaCredentials() {
  const { data, error } = await supabase
    .from('meta_api_credentials')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}
