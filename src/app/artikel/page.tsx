import React from 'react';
import type { Metadata } from 'next';
import ArtikelCatalog from '@/components/ArtikelCatalog';

export const metadata: Metadata = {
  title: 'Pusat Artikel, Panduan & Edukasi K3 Indonesia | Wahana Totalita',
  description: 'Kumpulan artikel dan panduan K3 terlengkap mengenai regulasi Kemnaker RI, standar BNSP, SMK3 PP 50/2012, CSMS, dan keselamatan industri.',
  openGraph: {
    title: 'Pusat Artikel, Panduan & Edukasi K3 Indonesia | Wahana Totalita',
    description: 'Kumpulan artikel dan panduan K3 terlengkap mengenai regulasi Kemnaker RI, standar BNSP, SMK3 PP 50/2012, CSMS, dan keselamatan industri.',
    url: 'https://www.wahanatotalita.com/artikel/',
    siteName: 'Wahana Totalita Konsultan',
    locale: 'id_ID',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.wahanatotalita.com/artikel/',
  },
};

export default function ArtikelPage() {
  return <ArtikelCatalog />;
}
