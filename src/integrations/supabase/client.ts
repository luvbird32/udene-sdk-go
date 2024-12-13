import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'udene-web',
    },
  },
});

// Add error handling for failed requests
supabase.handleFailedRequest = async (error: any) => {
  console.error('Supabase request failed:', error);
  if (error.message === 'Load failed') {
    // Attempt to refresh the client
    await supabase.auth.refreshSession();
  }
  return null;
};