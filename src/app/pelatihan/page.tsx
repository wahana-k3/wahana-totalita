import React from 'react';
import type { Metadata } from 'next';
import PelatihanCatalog from '@/components/PelatihanCatalog';

export const metadata: Metadata = {
  title: 'Katalog Pelatihan K3 & Sertifikasi BNSP / KEMNAKER RI | Wahana Totalita',
  description: 'Jelajahi 140+ program pelatihan K3, sertifikasi BNSP, pembinaan Kemnaker RI, POP Tambang, Scaffolding, dan sertifikasi lingkungan resmi 2026.',
  openGraph: {
    title: 'Katalog Pelatihan K3 & Sertifikasi BNSP / KEMNAKER RI | Wahana Totalita',
    description: 'Jelajahi 140+ program pelatihan K3, sertifikasi BNSP, pembinaan Kemnaker RI, POP Tambang, Scaffolding, dan sertifikasi lingkungan resmi 2026.',
    url: 'https://www.wahanatotalita.com/pelatihan/',
    siteName: 'Wahana Totalita Konsultan',
    locale: 'id_ID',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.wahanatotalita.com/pelatihan/',
  },
};

export default function PelatihanPage() {
  return <PelatihanCatalog />;
}
