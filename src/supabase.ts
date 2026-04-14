import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pamcbwpgjuiujekugnbd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbWNid3BnanVpdWpla3VnbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNzQ4NTAsImV4cCI6MjA5MTc1MDg1MH0.0uURTAIXrzo003L5RlMEXV6Lvg0tdIc1Y3x0GNtXJIE'

export const supabase = createClient(supabaseUrl, supabaseKey)
