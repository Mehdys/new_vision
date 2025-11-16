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

// Create and export the Supabase client
// Use empty strings as fallback to prevent build errors, but it won't work without proper keys
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

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

