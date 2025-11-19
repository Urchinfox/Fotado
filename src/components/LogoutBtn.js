'use client';

import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch('/auth/signout', { method: 'POST' });
            if (res.ok) {
                // 登出後跳轉 login
                startTransition(() => {
                    router.push('/login');
                });
                console.log('succeed to route.js')
            }
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                padding: '0.5rem 1rem',
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
            }}
        >
            登出
        </button>
    );
}

