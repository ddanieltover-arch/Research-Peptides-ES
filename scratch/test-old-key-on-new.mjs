import { createClient } from '@supabase/supabase-js';

const oldKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcHdwZ2duamRrbnJ5aGtqY2NkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTQ4ODAyMywiZXhwIjoyMDk1MDY0MDIzfQ.wQ97ZJb1J2sWNbo2s6Ow9yuRU1MFdsUFPwOhSed2dOA';
const dest = createClient('https://ookuaiouverpznpjlqhr.supabase.co', oldKey);
const { data, error } = await dest.storage.listBuckets();
console.log('listBuckets:', error?.message || data);
