import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jbbfljgvjpkzqmoylyzc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiYmZsamd2anBrenFtb3lseXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NDUwNjEsImV4cCI6MjA0OTAyMTA2MX0.ZP74tENMUR8qAYi63el1xYUyzqAewO_b5X0iQHj_pnk';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: localStorage,
    storageKey: 'supabase.auth.token',
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Add error handling for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event);
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.id);
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
    // Clear any stored tokens
    localStorage.removeItem('supabase.auth.token');
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed');
  }
});

// Add health check function
export const checkSupabaseHealth = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Supabase health check failed:', error);
      throw error;
    }
    return !!user;
  } catch (error) {
    console.error('Supabase health check failed:', error);
    return false;
  }
};