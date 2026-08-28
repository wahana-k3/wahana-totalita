import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Award, Phone, Calendar, ArrowRight, Building2, MapPin } from 'lucide-react';
import pagesRegistry from '@/data/pages_registry.json';
import servicePagesData from '@/data/service_pages.json';
import trainingsData from '@/data/trainings.json';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  params: {
    service: string;
  };
}

export async function generateStaticParams() {
  const serviceKeys = Object.keys(servicePagesData);
  const registryKeys = Object.keys(pagesRegistry);
  const allKeys = Array.from(new Set([...serviceKeys, ...registryKeys]));
  return allKeys.map((slug) => ({
    service: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const servicePage = (servicePagesData as any)[params.service];
  const registryPage = (pagesRegistry as any)[params.service];
  const page = servicePage || registryPage;

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
  const servicePage = (servicePagesData as any)[params.service];
  const registryPage = (pagesRegistry as any)[params.service];
  const page = servicePage || registryPage;

  if (!page) {
    notFound();
  }

  const isCity = registryPage?.type === 'city';
  const relatedCourses = trainingsData.slice(0, 6);

  // If this service has full original HTML content, render it directly!
  if (servicePage && servicePage.html && servicePage.html.length > 200) {
    return (
      <div className="bg-slate-50 min-h-screen pb-24">
        {/* Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs items={[{ name: servicePage.title }]} />
          </div>
        </div>

        {/* Exact Original Rich Landing Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div
            className="prose-k3 bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm"
            dangerouslySetInnerHTML={{ __html: servicePage.html }}
          />

          {/* WhatsApp Direct CTA Footer Bar */}
          <div className="mt-10 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Konsultasi Layanan Resmi Kemnaker RI & BNSP
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Butuh Bantuan Layanan {servicePage.title}?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Hubungi konsultan kami sekarang untuk pemeriksaan dokumen, syarat administrasi, dan estimasi waktu proses.
              </p>
            </div>

            <a
              href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin konsultasi mengenai layanan ${servicePage.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/30 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 fill-current" />
              Chat WhatsApp Konsultan
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for city doorway pages
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ─── Hero Banner ─────────────────────────────────────────── */}
      <div className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: page.title }]} />

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isCity ? `Layanan K3 Wilayah ${page.city_name}` : 'Layanan Resmi PJK3 KEMNAKER RI & BNSP'}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
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
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 flex items-center gap-2 text-sm"
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
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
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

        {/* Popular Courses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isCity ? `Program Pelatihan Populer di ${page.city_name}` : 'Program Pelatihan & Sertifikasi Terkait'}
            </h2>
            <Link href="/pelatihan" className="text-xs font-bold text-emerald-700 hover:underline">
              Semua 147 Pelatihan →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {c.certification}
                  </span>
                  <Link href={`/pelatihan/${c.slug}`}>
                    <h3 className="font-bold text-sm text-slate-900 hover:text-emerald-700 line-clamp-2">
                      {c.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {c.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {c.price > 0 ? `Rp ${Number(c.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                  </span>
                  <Link
                    href={`/pelatihan/${c.slug}`}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    Daftar →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
