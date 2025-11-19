'use client';

// import { supabase } from '@/lib/supabase';
import { supabase } from '@/lib/supabase-browser';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/admin/products'); // 跳到後台產品頁
        }
    };


    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ backgroundColor: '#edf2f7', minHeight: '100vh' }}
        >            <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>後台登入</h2>

                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <div style={{ marginBottom: '1rem' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #cbd5e0', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>密碼</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', border: '1px solid #cbd5e0', borderRadius: '4px' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: '100%', padding: '0.75rem', background: '#3182ce', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
                >
                    {loading ? '登入中...' : '登入'}
                </button>
            </form>
        </div>
    );
}