import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Phone } from 'lucide-react';
import cityPelatihanPagesData from '@/data/city_pelatihan_pages.json';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const citySlugs = Object.keys(cityPelatihanPagesData).map((slug) => ({
    slug,
  }));
  return citySlugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityPage = (cityPelatihanPagesData as any)[params.slug];

  if (cityPage) {
    return {
      title: cityPage.title || `${params.slug} | Wahana Totalita`,
      description: cityPage.meta_desc || cityPage.title,
      openGraph: {
        title: cityPage.title,
        description: cityPage.meta_desc,
        url: `https://wahanatotalita.com/pelatihan/${params.slug}/`,
        siteName: 'Wahana Totalita Konsultan',
        locale: 'id_ID',
        type: 'article',
      },
      alternates: {
        canonical: `https://wahanatotalita.com/pelatihan/${params.slug}/`,
      },
    };
  }

  return {};
}

export default function PelatihanDetailPage({ params }: Props) {
  const cityPage = (cityPelatihanPagesData as any)[params.slug];

  if (!cityPage) {
    notFound();
  }

  return (
    <div className="bg-[#fafaf9] min-h-screen pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ name: 'Pelatihan', url: '/pelatihan' }, { name: cityPage.title }]} />
        </div>
      </div>

      {/* Rich HTML Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div
          className="prose-k3 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-12 shadow-sm"
          dangerouslySetInnerHTML={{ __html: cityPage.html }}
        />

        {/* WhatsApp Direct CTA Footer Bar */}
        <div className="mt-10 bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs text-amber-300 font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              Pendaftaran Resmi Kemnaker RI & BNSP
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Daftar Pelatihan {cityPage.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Hubungi representatif kami sekarang untuk mendapatkan jadwal terdekat, silabus lengkap, dan penawaran in-house training.
            </p>
          </div>

          <a
            href={`https://wa.me/6287759151278?text=${encodeURIComponent(
              `Halo Wahana Totalita, saya ingin pendaftaran pelatihan ${cityPage.title}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-slate-50 text-emerald-800 font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full flex items-center gap-2 shadow-lg transition-all hover:scale-105 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-emerald-700 fill-current" />
            Chat WhatsApp Konsultan
          </a>
        </div>
      </div>
    </div>
  );
}
