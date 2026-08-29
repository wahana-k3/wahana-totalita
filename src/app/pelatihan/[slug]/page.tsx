import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  FileCheck2,
  HelpCircle,
  ArrowRight,
  MapPin,
  Building2,
  Users,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { getAllTrainings, getTrainingBySlug, getRelatedTrainings } from '@/lib/data/trainings';
import { getCityPelatihanBySlug, getAllCityPelatihanSlugs } from '@/lib/data/cities';
import Breadcrumbs from '@/components/Breadcrumbs';
import StickyConsultantCard from '@/components/StickyConsultantCard';
import MobileConversionBar from '@/components/MobileConversionBar';
import RelatedProgramsCard from '@/components/RelatedProgramsCard';
import { getTrainingPhoto } from '@/lib/trainingImages';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const trainingSlugs = getAllTrainings().map((t) => ({ slug: t.slug }));
  const citySlugs = getAllCityPelatihanSlugs().map((slug) => ({ slug }));
  return [...trainingSlugs, ...citySlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const training = getTrainingBySlug(params.slug);
  if (training) {
    const title = training.meta_title || `Pelatihan ${training.name} | ${training.certification} - Wahana Totalita`;
    const description = training.meta_desc || training.description;
    const photoUrl = getTrainingPhoto(training.slug, (training as any).image_path);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://www.wahanatotalita.com/pelatihan/${training.slug}/`,
        siteName: 'Wahana Totalita Konsultan',
        locale: 'id_ID',
        type: 'article',
        images: [{ url: photoUrl }],
      },
      alternates: {
        canonical: `https://www.wahanatotalita.com/pelatihan/${training.slug}/`,
      },
    };
  }

  const cityPage = getCityPelatihanBySlug(params.slug);
  if (cityPage) {
    return {
      title: cityPage.title || `${params.slug} | Wahana Totalita`,
      description: cityPage.meta_desc || cityPage.title,
      openGraph: {
        title: cityPage.title,
        description: cityPage.meta_desc,
        url: `https://www.wahanatotalita.com/pelatihan/${params.slug}/`,
        siteName: 'Wahana Totalita Konsultan',
        locale: 'id_ID',
        type: 'article',
      },
      alternates: {
        canonical: `https://www.wahanatotalita.com/pelatihan/${params.slug}/`,
      },
    };
  }

  return {};
}

export default function PelatihanDetailPage({ params }: Props) {
  const training = getTrainingBySlug(params.slug);
  const cityPage = getCityPelatihanBySlug(params.slug);

  if (!training && !cityPage) {
    notFound();
  }

  // ─── Scenario A: Standard Structured Training Program ─────────
  if (training) {
    const related = getRelatedTrainings(training.slug, training.category, 3);
    const photoUrl = getTrainingPhoto(training.slug, (training as any).image_path);
    const waUrl = `https://wa.me/6287759151278?text=${encodeURIComponent(
      training.wa_text || `Halo Wahana Totalita, saya tertarik daftar pelatihan ${training.name}`
    )}`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: training.name,
      description: training.description,
      provider: {
        '@type': 'Organization',
        name: 'Wahana Totalita Konsultan',
        sameAs: 'https://www.wahanatotalita.com',
      },
      offers: {
        '@type': 'Offer',
        price: training.price > 0 ? training.price : '7500000',
        priceCurrency: 'IDR',
        category: training.certification,
        availability: 'https://schema.org/InStock',
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: training.mode === 'online' ? 'Online' : 'Blended',
        duration: `P${training.duration_days}D`,
      },
    };

    return (
      <div className="bg-slate-50 min-h-screen pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ─── Header & Breadcrumbs ──────────────────────────── */}
        <div className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-4">
            <Breadcrumbs
              items={[
                { name: 'Pelatihan & Sertifikasi', url: '/pelatihan' },
                { name: training.name },
              ]}
            />

            {/* Hero Section Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    {training.certification}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 capitalize">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    Mode: {training.mode}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Kategori: {training.category.toUpperCase()}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {training.name}
                </h1>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {training.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 font-semibold">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Durasi: {training.duration_days} Hari Pembinaan</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Masa Berlaku: {training.validity_months || 36} Bulan</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span>Tersedia In-House &amp; Public</span>
                  </div>
                </div>
              </div>

              {/* Photo & Investment Card */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg p-5 space-y-4">
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={photoUrl}
                    alt={training.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-lg">
                    Sertifikasi Resmi
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Investasi Pelatihan</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {training.price > 0
                        ? `Rp ${Number(training.price).toLocaleString('id-ID')}`
                        : 'Hubungi CS'}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">{training.price_label || '/ orang'}</span>
                  </div>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Daftar / Konsultasi WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Main Content Grid ─────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Curriculum / Syllabus Section */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Silabus &amp; Materi Pembinaan Kompetensi
                    </h2>
                    <p className="text-xs text-slate-500">
                      Disusun berdasarkan standar SKKNI dan regulasi resmi Kemnaker RI.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {training.curriculum.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed pt-0.5">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits & Inclusions */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Fasilitas &amp; Benefit Peserta
                    </h2>
                    <p className="text-xs text-slate-500">
                      Seluruh perlengkapan dan legalitas disiapkan secara lengkap dan profesional.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Sertifikat Resmi Kemnaker RI / BNSP Terverifikasi',
                    'Surat Keterangan Penunjukan (SKP) & Lisensi K3 (jika berlaku)',
                    'Modul Materi & E-Book Standar Regulasi K3 Lengkap',
                    'Bimbingan Pembuatan Laporan Studi Kasus / PKL',
                    'Konsultasi Gratis Bersama Praktisi Senior & Asesor',
                    'Coffee Break & Lunch Eksklusif (untuk kelas Tatap Muka/Offline)',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-House Corporate Quotation Banner */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                    Layanan Korporasi (B2B)
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Butuh Pelatihan In-House di Perusahaan Anda?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
                    Hemat biaya dan sesuaikan jadwal pelaksanaan pelatihan langsung di site/kantor perusahaan dengan studi kasus operasional nyata.
                  </p>
                </div>
                <a
                  href={`https://wa.me/6287759151278?text=${encodeURIComponent(
                    `Halo Wahana Totalita, kami dari perusahaan ingin meminta proposal penawaran In-House Training untuk ${training.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl whitespace-nowrap shadow-lg transition-transform hover:scale-105"
                >
                  Minta Proposal In-House
                </a>
              </div>

              {/* Related Programs Recommendation */}
              <RelatedProgramsCard programs={related} />
            </div>

            {/* Right Sticky Sidebar */}
            <div className="hidden lg:block lg:col-span-4 space-y-6">
              <StickyConsultantCard
                topicTitle={training.name}
                category={training.certification}
                sourceType="pelatihan"
              />
            </div>
          </div>
        </div>

        {/* Persistent Conversion Bar for Mobile */}
        <MobileConversionBar pageTitle={training.name} category={training.certification} />
      </div>
    );
  }

  // ─── Scenario B: Cleaned City-Pelatihan Page ─────────────────
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { name: 'Pelatihan', url: '/pelatihan' },
              { name: cityPage!.title },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Cleaned City Content */}
          <div className="lg:col-span-8 space-y-8">
            <div
              className="prose-k3 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-12 shadow-xs"
              dangerouslySetInnerHTML={{ __html: cityPage!.html }}
            />

            {/* Direct CTA Footer */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Resmi Kemnaker RI &amp; BNSP
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Pendaftaran {cityPage!.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-lg">
                  Hubungi konsultan kami untuk info jadwal terdekat di kota Anda, silabus lengkap, dan harga promo.
                </p>
              </div>

              <a
                href={`https://wa.me/6287759151278?text=${encodeURIComponent(
                  `Halo Wahana Totalita, saya ingin pendaftaran pelatihan ${cityPage!.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-50 text-emerald-900 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl whitespace-nowrap shadow-lg transition-transform hover:scale-105"
              >
                Chat WhatsApp Konsultan
              </a>
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-4">
            <StickyConsultantCard
              topicTitle={cityPage!.title}
              category="Kota"
              sourceType="pelatihan"
            />
          </div>
        </div>
      </div>

      <MobileConversionBar pageTitle={cityPage!.title} category="Pelatihan Kota" />
    </div>
  );
}
