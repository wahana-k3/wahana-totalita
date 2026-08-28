'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import articlesData from '@/data/articles.json';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ArtikelIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'K3', label: 'K3 & Keselamatan' },
    { id: 'Sertifikasi', label: 'Sertifikasi' },
    { id: 'Lingkungan', label: 'Lingkungan' },
    { id: 'Regulasi', label: 'Regulasi & Hukum' },
  ];

  const filteredArticles = useMemo(() => {
    return articlesData.filter((item) => {
      const matchCat =
        selectedCategory === 'all' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.meta_desc && item.meta_desc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ─── Header & Breadcrumbs ────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Artikel & Edukasi K3' }]} />

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pusat Artikel, Panduan & Edukasi K3 Indonesia
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Kumpulan artikel informatif mengenai regulasi Kementerian Ketenagakerjaan, standar BNSP, tips pencegahan kecelakaan kerja, dan implementasi SMK3 PP 50/2012.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* ─── Search & Filters Bar ────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik artikel (contoh: Ahli K3 Umum, SMK3, LOTO, Limbah B3, APD)..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Results Counter ─────────────────────────────────── */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div>
            Menampilkan <strong>{filteredArticles.length}</strong> artikel terpublikasi
          </div>
        </div>

        {/* ─── Articles Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="inline-block bg-brand-50 text-brand-700 border border-brand-200 text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {art.category || 'K3'}
                </span>

                <Link href={`/artikel/${art.slug}`}>
                  <h2 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h2>
                </Link>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {art.meta_desc || 'Panduan lengkap dan informasi regulasi K3 di Indonesia oleh tim konsultan Wahana Totalita.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[150px]">{art.author || 'Wahana Totalita'}</span>
                <Link
                  href={`/artikel/${art.slug}`}
                  className="font-bold text-brand-600 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  Baca →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
