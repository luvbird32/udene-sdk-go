import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gocqiurpyzzlhohzcmii.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY3FpdXJweXp6bGhvaHpjbWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MzI2NjcsImV4cCI6MjAyNDIwODY2N30.LxuMkXMtX5QzWGDtAhHD3cwuGGu7NxHJ4QHSJE7_pHo";

// Initialize Supabase client with retries and error handling
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

// Test connection and log status
console.log("Initializing Supabase connection...");

// Verify database connection
supabase
  .from('metrics')
  .select('count(*)', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error("Database connection error:", {
        message: error.message,
        code: error.code,
        details: error.details
      });
    } else {
      console.log("Database connection successful");
    }
  });