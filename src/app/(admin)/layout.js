// src/app/(admin)/layout.js
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutBtn';



export default async function AdminLayout({ children }) {
    const supabase = createClient();

    const { data: { session }, error } = await supabase.auth.getSession();

    console.log('session in server layout:', session);

    if (!session) {
        redirect('/login');
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f7fafc', padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>汽車零件後台管理</h1>
                    {/* <form action="/auth/signout" method="post">
                        <button type="submit" style={{ padding: '0.5rem 1rem', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px' }}>
                            登出
                        </button>
                    </form> */}
                    <LogoutButton />
                </header>
                {children}
            </div>
        </div>
    );
}
