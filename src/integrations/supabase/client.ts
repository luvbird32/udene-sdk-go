import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gocqiurpyzzlhohzcmii.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY3FpdXJweXp6bGhvaHpjbWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MzI2NjcsImV4cCI6MjAyNDIwODY2N30.LxuMkXMtX5QzWGDtAhHD3cwuGGu7NxHJ4QHSJE7_pHo";

if (!supabaseKey) {
  console.error('Supabase anon key is missing!');
}

// Initialize Supabase client with enhanced error handling
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`
    },
  },
});

// Test connection and log status
console.log("Testing Supabase connection...");

// Verify database connection
supabase
  .from('metrics')
  .select('count(*)', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error("Database connection error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
    } else {
      console.log("Database connection successful. Row count:", count);
    }
  });

// Test authentication status
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error("Auth status check failed:", error);
  } else {
    console.log("Auth status check successful:", {
      hasSession: !!data.session,
      user: data.session?.user?.email || 'No user'
    });
  }
});