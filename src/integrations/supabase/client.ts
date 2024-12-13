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

// Create a wrapper function to handle failed requests
export const handleSupabaseError = async (error: any) => {
  console.error('Supabase request failed:', error);
  if (error.message === 'Load failed') {
    // Attempt to refresh the session
    const { error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) {
      console.error('Failed to refresh session:', refreshError);
    }
  }
  return null;
};