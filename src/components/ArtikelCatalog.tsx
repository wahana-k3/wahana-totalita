'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, ArrowRight, BookOpen, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { getAllArticles } from '@/lib/data/articles';
import Breadcrumbs from '@/components/Breadcrumbs';
import MobileConversionBar from '@/components/MobileConversionBar';

export default function ArtikelCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articlesList = getAllArticles();

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'K3', label: 'K3 & Keselamatan' },
    { id: 'Sertifikasi', label: 'Sertifikasi' },
    { id: 'Lingkungan', label: 'Lingkungan' },
    { id: 'Regulasi', label: 'Regulasi & Hukum' },
  ];

  const filteredArticles = useMemo(() => {
    return articlesList.filter((item) => {
      const matchCat =
        selectedCategory === 'all' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.meta_desc && item.meta_desc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [articlesList, searchQuery, selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header & Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Artikel & Edukasi K3' }]} />

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pusat Artikel, Panduan &amp; Edukasi K3 Indonesia
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Kumpulan artikel informatif mengenai regulasi Kementerian Ketenagakerjaan, standar BNSP, tips pencegahan kecelakaan kerja, dan implementasi SMK3 PP 50/2012.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Search & Filters Bar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik artikel (contoh: Ahli K3 Umum, CSMS, Limbah B3, APAR, PP 50/2012)..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800"
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

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs text-slate-500 px-1">
          Menampilkan <strong>{filteredArticles.length}</strong> artikel edukasi K3
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-slate-200 hover:border-emerald-500 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    {article.category || 'K3'}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Panduan Edukasi
                  </span>
                </div>

                <Link href={`/artikel/${article.slug}`}>
                  <h2 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h2>
                </Link>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {article.meta_desc || article.title}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-[11px]">{article.published_at || 'Terbaru'}</span>
                <Link
                  href={`/artikel/${article.slug}`}
                  className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Baca</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileConversionBar pageTitle="Pusat Artikel & Edukasi K3" category="Artikel" />
    </div>
  );
}
