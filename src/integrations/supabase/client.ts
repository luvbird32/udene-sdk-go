import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

console.log('Initializing Supabase client with URL:', supabaseUrl);

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
  
  // Check if it's a connection error
  if (error.message?.includes('connection') || error.message === 'Failed to fetch') {
    console.error('Database connection error - please check if Supabase is running');
  }
  
  if (error.message === 'Load failed') {
    // Attempt to refresh the session
    const { error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) {
      console.error('Failed to refresh session:', refreshError);
    }
  }
  return null;
};

// Add a health check function
export const checkDatabaseConnection = async () => {
  try {
    console.log('Checking database connection...');
    const { data, error } = await supabase
      .from('metrics')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Database connection check failed:', error);
      return false;
    }

    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Failed to check database connection:', error);
    return false;
  }
};