import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jbbfljgvjpkzqmoylyzc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  db: {
    schema: 'public'
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Configure global error handler for WebSocket connection issues
supabase.realtime.onError((error) => {
  console.error('Realtime subscription error:', error);
});

// Configure automatic reconnection
supabase.realtime.setAuth(supabaseAnonKey);