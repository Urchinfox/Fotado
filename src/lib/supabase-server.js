// lib/supabase-server.js
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get: (name) => cookies().get(name)?.value,
                getAll: () => cookies().getAll(),
                // getAll: () => cookies().getAll().map(c => c.value),
                // set / remove 只能在 route handler 裡呼叫
            }
        }
    );
}
