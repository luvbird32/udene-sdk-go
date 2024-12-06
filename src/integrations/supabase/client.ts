import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gocqiurpyzzlhohzcmii.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY3FpdXJweXp6bGhvaHpjbWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MzI2NjcsImV4cCI6MjAyNDIwODY2N30.LxuMkXMtX5QzWGDtAhHD3cwuGGu7NxHJ4QHSJE7_pHo";

// Add detailed logging for debugging
console.log("Initializing Supabase client...");
console.log("URL:", supabaseUrl);

// Create and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection and log detailed results
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error("Supabase connection error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      name: error.name
    });
  } else {
    console.log("Supabase connection successful");
    console.log("Session data:", {
      hasSession: !!data.session,
      expiresAt: data.session?.expires_at
    });
  }
});

// Test a simple query to verify database access
supabase
  .from('metrics')
  .select('count(*)', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error("Database access error:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        details: error.details
      });
    } else {
      console.log("Database access successful, row count:", count);
    }
  });