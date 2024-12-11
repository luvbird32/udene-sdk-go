import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

const supabaseUrl = 'https://jbbfljgvjpkzqmoylyzc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiYmZsamd2anBrenFtb3lseXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NDUwNjEsImV4cCI6MjA0OTAyMTA2MX0.ZP74tENMUR8qAYi63el1xYUyzqAewO_b5X0iQHj_pnk';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);