'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  Calendar,
  Clock,
  Award,
  Filter,
  ArrowRight,
  Phone,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { getAllTrainings } from '@/lib/data/trainings';
import Breadcrumbs from '@/components/Breadcrumbs';
import MobileConversionBar from '@/components/MobileConversionBar';
import { getTrainingPhoto } from '@/lib/trainingImages';

export default function PelatihanCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState('all');

  const trainingsList = getAllTrainings();

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'k3', label: 'K3 (Keselamatan Kerja)' },
    { id: 'system-management', label: 'Sistem Manajemen & ISO' },
    { id: 'lingkungan', label: 'Lingkungan & Limbah B3' },
    { id: 'mining', label: 'Pertambangan (Mining)' },
  ];

  const filteredTrainings = useMemo(() => {
    return trainingsList.filter((item) => {
      const matchCat =
        selectedCategory === 'all' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchCert =
        selectedCert === 'all' ||
        (selectedCert === 'kemnaker' && item.certification.toLowerCase().includes('kemnaker')) ||
        (selectedCert === 'bnsp' && item.certification.toLowerCase().includes('bnsp'));
      const matchSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchCert && matchSearch;
    });
  }, [trainingsList, searchQuery, selectedCategory, selectedCert]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header & Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Katalog Pelatihan & Sertifikasi' }]} />

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Katalog Pelatihan K3 &amp; Sertifikasi BNSP / KEMNAKER RI
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Jelajahi 100+ program pembinaan, pelatihan profesi, dan sertifikasi resmi terakreditasi untuk individu, instansi pemerintah, dan korporasi.
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
              placeholder="Cari nama pelatihan (contoh: Ahli K3 Umum, TOT Instruktur, POP Tambang, Scaffolding)..."
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

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
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

            {/* Cert Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Lembaga:</span>
              <select
                value={selectedCert}
                onChange={(e) => setSelectedCert(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Semua Sertifikasi</option>
                <option value="kemnaker">KEMNAKER RI</option>
                <option value="bnsp">BNSP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div>
            Menampilkan <strong>{filteredTrainings.length}</strong> program pelatihan
          </div>
        </div>

        {/* Trainings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map((item) => {
            const photoUrl = getTrainingPhoto(item.slug, (item as any).image_path);
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <Link href={`/pelatihan/${item.slug}`} className="block relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={photoUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {item.certification}
                      </span>
                      <span className="text-[11px] font-semibold text-white capitalize bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs">
                        {item.mode}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 space-y-3">
                    <Link href={`/pelatihan/${item.slug}`}>
                      <h2 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {item.name}
                      </h2>
                    </Link>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 font-semibold">
                      <div>⏱️ <strong>{item.duration_days} Hari</strong></div>
                      <div>📜 Masa Berlaku <strong>{item.validity_months || 36} Bulan</strong></div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-auto border-t border-slate-100 flex items-center justify-between gap-2 pt-4">
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Investasi Mulai</div>
                    <div className="font-extrabold text-slate-900 text-base">
                      {item.price > 0 ? `Rp ${Number(item.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/pelatihan/${item.slug}`}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
                    >
                      Detail
                    </Link>
                    <a
                      href={`https://wa.me/6287759151278?text=${encodeURIComponent(
                        item.wa_text || `Halo Wahana Totalita, saya tertarik daftar ${item.name}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Daftar
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MobileConversionBar pageTitle="Katalog Pelatihan & Sertifikasi K3" category="Katalog" />
    </div>
  );
}
