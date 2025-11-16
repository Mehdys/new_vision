/**
 * Supabase Client Configuration
 * 
 * This file creates and exports a Supabase client instance
 * that can be used throughout your application.
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase environment variables are not set. ' +
    'Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file'
  );
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-side Supabase client (for API routes and server components)
 * Uses service role key for admin operations (keep this secret!)
 */
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase server environment variables are not set');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

