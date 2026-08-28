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
  FileText,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import trainingsData from '@/data/trainings.json';
import cityPelatihanPagesData from '@/data/city_pelatihan_pages.json';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getTrainingPhoto } from '@/lib/trainingImages';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const trainingSlugs = trainingsData.map((item) => ({
    slug: item.slug,
  }));
  const citySlugs = Object.keys(cityPelatihanPagesData).map((slug) => ({
    slug,
  }));
  return [...trainingSlugs, ...citySlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const training = trainingsData.find((t) => t.slug === params.slug);
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

  if (!training) return {};

  const title = training.meta_title || `${training.name} | Wahana Totalita`;
  const description = training.meta_desc || training.description?.slice(0, 160) || `Pelatihan dan sertifikasi resmi ${training.name}.`;
  const photo = getTrainingPhoto(training.slug, (training as any).image_path);

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
      images: [
        {
          url: `https://wahanatotalita.com${photo}`,
          width: 1200,
          height: 630,
          alt: training.name,
        },
      ],
    },
    alternates: {
      canonical: `https://wahanatotalita.com/pelatihan/${training.slug}/`,
    },
  };
}

export default function PelatihanDetailPage({ params }: Props) {
  const training = trainingsData.find((t) => t.slug === params.slug);
  const cityPage = (cityPelatihanPagesData as any)[params.slug];

  // If this is a dedicated city landing page from city_pelatihan_pages
  if (cityPage) {
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

  if (!training) {
    notFound();
  }

  const photoUrl = getTrainingPhoto(training.slug, (training as any).image_path);

  const relatedTrainings = trainingsData
    .filter((t) => t.category === training.category && t.slug !== training.slug)
    .slice(0, 3);

  // Universal and Topic FAQs matching original PHP logic
  const haystack = `${training.slug} ${training.name}`.toLowerCase();
  const universalFaqs = [
    {
      q: 'Apa perbedaan sertifikasi K3 BNSP dan Kemnaker?',
      a: 'Sertifikasi Kemnaker diterbitkan melalui lembaga pelatihan yang ditunjuk Kementerian Ketenagakerjaan RI, umumnya berupa Sertifikat Kompetensi K3 disertai SKP (Surat Keputusan Penunjukan) untuk profesi tertentu seperti Ahli K3 Umum. Sertifikasi BNSP diterbitkan oleh Lembaga Sertifikasi Profesi (LSP) berlisensi Badan Nasional Sertifikasi Profesi, mengacu pada skema SKKNI. Keduanya sah dan diakui secara nasional.',
    },
    {
      q: 'Berapa lama masa berlaku SKP dan sertifikat K3?',
      a: 'SKP (Surat Keputusan Penunjukan) dan sertifikat kompetensi K3 dari Kemnaker umumnya berlaku 3 tahun sejak tanggal diterbitkan, dan dapat diperpanjang sebelum masa berlaku habis. Sertifikat BNSP mengikuti masa berlaku skema sertifikasi terkait, pada umumnya juga 3 tahun.',
    },
    {
      q: 'Bagaimana cara mengecek keaslian sertifikat K3 secara online?',
      a: 'Sertifikat Kemnaker dapat dicek melalui sistem informasi resmi Kementerian Ketenagakerjaan (TemanK3), sedangkan sertifikat BNSP diverifikasi melalui portal resmi LSP penerbit. Wahana Totalita juga menyediakan verifikasi sertifikat di /verifikasi/ khusus untuk alumni pelatihan kami.',
    },
    {
      q: 'Apakah sertifikat ini berlaku untuk tender pemerintah dan proyek BUMN?',
      a: 'Ya. Sertifikat Kemnaker maupun BNSP yang diterbitkan lembaga terakreditasi berlaku secara nasional dan lazim digunakan sebagai syarat teknis dalam tender pemerintah maupun proyek BUMN/swasta di seluruh Indonesia.',
    },
  ];

  const topicFaqs = [];
  if (haystack.includes('confined') || haystack.includes('ruang-terbatas') || haystack.includes('gas-tester')) {
    topicFaqs.push(
      {
        q: 'Berapa kadar oksigen yang aman untuk bekerja di ruang terbatas?',
        a: 'Kadar oksigen normal di udara sekitar 20,9%. Kondisi umumnya dianggap aman untuk memasuki ruang terbatas pada rentang 19,5%–23,5%. Pengujian wajib dilakukan oleh Authorized Gas Tester (AGT) sebelum izin masuk diberikan.',
      },
      {
        q: 'Apa itu Authorized Gas Tester (AGT)?',
        a: 'Authorized Gas Tester (AGT) adalah petugas bersertifikat yang berwenang menguji kadar gas dan oksigen sebelum dan selama pekerjaan di ruang terbatas sesuai prosedur permit to work.',
      }
    );
  }

  if (haystack.includes('smk3') || haystack.includes('auditor')) {
    topicFaqs.push({
      q: 'Berapa kali audit SMK3 eksternal wajib dilakukan?',
      a: 'Berdasarkan PP No. 50 Tahun 2012, audit SMK3 eksternal oleh badan audit yang ditunjuk Kemnaker wajib dilakukan sekurang-kurangnya 1 kali dalam 3 tahun.',
    });
  }

  const allFaqs = [...topicFaqs, ...universalFaqs];

  // Schema.org Course
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": training.name,
    "description": training.description || training.name,
    "image": `https://wahanatotalita.com${photoUrl}`,
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
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumbs
            items={[
              { name: 'Katalog Pelatihan', url: '/pelatihan' },
              { name: training.name }
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {training.certification}
                </span>
                <span className="capitalize text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                  Metode: {training.mode}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                  Durasi: {training.duration_days || 3} Hari
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                  Masa Berlaku: {training.validity_months || 36} Bulan
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                {training.name}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {training.description || 'Program pembinaan, sertifikasi profesi, dan uji kompetensi resmi bersertifikat BNSP / KEMNAKER RI dengan materi terstruktur dan instruktur ahli berpengalaman.'}
              </p>
            </div>

            {/* Quick Pricing Card Desktop */}
            <div className="lg:w-80 bg-slate-950 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 space-y-6 shrink-0">
              <div className="space-y-1">
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Investasi Pelatihan</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {training.price > 0 ? `Rp ${Number(training.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                </div>
                <div className="text-xs text-slate-400">{training.price_label || '/ orang (termasuk sertifikat)'}</div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sertifikat Resmi {training.certification}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Modul, Regulasi & Softcopy Materi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ujian & Evaluasi Kelulusan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Konsultasi Pasca-Pelatihan</span>
                </div>
              </div>

              <a
                href={`https://wa.me/6287759151278?text=${encodeURIComponent(training.wa_text || `Halo Wahana Totalita, saya ingin daftar ${training.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all text-sm"
              >
                <Phone className="w-4 h-4 fill-current" />
                Daftar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content, Photo & Outline ───────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Dedicated Program Photo Banner */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="relative h-72 sm:h-96 w-full bg-slate-900">
              <img
                src={photoUrl}
                alt={`Dokumentasi Pelatihan ${training.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-emerald-400 bg-slate-900/80 px-3 py-1 rounded-md backdrop-blur-sm">
                  Dokumentasi Pembinaan & Asesmen Lapangan
                </span>
              </div>
            </div>
          </div>

          {/* Exact Database Long Content */}
          {training.long_content && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
              <div
                className="prose-k3 text-base text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: training.long_content }}
              />
            </div>
          )}

          {/* Curriculum / Syllabus Modules */}
          {training.curriculum && training.curriculum.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900">Materi & Kurikulum Pelatihan</h2>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {training.curriculum.map((module: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-4"
                  >
                    <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
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

          {/* FAQ Section */}
          {allFaqs.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900">Pertanyaan yang Sering Diajukan (FAQ)</h2>
              </div>

              <div className="space-y-3 pt-2">
                {allFaqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 group open:border-emerald-500 transition-all text-sm"
                  >
                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                      <span>{faq.q}</span>
                      <span className="text-emerald-700 font-bold group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
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
              href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin penawaran in-house/grup untuk ${training.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Minta Proposal In-House
            </a>
          </div>

          {/* Related Trainings */}
          {relatedTrainings.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Pelatihan Terkait</h3>
              <div className="space-y-3">
                {relatedTrainings.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/pelatihan/${rel.slug}`}
                    className="block p-3 rounded-xl border border-slate-100 hover:border-emerald-500 hover:bg-slate-50 transition-all group"
                  >
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {rel.certification}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors mt-1 line-clamp-2">
                      {rel.name}
                    </h4>
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
