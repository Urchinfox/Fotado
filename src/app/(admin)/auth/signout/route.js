

// route.js
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


// src/app/(admin)/auth/signout/route.js
// import { createClient } from '@/lib/supabase-server';

// export async function POST() {
//     const supabase = createClient();
//     await supabase.auth.signOut();

//     return NextResponse.json({ success: true });
// }

export async function POST() {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get: (name) => cookies().get(name)?.value,
                set: (name, value, options) => cookies().set(name, value, options),
                remove: (name, options) => cookies().delete(name, options),
            },
        }
    );

    // 清除 Supabase session
    await supabase.auth.signOut();

    // ✅ 手動刪除 token cookie
    cookies().delete('sb-access-token', { path: '/' });
    cookies().delete('sb-refresh-token', { path: '/' });

    return NextResponse.json({ ok: true });
}

