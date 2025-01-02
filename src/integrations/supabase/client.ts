import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'x-application-name': 'fraud-detection-dashboard'
    }
  },
  db: {
    schema: 'public'
  }
});

// Add health check function
export const checkSupabaseHealth = async () => {
  try {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase health check failed:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Supabase health check failed:', error);
    return false;
  }
};

// Add session refresh helper
export const refreshSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (!session) {
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) throw refreshError;
    }
    return session;
  } catch (error) {
    console.error('Failed to refresh session:', error);
    throw error;
  }
};