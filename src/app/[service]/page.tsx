import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2, Award, Phone, Calendar, ArrowRight, Building2, MapPin, Sparkles, FileCheck2 } from 'lucide-react';
import pagesRegistry from '@/data/pages_registry.json';
import servicePagesData from '@/data/service_pages.json';
import trainingsData from '@/data/trainings.json';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getTrainingPhoto } from '@/lib/trainingImages';

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

  // All 24 regional city doorway pages for cross-linking
  const allCityPages = Object.values(pagesRegistry).filter((p: any) => p.type === 'city');

  // If this service has full original HTML content, render it directly!
  if (servicePage && servicePage.html && servicePage.html.length > 200) {
    return (
      <div className="bg-[#fafaf9] min-h-screen pb-24">
        {/* Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs items={[{ name: servicePage.title }]} />
          </div>
        </div>

        {/* Exact Original Rich Landing Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div
            className="prose-k3 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-12 shadow-sm"
            dangerouslySetInnerHTML={{ __html: servicePage.html }}
          />

          {/* WhatsApp Direct CTA Footer Bar */}
          <div className="mt-10 bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                Konsultasi Layanan Resmi Kemnaker RI & BNSP
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Butuh Bantuan Layanan {servicePage.title}?
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
                Hubungi konsultan kami sekarang untuk pemeriksaan dokumen, syarat administrasi, dan estimasi waktu proses.
              </p>
            </div>

            <a
              href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin konsultasi mengenai layanan ${servicePage.title}`)}`}
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

  // Luminous Modern Template for City Doorway Pages
  return (
    <div className="bg-[#fafaf9] min-h-screen pb-24">
      {/* ─── Luminous Hero Banner ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-white via-slate-50 to-[#fafaf9] py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-6">
          <Breadcrumbs items={[{ name: page.title }]} />

          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {isCity ? `Layanan K3 Resmi Wilayah ${page.city_name} (${page.province})` : 'PJK3 Resmi KEMNAKER RI & BNSP'}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
              {page.heading || page.title}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              {page.meta_desc}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin informasi pelatihan K3 untuk wilayah ${page.city_name || page.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-emerald-600/25 flex items-center gap-2 text-sm transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Konsultasi CS WhatsApp ({page.city_name || 'Online'})</span>
              </a>

              <Link
                href="/pelatihan"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold px-7 py-3.5 rounded-full text-sm shadow-sm"
              >
                Buka Semua 147 Program K3
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Sections ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Key Features / Sections */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Keunggulan Wilayah
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {isCity ? `Cakupan & Keunggulan Layanan K3 di ${page.city_name}` : 'Cakupan & Keunggulan Layanan'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.sections && page.sections.length > 0 ? (
              page.sections.map((sec: string, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 space-y-2 hover:bg-white hover:border-emerald-500/40 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{sec}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    Didukung instruktur praktisi industri bersertifikat Kemnaker RI dan asesor BNSP resmi. Tersedia format blended online via Zoom maupun in-house di lokasi kerja wilayah {page.city_name || 'Indonesia'}.
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

        {/* Popular Courses in City with Real Flyer Photos */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Sertifikasi Terpopuler
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
                {isCity ? `Program Pelatihan Populer di ${page.city_name}` : 'Program Pelatihan & Sertifikasi Terkait'}
              </h2>
            </div>
            <Link href="/pelatihan" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
              <span>Semua 147 Pelatihan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.map((c) => {
              const photoSrc = getTrainingPhoto(c.slug || c.id, c.image_path);
              return (
                <div
                  key={c.id}
                  className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                      <Image
                        src={photoSrc}
                        alt={c.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {c.certification}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <Link href={`/pelatihan/${c.slug}`}>
                        <h3 className="font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors line-clamp-2">
                          {c.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {c.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Investasi</div>
                      <div className="text-xs font-bold text-slate-900">
                        {c.price > 0 ? `Rp ${Number(c.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                      </div>
                    </div>
                    <Link
                      href={`/pelatihan/${c.slug}`}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-sm"
                    >
                      Daftar →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Regional City Hub Directory for SEO Interlinking ───────── */}
        {allCityPages.length > 0 && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Jangkauan Nasional
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Layanan Pelatihan & Sertifikasi K3 di Kota Lainnya
              </h3>
              <p className="text-xs text-slate-600">
                Wahana Totalita melayani pelatihan K3 online maupun in-house training di seluruh pusat industri Indonesia.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-2">
              {allCityPages.map((city: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/${city.slug}`}
                  className={`text-xs font-semibold p-2.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                    city.slug === params.service
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                      : 'bg-slate-50 hover:bg-white border-slate-200/80 hover:border-emerald-500/40 text-slate-700 hover:text-emerald-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{city.city_name || city.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── Final CTA Box ────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs text-amber-300 font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              Pendaftaran Resmi 2026
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Siap Mengikuti Pelatihan K3 di {page.city_name || 'Indonesia'}?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Dapatkan silabus lengkap, jadwal terdekat, dan penawaran in-house training khusus untuk perusahaan Anda di {page.city_name || 'seluruh Indonesia'}.
            </p>
          </div>

          <a
            href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin pendaftaran pelatihan K3 untuk wilayah ${page.city_name || page.title}`)}`}
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
