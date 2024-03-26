import { createClient } from '@supabase/supabase-js';

///////////////////////SUPABASE KEYS/////////////////////////////////
const supabaseUrl = 'https://vvqnwdlbuuuqutjpiwat.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2cW53ZGxidXV1cXV0anBpd2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NjI4MTIsImV4cCI6MjAyNjAzODgxMn0.u1CWVoTu_2tWJLuawl3Jir8IxqSO5n4fQOp9GDr_7rU';
export const supabase = createClient(supabaseUrl, supabaseKey);
////////////////////////SUPABASE KEYS/////////////////////////////////