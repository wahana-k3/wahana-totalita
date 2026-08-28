import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ShieldCheck, ArrowLeft, Phone } from 'lucide-react';
import glossaryData from '@/data/glossary.json';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return glossaryData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = glossaryData.find((g) => g.slug === params.slug);
  if (!item) return {};

  const title = item.meta_title || `Pengertian ${item.term} dalam K3 & Regulasi | Wahana Totalita`;
  const description = item.meta_desc || item.definition.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `https://wahanatotalita.com/glosarium/${item.slug}/`,
    },
  };
}

export default function GlosariumDetailPage({ params }: Props) {
  const item = glossaryData.find((g) => g.slug === params.slug);
  if (!item) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Glosarium K3', url: '/glosarium' },
              { name: item.term }
            ]}
          />
          <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-md">
            {item.category || 'K3'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pengertian {item.term}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="font-bold text-slate-900 text-base">Definisi:</h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {item.definition}
            </p>
          </div>

          {item.full_article && (
            <div
              className="prose-k3 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6"
              dangerouslySetInnerHTML={{ __html: item.full_article }}
            />
          )}

          {item.regulation && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">Dasar Regulasi Terkait:</span>
              <span>📜 {item.regulation}</span>
            </div>
          )}

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/glosarium" className="text-xs font-bold text-slate-600 hover:text-brand-600">
              ← Kembali ke Daftar Glosarium
            </Link>

            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pelatihan%20K3"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
            >
              Konsultasi Pelatihan Terkait
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
