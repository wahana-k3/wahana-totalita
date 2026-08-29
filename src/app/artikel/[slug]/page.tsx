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
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '@/lib/data/articles';
import { getAllTrainings } from '@/lib/data/trainings';
import Breadcrumbs from '@/components/Breadcrumbs';
import StickyConsultantCard from '@/components/StickyConsultantCard';
import MobileConversionBar from '@/components/MobileConversionBar';
import RelatedProgramsCard from '@/components/RelatedProgramsCard';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllArticles().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
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
      url: `https://www.wahanatotalita.com/artikel/${article.slug}/`,
      siteName: 'Wahana Totalita Konsultan',
      locale: 'id_ID',
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author || 'Wahana Totalita Konsultan'],
    },
    alternates: {
      canonical: `https://www.wahanatotalita.com/artikel/${article.slug}/`,
    },
  };
}

export default function ArtikelDetailPage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const allTrainings = getAllTrainings();

  // Find 3 most relevant training programs matching article topic/category
  const relatedTrainings = allTrainings
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
    .slice(0, 3);

  const recommendedTrainings = relatedTrainings.length > 0 ? relatedTrainings : allTrainings.slice(0, 3);
  const relatedArticles = getRelatedArticles(article.slug, article.category, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_desc || article.title,
    author: {
      '@type': 'Organization',
      name: article.author || 'Wahana Totalita Konsultan',
      url: 'https://www.wahanatotalita.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wahana Totalita Konsultan',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.wahanatotalita.com/logo-wt.png',
      },
    },
    datePublished: article.published_at || '2025-01-01',
    dateModified: article.published_at || '2025-01-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.wahanatotalita.com/artikel/${article.slug}/`,
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header & Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Artikel K3 & Wawasan', url: '/artikel' },
              { name: article.title },
            ]}
          />

          <div className="max-w-4xl space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {article.category || 'K3'}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Panduan Resmi K3
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.author || 'Tim Ahli Wahana Totalita'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.published_at || 'Terbaru'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Article Left Body */}
          <div className="lg:col-span-8 space-y-8">
            <div
              className="prose-k3 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-12 shadow-xs"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* FAQs Section */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base sm:text-lg">
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  <h3>Pertanyaan yang Sering Diajukan (FAQ)</h3>
                </div>
                <div className="space-y-3">
                  {article.faqs.map((faq, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{faq.question}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Related Training Programs */}
            <RelatedProgramsCard
              programs={recommendedTrainings}
              title={`Pelatihan Rekomendasi Terkait ${article.title}`}
              subtitle="Terapkan standar keselamatan kerja di perusahaan Anda bersama sertifikasi resmi Kemnaker RI & BNSP."
            />

            {/* Related Articles Carousel */}
            {relatedArticles.length > 0 && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Artikel Menarik Lainnya
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((ra) => (
                    <Link
                      key={ra.id}
                      href={`/artikel/${ra.slug}`}
                      className="group p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-300 transition-all space-y-2"
                    >
                      <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100/70 px-2 py-0.5 rounded">
                        {ra.category}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 line-clamp-2">
                        {ra.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-semibold block pt-1">
                        Baca Selengkapnya &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Consultant Right Rail */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <StickyConsultantCard
              topicTitle={article.title}
              category={article.category}
              sourceType="artikel"
            />
          </div>
        </div>
      </div>

      <MobileConversionBar pageTitle={article.title} category={article.category} />
    </div>
  );
}
