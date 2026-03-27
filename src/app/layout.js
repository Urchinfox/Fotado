import '../shared/globals.scss';
import BootstrapLoader from '@/components/BootstrapLoader';
import { Inter } from 'next/font/google';

// 載入字型（推薦使用 Inter 或 Roboto，效能較好）
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata = {
    title: {
        default: 'Fotado',
        template: '%s | Fotado',
    },
    description: 'High-performance automotive suspension parts and chassis upgrades.',
    icons: {
        icon: '/favicon.ico', //待放icon圖片
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Bootstrap Icons */}
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
                />
                {/* 可選：結構化資料（JSON-LD） */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Fotado",
                            "url": "https://fotado.com.tw",
                            "logo": "https://fotado.com.tw/logo.png",
                            "description": "Premium automotive suspension and chassis performance parts",
                            "sameAs": [
                                "https://www.facebook.com/fotado",
                                "https://www.instagram.com/fotado"
                            ]
                        })
                    }}
                />
            </head>
            <body className='d-flex flex-column min-vh-100'>
                <BootstrapLoader />
                {children}
            </body>
        </html>
    );
}
