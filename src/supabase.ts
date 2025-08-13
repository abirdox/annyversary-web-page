import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://tlapmuaszjrzkzccrxkg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYXBtdWFzempyemt6Y2NyeGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MzQzNDgsImV4cCI6MjA3MDUxMDM0OH0.sYI4_iAZ9DP4ZUl6Wrmp7QrnMi57LnaxP3UlQNU9PNM'

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
