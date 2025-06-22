import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ttmsznctxducoecqwsku.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXN6bmN0eGR1Y29lY3F3c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NzcwNzQsImV4cCI6MjA2NjE1MzA3NH0.0-G4E4I8-qCp4ALIZvuWibunVT0h-mvxXqWjDynZKkU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);