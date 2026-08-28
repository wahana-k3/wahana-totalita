'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Search, Calendar } from 'lucide-react';
import incidentsData from '@/data/incidents.json';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function InsidenPage() {
  const [search, setSearch] = useState('');

  const filtered = incidentsData.filter(
    (i) =>
      search === '' ||
      (i.title && i.title.toLowerCase().includes(search.toLowerCase())) ||
      (i.summary && i.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Database Insiden K3' }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Database Kasus Kecelakaan Kerja & Analisis K3 Indonesia
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Kajian kronologi peristiwa kecelakaan industri nyata di Indonesia beserta analisis akar masalah dan tindakan pencegahannya.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari database kasus kecelakaan (contoh: Ketinggian, Kebakaran, Ledakan, Scaffolding, Tambang)..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inc) => (
            <div
              key={inc.id}
              className="bg-white border border-slate-200 hover:border-brand-500 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {inc.category || 'Insiden'}
                  </span>
                  <span>{inc.incident_date?.split(' ')[0] || '2026'}</span>
                </div>

                <Link href={`/insiden/${inc.slug}`}>
                  <h2 className="font-bold text-base text-slate-900 hover:text-brand-600 transition-colors line-clamp-2">
                    {inc.title}
                  </h2>
                </Link>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {inc.summary || 'Kajian investigasi insiden dan rekomendasi pencegahan agar kejadian serupa tidak terulang.'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link href={`/insiden/${inc.slug}`} className="font-bold text-brand-600 hover:underline">
                  Pelajari Kronologi & Solusi →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
