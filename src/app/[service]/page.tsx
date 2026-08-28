import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Award, Phone, Calendar, ArrowRight, Building2, MapPin } from 'lucide-react';
import pagesRegistry from '@/data/pages_registry.json';
import trainingsData from '@/data/trainings.json';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  params: {
    service: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(pagesRegistry).map((slug) => ({
    service: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = (pagesRegistry as any)[params.service];
  if (!page) return {};

  const title = page.meta_title || `${page.title} | Wahana Totalita`;
  const description = page.meta_desc || page.title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://wahanatotalita.com/${page.slug}/`,
      siteName: 'Wahana Totalita Konsultan',
      locale: 'id_ID',
      type: 'website',
    },
    alternates: {
      canonical: `https://wahanatotalita.com/${page.slug}/`,
    },
  };
}

export default function GenericServiceOrCityPage({ params }: Props) {
  const page = (pagesRegistry as any)[params.service];
  if (!page) {
    notFound();
  }

  const isCity = page.type === 'city';
  const relatedCourses = trainingsData.slice(0, 6);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ─── Hero Banner ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: page.title }]} />

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 text-brand-300 px-3.5 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              {isCity ? `Layanan K3 Wilayah ${page.city_name}` : 'Layanan Resmi PJK3 KEMNAKER RI & BNSP'}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {page.heading || page.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {page.meta_desc}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin informasi mengenai ${page.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-500/25 flex items-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4 fill-current" />
                Konsultasi WhatsApp Sekarang
              </a>

              <Link
                href="/pelatihan"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl text-sm"
              >
                Lihat Semua Program K3
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Sections ───────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* Key Features / Sections */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {isCity ? `Keunggulan & Ruang Lingkup Layanan di ${page.city_name}` : 'Cakupan & Keunggulan Layanan'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.sections && page.sections.length > 0 ? (
              page.sections.map((sec: string, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                    <span>{sec}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pl-7">
                    Didukung oleh instruktur praktisi bersertifikasi dan materi terstandarisasi regulasi nasional Kemenaker RI & BNSP.
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-xs text-slate-500">
                Layanan profesional bersertifikat resmi KEMNAKER RI dan BNSP untuk perorangan maupun perusahaan.
              </div>
            )}
          </div>
        </div>

        {/* Popular Courses in This Category / City */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isCity ? `Program Pelatihan Populer di ${page.city_name}` : 'Program Pelatihan & Sertifikasi Terkait'}
            </h2>
            <Link href="/pelatihan" className="text-xs font-bold text-brand-600 hover:underline">
              Semua 105 Program →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded">
                    {c.certification}
                  </span>
                  <Link href={`/pelatihan/${c.slug}`}>
                    <h3 className="font-bold text-sm text-slate-900 hover:text-brand-600 line-clamp-2">
                      {c.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {c.price > 0 ? `Rp ${Number(c.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                  </span>
                  <Link href={`/pelatihan/${c.slug}`} className="text-xs font-bold text-brand-600 hover:underline">
                    Detail →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Consultation Banner */}
        <div className="bg-gradient-to-r from-brand-900 to-navy-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Konsultasikan Kebutuhan {page.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Dapatkan proposal penawaran resmi, silabus pelatihan, atau jadwal in-house training khusus instansi/perusahaan Anda.
            </p>
          </div>

          <a
            href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin proposal & penawaran terkait ${page.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-lg text-sm shrink-0 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 fill-current" />
            Hubungi Tim Konsultan
          </a>
        </div>
      </div>
    </div>
  );
}
