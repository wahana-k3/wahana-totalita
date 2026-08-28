import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  User,
  Share2,
  Phone,
  BookOpen,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import articlesData from '@/data/articles.json';
import trainingsData from '@/data/trainings.json';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return articlesData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) return {};

  const title = article.meta_title || `${article.title} | Wahana Totalita`;
  const description = article.meta_desc || article.title;

  return {
    title,
    description,
    keywords: article.keywords ? article.keywords.split(',').map((k) => k.trim()) : undefined,
    openGraph: {
      title,
      description,
      url: `https://wahanatotalita.com/artikel/${article.slug}/`,
      siteName: 'Wahana Totalita Konsultan',
      locale: 'id_ID',
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author || 'Wahana Totalita Konsultan'],
    },
    alternates: {
      canonical: `https://wahanatotalita.com/artikel/${article.slug}/`,
    },
  };
}

export default function ArtikelDetailPage({ params }: Props) {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  // Find 2 most relevant training programs matching article topic/category
  const relatedTrainings = trainingsData
    .filter((t) => {
      const artTitleLower = article.title.toLowerCase();
      const tNameLower = t.name.toLowerCase();
      if (artTitleLower.includes('listrik') && tNameLower.includes('listrik')) return true;
      if (artTitleLower.includes('konstruksi') && tNameLower.includes('konstruksi')) return true;
      if (artTitleLower.includes('tambang') && tNameLower.includes('tambang')) return true;
      if (artTitleLower.includes('ketinggian') && (tNameLower.includes('ketinggian') || tNameLower.includes('scaffolding'))) return true;
      if (artTitleLower.includes('kimia') && tNameLower.includes('kimia')) return true;
      if (artTitleLower.includes('kebakaran') && tNameLower.includes('kebakaran')) return true;
      if (artTitleLower.includes('smk3') && tNameLower.includes('smk3')) return true;
      if (artTitleLower.includes('ahli k3 umum') && tNameLower.includes('ahli k3 umum')) return true;
      return t.category.toLowerCase() === (article.category || 'k3').toLowerCase();
    })
    .slice(0, 2);

  // Fallback to top 2 trainings if none matched specifically
  const recommendedTrainings = relatedTrainings.length > 0 ? relatedTrainings : trainingsData.slice(0, 2);

  // Related articles
  const relatedArticles = articlesData
    .filter((a) => a.slug !== article.slug && (a.category === article.category || !article.category))
    .slice(0, 3);

  // Split content in half to inject High-Converting Mid-Article CTA Banner
  const splitContent = () => {
    const raw = article.content || '';
    const paragraphs = raw.split('</p>');
    if (paragraphs.length >= 4) {
      const mid = Math.floor(paragraphs.length / 2);
      const firstHalf = paragraphs.slice(0, mid).join('</p>') + '</p>';
      const secondHalf = paragraphs.slice(mid).join('</p>');
      return { firstHalf, secondHalf, hasMid: true };
    }
    return { firstHalf: raw, secondHalf: '', hasMid: false };
  };

  const { firstHalf, secondHalf, hasMid } = splitContent();

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.meta_desc || article.title,
    "author": {
      "@type": "Organization",
      "name": article.author || "Wahana Totalita Konsultan",
      "url": "https://wahanatotalita.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wahana Totalita Konsultan",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wahanatotalita.com/images/logo.png"
      }
    },
    "datePublished": article.published_at || "2026-01-01",
    "mainEntityOfPage": `https://wahanatotalita.com/artikel/${article.slug}/`
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ─── Header & Breadcrumbs ────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Artikel & Panduan', url: '/artikel' },
              { name: article.title }
            ]}
          />

          <div className="space-y-4">
            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-md">
              {article.category || 'K3 & Regulasi'}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Ditulis Oleh: {article.author || 'Tim Konsultan Wahana Totalita'}</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Update: {article.published_at?.split(' ')[0] || '2026'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Container ──────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* First Half Content */}
          <div
            className="prose-k3 text-base text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: firstHalf }}
          />

          {/* ─── Mid-Article High Converting WhatsApp CTA ──────── */}
          {hasMid && (
            <div className="my-8 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Konsultasi Sertifikasi & Kepatuhan K3</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Butuh Pembinaan K3 Resmi untuk Karyawan atau Tender Perusahaan?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Dapatkan proposal harga khusus korporat, silabus resmi KEMNAKER RI / BNSP, atau jadwal kelas terdekat bersama konsultan senior kami.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya sedang membaca artikel "${article.title}" dan ingin konsultasi program pelatihan K3`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-all"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Konsultasi Gratis via WhatsApp
                </a>

                <Link
                  href="/pelatihan"
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl text-center"
                >
                  Lihat Katalog Pelatihan
                </Link>
              </div>
            </div>
          )}

          {/* Second Half Content */}
          {secondHalf && (
            <div
              className="prose-k3 text-base text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: secondHalf }}
            />
          )}

          {/* ─── Relevant Training Program Box ─────────────────── */}
          <div className="mt-10 pt-8 border-t border-slate-200 space-y-5">
            <div className="space-y-1">
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
                Rekomendasi Sertifikasi Terkait
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Program Pelatihan & Sertifikasi Terkait Topik Ini
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedTrainings.map((rt) => (
                <div
                  key={rt.id}
                  className="bg-slate-50 border border-slate-200 hover:border-emerald-500 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] font-extrabold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded">
                      {rt.certification}
                    </span>
                    <Link href={`/pelatihan/${rt.slug}`}>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {rt.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div>⏱️ {rt.duration_days} Hari</div>
                      <div>•</div>
                      <div className="font-bold text-slate-800">
                        {rt.price > 0 ? `Rp ${Number(rt.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between">
                    <Link
                      href={`/pelatihan/${rt.slug}`}
                      className="text-xs font-bold text-slate-700 hover:text-emerald-700"
                    >
                      Lihat Silabus →
                    </Link>
                    <a
                      href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya tertarik daftar program ${rt.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> Daftar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── FAQs Accordion if present ─────────────────────── */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>

              <div className="space-y-3">
                {article.faqs.map((faq: any, idx: number) => (
                  <details
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 group open:border-emerald-500 transition-all text-sm"
                  >
                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                      <span>{faq.q || faq.question}</span>
                      <span className="text-emerald-700 font-bold group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {faq.a || faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* ─── End-Article Direct Contact Form CTA ─────────────── */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-extrabold text-lg text-white">Butuh Penawaran / Jadwal Pelatihan?</h3>
              <p className="text-xs text-slate-300">
                Konsultasikan kebutuhan sertifikasi K3 instansi atau tim proyek Anda bersama PJK3 Wahana Totalita.
              </p>
            </div>

            <a
              href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya membaca artikel "${article.title}" dan ingin konsultasi program pelatihan K3`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/30 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 fill-current" />
              Chat WhatsApp CS
            </a>
          </div>
        </div>

        {/* ─── Related Articles Grid ─────────────────────────── */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">Artikel Terkait Lainnya</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/artikel/${rel.slug}`}
                  className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-4 shadow-sm transition-all group block space-y-2"
                >
                  <span className="text-[10px] text-emerald-700 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {rel.category || 'K3'}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 line-clamp-2">
                    {rel.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                    <span>Baca Panduan</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
