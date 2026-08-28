import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wahanatotalita.com"),
  title: {
    default: "Pelatihan K3 & Sertifikasi BNSP Yogyakarta | Wahana Totalita",
    template: "%s | Wahana Totalita",
  },
  description:
    "Wahana Totalita Konsultan menyediakan pelatihan K3, Lingkungan, Mining & ISO terakreditasi resmi KEMNAKER RI dan BNSP. Online & offline di Yogyakarta.",
  keywords: [
    "pelatihan k3",
    "sertifikasi bnsp",
    "ahli k3 umum kemnaker",
    "training k3 yogyakarta",
    "tot instruktur bnsp",
    "konsultan k3",
    "csms",
    "smk3 pp 50 2012"
  ],
  authors: [{ name: "Wahana Totalita Konsultan" }],
  creator: "Wahana Totalita Konsultan",
  publisher: "Wahana Totalita Konsultan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://wahanatotalita.com",
    title: "Pelatihan K3 & Sertifikasi BNSP Yogyakarta | Wahana Totalita",
    description:
      "Lembaga resmi pelatihan dan sertifikasi K3, Lingkungan, Mining & ISO bersertifikat KEMNAKER RI & BNSP.",
    siteName: "Wahana Totalita Konsultan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "name": "Wahana Totalita Konsultan",
    "url": "https://wahanatotalita.com",
    "logo": "https://wahanatotalita.com/apple-touch-icon.png",
    "description": "Penyedia pelatihan dan sertifikasi resmi K3, Lingkungan, Mining, dan Sistem Manajemen terakreditasi KEMNAKER RI dan BNSP.",
    "telephone": "+6287759151278",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yogyakarta",
      "addressRegion": "D.I. Yogyakarta",
      "addressCountry": "ID"
    },
    "sameAs": [
      "https://wa.me/6287759151278"
    ]
  };

  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
