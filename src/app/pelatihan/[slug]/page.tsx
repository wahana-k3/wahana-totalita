import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  Phone,
  ArrowRight,
  BookOpen,
  Share2,
  FileText
} from 'lucide-react';
import trainingsData from '@/data/trainings.json';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return trainingsData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const training = trainingsData.find((t) => t.slug === params.slug);
  if (!training) return {};

  const title = training.meta_title || `${training.name} | Wahana Totalita`;
  const description = training.meta_desc || training.description?.slice(0, 160) || `Pelatihan dan sertifikasi resmi ${training.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://wahanatotalita.com/pelatihan/${training.slug}/`,
      siteName: 'Wahana Totalita Konsultan',
      locale: 'id_ID',
      type: 'article',
    },
    alternates: {
      canonical: `https://wahanatotalita.com/pelatihan/${training.slug}/`,
    },
  };
}

export default function PelatihanDetailPage({ params }: Props) {
  const training = trainingsData.find((t) => t.slug === params.slug);
  if (!training) {
    notFound();
  }

  const relatedTrainings = trainingsData
    .filter((t) => t.category === training.category && t.slug !== training.slug)
    .slice(0, 3);

  // Schema.org Course
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": training.name,
    "description": training.description || training.name,
    "provider": {
      "@type": "Organization",
      "name": "Wahana Totalita Konsultan",
      "sameAs": "https://wahanatotalita.com"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": training.mode === 'online' ? 'online' : 'blended',
      "duration": `P${training.duration_days || 3}D`
    },
    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "priceCurrency": "IDR",
      "price": training.price || "0",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* ─── Breadcrumbs & Header ────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Katalog Pelatihan', url: '/pelatihan' },
              { name: training.name }
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold px-3 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  {training.certification}
                </span>
                <span className="capitalize text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                  Metode: {training.mode}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                  Durasi: {training.duration_days || 3} Hari
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {training.name}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {training.description || 'Program pembinaan, sertifikasi profesi, dan uji kompetensi resmi bersertifikat BNSP / KEMNAKER RI dengan materi terstruktur dan instruktur ahli berpengalaman.'}
              </p>
            </div>

            {/* Quick Pricing Card Desktop */}
            <div className="lg:w-80 bg-navy-950 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 space-y-6 shrink-0">
              <div className="space-y-1">
                <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">Investasi Pelatihan</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {training.price > 0 ? `Rp ${Number(training.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                </div>
                <div className="text-xs text-slate-400">{training.price_label || '/ orang (termasuk sertifikat)'}</div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Sertifikat Resmi {training.certification}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Modul, Regulasi & Softcopy Materi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Ujian & Evaluasi Kelulusan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Konsultasi Pasca-Pelatihan</span>
                </div>
              </div>

              <a
                href={`https://wa.me/6287759151278?text=${encodeURIComponent(training.wa_text || `Halo Wahana Totalita, saya ingin daftar ${training.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all text-sm"
              >
                <Phone className="w-4 h-4 fill-current" />
                Daftar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content & Syllabus ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Detailed Content / Outline */}
          {training.long_content && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Tentang Program</h2>
              <div
                className="prose-k3 text-sm text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: training.long_content }}
              />
            </div>
          )}

          {/* Curriculum / Syllabus Modules */}
          {training.curriculum && training.curriculum.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-brand-600" />
                <h2 className="text-xl font-bold text-slate-900">Materi & Kurikulum Pelatihan</h2>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {training.curriculum.map((module: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-4"
                  >
                    <span className="w-7 h-7 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-sm">
                        {typeof module === 'string' ? module : module.title || module.name || `Modul ${idx + 1}`}
                      </h3>
                      {typeof module === 'object' && module.desc && (
                        <p className="text-xs text-slate-500 leading-relaxed">{module.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements & Benefits */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Persyaratan & Dokumen Peserta</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>Fotokopi Ijazah Pendidikan Terakhir (sesuai kualifikasi skema)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>Fotokopi Kartu Tanda Penduduk (KTP)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>Surat Keterangan Kerja / Pengalaman di bidang terkait (jika dipersyaratkan)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>Pas foto background merah ukuran 3x4 (4 lembar)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Sidebar ────────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Contact Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Konsultasi Jadwal & In-House</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Butuh penawaran harga khusus grup perusahaan atau pelatihan in-house di lokasi Anda? Tim kami siap membantu.
            </p>
            <a
              href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin informasi diskon grup / in-house untuk program ${training.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-sm"
            >
              <Phone className="w-4 h-4" />
              Tanya Penawaran In-House
            </a>
          </div>

          {/* Related Programs */}
          {relatedTrainings.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Program Terkait</h3>
              <div className="space-y-3">
                {relatedTrainings.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/pelatihan/${rel.slug}`}
                    className="block p-3 rounded-xl border border-slate-100 hover:border-brand-400 bg-slate-50/50 hover:bg-white transition-all group"
                  >
                    <div className="text-[10px] text-brand-600 font-bold uppercase">{rel.certification}</div>
                    <div className="font-semibold text-xs text-slate-800 group-hover:text-brand-600 line-clamp-2">
                      {rel.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
