import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://ekkhzqcjpxzzjtzoojry.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVra2h6cWNqcHh6emp0em9vanJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MzY0NTYsImV4cCI6MjA2NTExMjQ1Nn0.gLadeqAZTZmlcHc7VJeCcuwh5aGKT462nDOaTLJr7do'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)