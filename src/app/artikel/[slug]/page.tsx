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
  HelpCircle
} from 'lucide-react';
import articlesData from '@/data/articles.json';
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

  const relatedArticles = articlesData
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.meta_desc || article.title,
    "author": {
      "@type": "Organization",
      "name": article.author || "Wahana Totalita Konsultan"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wahana Totalita Konsultan",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wahanatotalita.com/apple-touch-icon.png"
      }
    },
    "datePublished": article.published_at || "2026-01-01",
    "mainEntityOfPage": `https://wahanatotalita.com/artikel/${article.slug}/`
  };

  // FAQ Schema if FAQs exist
  const faqSchema =
    article.faqs && article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": article.faqs.map((f: any) => ({
            "@type": "Question",
            "name": f.q || f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a || f.answer
            }
          }))
        }
      : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ─── Header & Breadcrumbs ────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Artikel', url: '/artikel' },
              { name: article.title }
            ]}
          />

          <div className="space-y-4">
            <span className="inline-block bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold px-3 py-1 rounded-md">
              {article.category || 'K3'}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-600" />
                <span>{article.author || 'Wahana Totalita Konsultan'}</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Terbit: {article.published_at?.split(' ')[0] || '2026'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Article Body ────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 grid grid-cols-1 gap-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Main Article Content */}
          <div
            className="prose-k3 text-base text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* FAQs Accordion if present */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-10 pt-8 border-t border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-600" />
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>

              <div className="space-y-3">
                {article.faqs.map((faq: any, idx: number) => (
                  <details
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 group open:border-brand-500 transition-all text-sm"
                  >
                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                      <span>{faq.q || faq.question}</span>
                      <span className="text-brand-600 font-bold group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {faq.a || faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Article Bottom Banner CTA */}
          <div className="bg-gradient-to-r from-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-extrabold text-lg text-white">Butuh Sertifikasi & Pelatihan K3?</h3>
              <p className="text-xs text-slate-300">
                Konsultasikan kebutuhan pelatihan personil atau audit K3 perusahaan Anda bersama tim ahli kami.
              </p>
            </div>

            <a
              href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya membaca artikel "${article.title}" dan ingin konsultasi program pelatihan K3`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-500/30 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 fill-current" />
              Chat WhatsApp CS
            </a>
          </div>
        </div>

        {/* ─── Related Articles ────────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">Artikel Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/artikel/${rel.slug}`}
                  className="bg-white border border-slate-200 hover:border-brand-500 rounded-2xl p-4 shadow-sm transition-all group block"
                >
                  <div className="text-[10px] text-brand-600 font-bold uppercase">{rel.category || 'K3'}</div>
                  <div className="font-semibold text-xs text-slate-900 group-hover:text-brand-600 line-clamp-2 mt-1">
                    {rel.title}
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
