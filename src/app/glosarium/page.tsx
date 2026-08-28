'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';
import glossaryData from '@/data/glossary.json';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function GlosariumPage() {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');

  const letters = ['ALL', ...Array.from(new Set(glossaryData.map((g) => g.term[0].toUpperCase()))).sort()];

  const filtered = useMemo(() => {
    return glossaryData.filter((g) => {
      const matchLetter = selectedLetter === 'ALL' || g.term[0].toUpperCase() === selectedLetter;
      const matchSearch =
        search === '' ||
        g.term.toLowerCase().includes(search.toLowerCase()) ||
        g.definition.toLowerCase().includes(search.toLowerCase());
      return matchLetter && matchSearch;
    });
  }, [search, selectedLetter]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Glosarium K3' }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Glosarium Istilah & Regulasi K3 Indonesia
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Kamus komprehensif 180+ terminologi Keselamatan dan Kesehatan Kerja (HSE), singkatan teknis, dan rujukan hukum resmi.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari istilah K3 (contoh: LOTO, CSMS, APD, HIRADC, PAK, SMK3)..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
            {letters.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLetter(l)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  selectedLetter === l
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((g) => (
            <div
              key={g.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded">
                  {g.category || 'K3'}
                </span>
                <Link href={`/glosarium/${g.slug}`}>
                  <h2 className="font-bold text-base text-slate-900 hover:text-brand-600 transition-colors">
                    {g.term}
                  </h2>
                </Link>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {g.definition}
                </p>
              </div>

              {g.regulation && (
                <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2 truncate">
                  📜 {g.regulation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
