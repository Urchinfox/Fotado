import '../shared/globals.scss';
import BootstrapLoader from '@/components/BootstrapLoader';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

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
        icon: '/favicon-new.ico',
        // apple: '/apple-touch-icon.png', add later if needed

    },
    robots: {
        index: true,
        follow: true,
    },
    // --- 以下為新增的縮圖與社群分享設定 ---
    openGraph: {
        title: 'Fotado | High-Performance Automotive Parts',
        description: 'Premium automotive suspension parts and chassis upgrades for ultimate performance.',
        url: 'https://www.fotado.com.tw',
        siteName: 'Fotado',
        images: [
            {
                url: '/thumbnail.jpg', //
                width: 1200,
                height: 630,
                alt: 'Fotado Automotive Parts',
            },
        ],
        locale: 'zh_TW',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fotado | High-Performance Automotive Parts',
        description: 'Premium automotive suspension parts and chassis upgrades.',
        images: ['/thumbnail.jpg'],
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
                <BootstrapLoader />  {/* bootstrap function */}
                {children}

                <GoogleAnalytics gaId="G-1BNGP2TV7M" />
            </body>
        </html>
    );
}
