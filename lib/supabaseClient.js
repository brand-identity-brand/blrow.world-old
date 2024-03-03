import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://xgzssoosjqorfdzkfxbw.supabase.co', 
    process.env.SUPABASE_SERVICE_ROLE_KEY
);