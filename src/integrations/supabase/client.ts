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
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'fraud-detection-dashboard'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Add health check function
export const checkSupabaseHealth = async () => {
  try {
    const { data, error } = await supabase.from('health_check').select('count').single();
    if (error) throw error;
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
      await supabase.auth.refreshSession();
    }
    return session;
  } catch (error) {
    console.error('Failed to refresh session:', error);
    throw error;
  }
};