import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import incidentsData from '@/data/incidents.json';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return incidentsData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const inc = incidentsData.find((i) => i.slug === params.slug);
  if (!inc) return {};

  return {
    title: `${inc.title} - Analisis Kasus K3 | Wahana Totalita`,
    description: inc.summary?.slice(0, 160) || `Analisis kronologi dan investigasi kasus ${inc.title}.`,
    alternates: {
      canonical: `https://wahanatotalita.com/insiden/${inc.slug}/`,
    },
  };
}

export default function InsidenDetailPage({ params }: Props) {
  const inc = incidentsData.find((i) => i.slug === params.slug);
  if (!inc) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Database Insiden', url: '/insiden' },
              { name: inc.title }
            ]}
          />
          <div className="flex items-center gap-2">
            <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-md">
              {inc.category || 'Kasus Insiden'}
            </span>
            <span className="text-xs text-slate-500 font-medium">{inc.incident_date}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {inc.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Ringkasan Kronologi Peristiwa:
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">
              {inc.summary || 'Insiden kerja terjadi selama kegiatan operasional berlangsung dan melibatkan potensi kegagalan sistem keselamatan.'}
            </p>
          </div>

          {inc.analysis && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">Analisis Akar Penyebab (Root Cause):</h2>
              <div
                className="prose-k3 text-sm text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: inc.analysis }}
              />
            </div>
          )}

          {inc.lessons_learned && (
            <div className="space-y-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <h2 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Pelajaran & Rekomendasi Pencegahan (Lessons Learned):
              </h2>
              <div
                className="text-xs sm:text-sm text-emerald-900 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: inc.lessons_learned }}
              />
            </div>
          )}

          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <Link href="/insiden" className="text-xs font-bold text-slate-600 hover:text-brand-600">
              ← Kembali ke Database Insiden
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
