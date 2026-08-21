import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { publicEnv } from './lib/publicEnv';

const supabaseUrl = publicEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = publicEnv('VITE_SUPABASE_ANON_KEY');

/** True when real Supabase credentials are present in .env / .env.local */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && process.env.NODE_ENV === 'development') {
  console.warn(
    '[Research Peptides ES] Missing VITE_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL or anon key. ' +
      'Copy .env.example to .env.local and restart for catalog, auth, and checkout.',
  );
}

const url = supabaseUrl || 'http://127.0.0.1:54321';
const key =
  supabaseAnonKey ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

export const supabase: SupabaseClient = createClient(url, key);
