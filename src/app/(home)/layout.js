
import DeskHeader from "@/components/Header/DeskHeader";
import Footer from '@/components/Footer/Footer';
import MobileHeader from "@/components/Header/MobileHeader";

export const metadata = {
  title: 'Fotado | Premium Automotive Suspension & Chassis Parts',
  description: 'High-performance suspension parts, control arms, shock absorbers, stabilizer link, brake disc,lateral link and chassis upgrades for cars and trucks. Quality you can trust on and off the track.',

  keywords: [
    'suspension parts', 'control arm', 'shock absorber', 'stabilizer link',
    'brake disc', 'lateral link', 'chassis upgrade', 'performance parts', 'car modification',
    'auto parts', 'vehicle suspension', 'fotado', 'high performance suspension'
  ],

  authors: [{ name: 'Fotado' }],
  creator: 'Fotado',

  openGraph: {
    title: 'Fotado | Premium Automotive Suspension & Chassis Parts',
    description: 'High-performance suspension parts, control arms, shock absorbers, and chassis upgrades for cars and trucks.',
    url: 'https://fotado.com.tw',
    siteName: 'Fotado',
    images: [
      {
        url: '/http://192.168.2.52:3000/public/Fotado-og-img.png',   //1200x630 的 og:image 待拿真正圖片網址
        width: 1200,
        height: 630,
        alt: 'Fotado Performance Suspension Parts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Fotado | Premium Automotive Suspension & Chassis Parts',
    description: 'High-performance suspension parts and chassis upgrades for performance vehicles.',
    images: ['https://fotado.com.tw/images/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  alternates: {
    canonical: 'https://fotado.com.tw',
  },
};

export default function RootLayout({ children }) {


  return (
    <>
      <div className="d-lg-block d-none">
        <DeskHeader />
      </div>
      <div className="d-block d-lg-none">
        <MobileHeader />
      </div>
      <main className='flex-fill'>
        {children}
      </main>
      <Footer />
    </>
  );
}

