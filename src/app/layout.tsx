import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LeadHunterBar from '@/components/LeadHunterBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wahanatotalita.com'),
  title: {
    default: 'Wahana Totalita Konsultan | PJK3 Resmi KEMNAKER RI & Sertifikasi BNSP',
    template: '%s | Wahana Totalita',
  },
  description:
    'Lembaga PJK3 Resmi KEMNAKER RI dan Tempat Uji Kompetensi BNSP terpercaya di Indonesia. Menyediakan 140+ pelatihan K3, sertifikasi profesi, dan konsultasi SMK3 / CSMS corporate.',
  keywords: [
    'pelatihan k3',
    'ahli k3 umum',
    'sertifikasi bnsp',
    'kemnaker ri',
    'pjk3 yogyakarta',
    'pjk3 indonesia',
    'pelatihan k3 online',
    'konsultan csms',
    'smk3 pp 50 2012',
    'safety talk k3',
  ],
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://wahanatotalita.com',
    siteName: 'Wahana Totalita Konsultan',
    title: 'Wahana Totalita Konsultan | PJK3 Resmi KEMNAKER RI & Sertifikasi BNSP',
    description:
      'Lembaga PJK3 Resmi KEMNAKER RI dan Tempat Uji Kompetensi BNSP terpercaya di Indonesia.',
    images: [
      {
        url: '/images/logo.png',
        width: 600,
        height: 200,
        alt: 'Wahana Totalita Konsultan Logo',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Wahana Totalita Konsultan',
    alternateName: 'PT Wahana Totalita Konsultan',
    url: 'https://wahanatotalita.com',
    logo: 'https://wahanatotalita.com/images/logo.png',
    description:
      'Lembaga PJK3 Resmi Penunjukan KEMNAKER RI dan Tempat Uji Kompetensi BNSP untuk pelatihan dan sertifikasi K3, Lingkungan, dan Sistem Manajemen di Indonesia.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Ringroad Timur No. 59, Banguntapan',
      addressLocality: 'Bantul',
      addressRegion: 'D.I. Yogyakarta',
      postalCode: '55198',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-877-5915-1278',
      contactType: 'customer service',
      availableLanguage: ['Indonesian', 'English'],
    },
    sameAs: [
      'https://www.instagram.com/wahanatotalita',
      'https://www.facebook.com/wahanatotalita',
      'https://www.linkedin.com/company/wahana-totalita-konsultan',
    ],
  };

  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-slate-50 min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
        <LeadHunterBar />
      </body>
    </html>
  );
}
