-- Quick check: See what policies exist on the feedback table
-- Run this in Supabase SQL Editor

SELECT 
  policyname,
  cmd as operation,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'feedback';

-- Also check if RLS is enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename = 'feedback';

