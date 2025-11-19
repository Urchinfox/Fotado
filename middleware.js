// 只要網址開頭是 /admin/ 的路徑，都要經過這個 middleware。

// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient({ req, res });
//     const { data: { session } } = await supabase.auth.getSession();

//     if (req.nextUrl.pathname.startsWith('/admin') && !session) {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }

//     return res;
// }

// export const config = {
//     matcher: '/admin/:path*',
// };