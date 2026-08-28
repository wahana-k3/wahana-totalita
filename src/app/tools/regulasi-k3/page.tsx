'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Download, FileText } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function RegulasiK3Page() {
  const [search, setSearch] = useState('');

  const regulasiList = [
    { no: 'UU No. 1 Tahun 1970', tentang: 'Keselamatan Kerja', cat: 'Undang-Undang' },
    { no: 'PP No. 50 Tahun 2012', tentang: 'Penerapan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3)', cat: 'Peraturan Pemerintah' },
    { no: 'Permenaker No. 5 Tahun 2018', tentang: 'Keselamatan dan Kesehatan Kerja Lingkungan Kerja', cat: 'Permenaker' },
    { no: 'Permenaker No. 8 Tahun 2020', tentang: 'Keselamatan dan Kesehatan Kerja Pesawat Angkat dan Pesawat Angkut', cat: 'Permenaker' },
    { no: 'Permenaker No. 9 Tahun 2016', tentang: 'Keselamatan dan Kesehatan Kerja dalam Pekerjaan pada Ketinggian', cat: 'Permenaker' },
    { no: 'Permenaker No. 12 Tahun 2015', tentang: 'Keselamatan dan Kesehatan Kerja Listrik di Tempat Kerja', cat: 'Permenaker' },
    { no: 'Permenaker No. 15 Tahun 2008', tentang: 'Pertolongan Pertama pada Kecelakaan di Tempat Kerja (P3K)', cat: 'Permenaker' },
    { no: 'Kepmenaker No. 186/MEN/1999', tentang: 'Unit Penanggulangan Kebakaran di Tempat Kerja', cat: 'Kepmenaker' },
    { no: 'Permenaker No. 2 Tahun 1992', tentang: 'Tata Cara Penunjukan Kewajiban dan Wewenang Ahli Keselamatan dan Kesehatan Kerja', cat: 'Permenaker' },
    { no: 'PermenLHK No. 6 Tahun 2021', tentang: 'Tata Cara dan Persyaratan Pengelolaan Limbah Bahan Berbahaya dan Beracun (B3)', cat: 'PermenLHK' }
  ];

  const filtered = useMemo(() => {
    return regulasiList.filter(
      (r) =>
        search === '' ||
        r.no.toLowerCase().includes(search.toLowerCase()) ||
        r.tentang.toLowerCase().includes(search.toLowerCase()) ||
        r.cat.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'Database Regulasi K3' }
            ]}
          />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Database Regulasi & Dasar Hukum K3 Indonesia
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Kompilasi dasar hukum, Undang-Undang, Peraturan Pemerintah, dan Permenaker RI terkait Keselamatan Kerja.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="relative bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor regulasi atau kata kunci (contoh: PP 50, Ketinggian, Listrik, Kebakaran, B3)..."
            className="w-full pl-12 pr-4 py-3 bg-transparent text-sm focus:outline-none text-slate-800 font-medium"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-brand-700 text-sm">{item.no}</span>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.cat}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">{item.tentang}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
