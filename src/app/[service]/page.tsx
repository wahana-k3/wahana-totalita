import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Phone,
  Calendar,
  ArrowRight,
  Building2,
  MapPin,
  Sparkles,
  FileCheck2,
  Factory,
  Briefcase,
  Users,
  ChevronRight,
  HelpCircle,
  Clock,
} from 'lucide-react';
import pagesRegistry from '@/data/pages_registry.json';
import servicePagesData from '@/data/service_pages.json';
import citiesDetailedData from '@/data/cities_detailed.json';
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
  const cityKeys = Object.keys(citiesDetailedData);
  const allKeys = Array.from(new Set([...serviceKeys, ...registryKeys, ...cityKeys]));
  return allKeys.map((slug) => ({
    service: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const servicePage = (servicePagesData as any)[params.service];
  const cityPage = (citiesDetailedData as any)[params.service];
  const registryPage = (pagesRegistry as any)[params.service];
  const page = cityPage || servicePage || registryPage;

  if (!page) return {};

  const title = page.meta_title || `${page.title} | Wahana Totalita`;
  const description = page.meta_desc || page.desc || page.title;

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
  const cityPage = (citiesDetailedData as any)[params.service];
  const registryPage = (pagesRegistry as any)[params.service];

  // 1. If it's a rich city page from kota.php dataset
  if (cityPage) {
    const c = cityPage;
    const allCities = Object.values(citiesDetailedData) as any[];
    const jsonLdFaqs = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (c.faqs || []).map((faq: any) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    return (
      <div className="bg-[#fafaf9] min-h-screen pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqs) }}
        />

        {/* ─── Luminous Hero Banner ─────────────────────────────────────────── */}
        <div className="bg-gradient-to-b from-white via-slate-50 to-[#fafaf9] py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto space-y-6">
            <Breadcrumbs items={[{ name: `Pelatihan K3 ${c.city_name}` }]} />

            <div className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>PJK3 Resmi Kemnaker RI & LSP BNSP · Wilayah {c.city_name} ({c.province})</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
                {c.heading || `Pelatihan & Sertifikasi K3 ${c.city_name}`}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                {c.desc}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/6287759151278?text=${encodeURIComponent(
                    `Halo Wahana Totalita, saya ingin informasi biaya, jadwal, dan pendaftaran Pelatihan K3 ${c.city_name} 2026`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-emerald-600/25 flex items-center gap-2 text-sm transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Daftar / Konsultasi WhatsApp ({c.city_name})</span>
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
          {/* ─── Local Industry Profile & Demand Analysis ─────────────────── */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Profil Industri Lokal
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
                  Kebutuhan Tenaga K3 di {c.city_name}
                </h2>
              </div>
              {c.highlight && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{c.highlight}</span>
                </div>
              )}
            </div>

            <div className="prose-k3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p className="font-medium text-slate-900">{c.demand}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                  <Factory className="w-4 h-4 text-emerald-600" />
                  <span>Sektor Industri Utama</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{c.industries}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Klien & Korporasi Terkemuka</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{c.companies}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Cakupan Wilayah Terdekat</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{c.nearby}</p>
              </div>
            </div>
          </div>

          {/* ─── Curated Program Matrix for this City ─────────────────────── */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Skema Kompetensi
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
                  Program Pelatihan Prioritas di {c.city_name}
                </h2>
              </div>
              <Link
                href="/pelatihan"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua 147 Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {c.programs && c.programs.length > 0 ? (
                c.programs.map((prog: any, idx: number) => {
                  const icon = prog[0] || '🦺';
                  const title = prog[1];
                  const cert = prog[2];
                  const duration = prog[3];
                  const linkSlug = prog[4];

                  return (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{icon}</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            {cert}
                          </span>
                        </div>
                        <Link href={linkSlug.startsWith('pelatihan-') ? `/pelatihan/${linkSlug}` : `/${linkSlug}`}>
                          <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                            {title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Durasi: {duration}</span>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={linkSlug.startsWith('pelatihan-') ? `/pelatihan/${linkSlug}` : `/${linkSlug}`}
                          className="text-xs font-bold text-emerald-700 group-hover:underline flex items-center gap-1"
                        >
                          <span>Silabus & Jadwal</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <a
                          href={`https://wa.me/6287759151278?text=${encodeURIComponent(
                            `Halo Wahana Totalita, saya ingin daftar program ${title} untuk wilayah ${c.city_name}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white p-2 rounded-xl transition-all"
                          title="Daftar via WhatsApp"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })
              ) : null}
            </div>
          </div>

          {/* ─── Alumni Testimonials ──────────────────────────────────────── */}
          {c.testimonials && c.testimonials.length > 0 && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Testimoni Peserta & Perusahaan
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Pengalaman Alumni Pelatihan di Sektor {c.city_name}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {c.testimonials.map((t: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col justify-between space-y-4"
                  >
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="border-t border-slate-200/60 pt-3">
                      <div className="font-bold text-xs text-slate-900">{t.nama}</div>
                      <div className="text-[11px] text-slate-500">{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Local FAQs Accordion ───────────────────────────────────────── */}
          {c.faqs && c.faqs.length > 0 && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Tanya Jawab (FAQ)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Pertanyaan Sering Ditanyakan Mengenai Pelatihan K3 di {c.city_name}
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                {c.faqs.map((faq: any, idx: number) => (
                  <details
                    key={idx}
                    className="group bg-slate-50 border border-slate-200/70 rounded-2xl p-5 transition-all open:bg-white open:border-emerald-500/40 open:shadow-sm"
                  >
                    <summary className="font-bold text-sm text-slate-900 cursor-pointer flex items-center justify-between gap-4 select-none">
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
                    </summary>
                    <p className="text-xs text-slate-600 leading-relaxed mt-3 pl-6 border-t border-slate-100 pt-3">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* ─── National City Directory (SEO Ring Interlinking) ─────────── */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Jangkauan Nasional
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Layanan Pelatihan K3 di Kota Industri Lainnya
              </h3>
              <p className="text-xs text-slate-600">
                Pilih wilayah operasional perusahaan Anda untuk melihat silabus dan penawaran in-house training:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-2">
              {allCities.map((city: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/${city.slug}`}
                  className={`text-xs font-semibold p-2.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                    city.slug === params.service
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-sm'
                      : 'bg-slate-50 hover:bg-white border-slate-200/80 hover:border-emerald-500/40 text-slate-700 hover:text-emerald-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{city.city_name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ─── Final High-Converting CTA Box ────────────────────────────── */}
          <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                Pendaftaran Resmi Kemnaker RI & BNSP
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Konsultasikan Kebutuhan K3 di {c.city_name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
                Dapatkan proposal penawaran harga grup, silabus resmi, dan jadwal pelaksanaan terdekat di wilayah {c.city_name} dan sekitarnya ({c.nearby}).
              </p>
            </div>

            <a
              href={`https://wa.me/6287759151278?text=${encodeURIComponent(
                `Halo Wahana Totalita, saya ingin informasi biaya, jadwal, dan pendaftaran Pelatihan K3 ${c.city_name} 2026`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-50 text-emerald-800 font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full flex items-center gap-2 shadow-lg transition-all hover:scale-105 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-emerald-700 fill-current" />
              Chat WhatsApp Konsultan ({c.city_name})
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 2. If it's a standalone service landing page with raw HTML
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

  // 3. Fallback generic page
  if (!registryPage && !servicePage) {
    notFound();
  }

  const page = registryPage || servicePage;
  const relatedCourses = trainingsData.slice(0, 6);

  return (
    <div className="bg-[#fafaf9] min-h-screen pb-24">
      <div className="bg-gradient-to-b from-white via-slate-50 to-[#fafaf9] py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-6">
          <Breadcrumbs items={[{ name: page.title }]} />

          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>PJK3 Resmi KEMNAKER RI & BNSP</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
              {page.heading || page.title}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              {page.meta_desc}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin informasi mengenai ${page.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-emerald-600/25 flex items-center gap-2 text-sm transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Konsultasi CS WhatsApp</span>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Program Pelatihan Terkait
            </h2>
            <Link href="/pelatihan" className="text-xs font-bold text-emerald-700 hover:underline">
              Semua 147 Pelatihan →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
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
                  <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
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
