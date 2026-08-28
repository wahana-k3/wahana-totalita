'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ShieldCheck, Clock, MapPin, Phone, Search } from 'lucide-react';
import trainingsData from '@/data/trainings.json';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function JadwalPage() {
  const [search, setSearch] = useState('');

  // Generate upcoming batch dates for 2026
  const batches = trainingsData.slice(0, 15).map((t, idx) => {
    const startDay = 5 + (idx % 20);
    const endDay = startDay + (t.duration_days || 3) - 1;
    return {
      id: idx + 1,
      name: t.name,
      slug: t.slug,
      certification: t.certification,
      mode: t.mode,
      date: `${startDay} - ${endDay} September 2026`,
      venue: t.mode === 'online' ? 'Online Interactive Zoom' : 'Hotel Grand Tjokro Yogyakarta',
      price: t.price,
      status: 'Pendaftaran Dibuka'
    };
  });

  const filtered = batches.filter(
    (b) =>
      search === '' ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.certification.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Jadwal Pelatihan 2026' }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Jadwal Pelatihan & Sertifikasi K3 2026
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Pilih jadwal pelatihan terdekat resmi KEMNAKER RI & BNSP. Tersedia kelas Online via Zoom dan Tatap Muka di Yogyakarta.
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
              placeholder="Cari jadwal pelatihan (contoh: Ahli K3 Umum, TOT, Listrik)..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-slate-200 hover:border-brand-500 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-bold px-2.5 py-0.5 rounded">
                    {b.certification}
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
                    {b.mode}
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {b.status}
                  </span>
                </div>

                <Link href={`/pelatihan/${b.slug}`}>
                  <h2 className="font-bold text-base sm:text-lg text-slate-900 hover:text-brand-600 transition-colors">
                    {b.name}
                  </h2>
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-brand-600" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.venue}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 shrink-0">
                <div className="text-left md:text-right">
                  <div className="text-[10px] text-slate-400">Investasi</div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {b.price > 0 ? `Rp ${Number(b.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                  </div>
                </div>

                <a
                  href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin daftar ${b.name} jadwal ${b.date}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 shadow-md shadow-brand-600/20 whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Daftar Batch Ini
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
