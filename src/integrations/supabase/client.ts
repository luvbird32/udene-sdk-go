import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

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
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage,
    storageKey: 'supabase.auth.token',
  },
  global: {
    headers: {
      'X-Client-Info': 'udene-web',
    },
  },
  db: {
    schema: 'public',
  },
});

// Create a wrapper function to handle failed requests
export const handleSupabaseError = async (error: any) => {
  console.error('Supabase request failed:', error);
  
  // Check if it's a connection error
  if (error.message?.includes('connection') || error.message === 'Failed to fetch') {
    console.error('Database connection error - attempting to refresh session');
    
    try {
      // Try to refresh the session
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        console.error('Failed to refresh session:', refreshError);
        throw refreshError;
      }
      return session;
    } catch (refreshError) {
      console.error('Session refresh failed:', refreshError);
      throw refreshError;
    }
  }
  
  throw error;
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