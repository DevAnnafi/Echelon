import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://frecdfskhmrdigwvcpnx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZWNkZnNraG1yZGlnd3ZjcG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMDQ5OTUsImV4cCI6MjA4MTY4MDk5NX0.loLDeiMT6zyEa9JFmVF_RH7K8vBqnU8Wy9Q14GtGIRY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
