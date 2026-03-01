import { createClient } from "@supabase/supabase-js";

/**
 * Supabase public credentials
 * Safe to use in client and server components (RLS enforced)
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase env vars missing. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
  );
}

/**
 * Primary database client for Echelon
 */
export const db = createClient(supabaseUrl, supabaseAnonKey);
