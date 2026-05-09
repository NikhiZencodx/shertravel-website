import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://puufrlhhdjsqnbseayvh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dWZybGhoZGpzcW5ic2VheXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzIxNzMsImV4cCI6MjA5MTg0ODE3M30.yByTKkvnlWV5MNAT8Coo2PUKhBOeQWxgtIFdSsd3hbg'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
