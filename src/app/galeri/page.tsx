'use client';

import React, { useState } from 'react';
import { Camera, ShieldCheck, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function GaleriPage() {
  const [selectedCat, setSelectedCat] = useState('ALL');

  const photos = [
    { src: '/images/galeri/PELATIHAN DAMKAR.JPG', title: 'Simulasi Pemadaman Kebakaran & Penggunaan APAR / Hydrant', cat: 'FIRE', loc: 'Yogyakarta' },
    { src: '/images/galeri/IMG_1945.JPG', title: 'Praktek Bekerja pada Ketinggian & Inspeksi Full Body Harness', cat: 'HEIGHT', loc: 'Yogyakarta' },
    { src: '/images/galeri/DSC_0100.JPG', title: 'Pembinaan & Sertifikasi Ahli K3 Umum KEMNAKER RI Batch 2026', cat: 'SERTIFIKASI', loc: 'Hotel Grand Tjokro' },
    { src: '/images/galeri/FOTO BARENG ada ibu sopian nor.jpg', title: 'Sesi Uji Kompetensi Asesor LSP BNSP & Kelulusan Peserta', cat: 'BNSP', loc: 'TUK Wahana Totalita' },
    { src: '/images/galeri/IMG_0013.JPG', title: 'Praktek Lapangan Pertolongan Pertama Pada Kecelakaan (P3K)', cat: 'P3K', loc: 'Training Center' },
    { src: '/images/galeri/IMG_0035.JPG', title: 'Simulasi Evakuasi Darurat & Resusitasi Jantung Paru (CPR)', cat: 'P3K', loc: 'Yogyakarta' },
    { src: '/images/galeri/IMG_1868.JPG', title: 'Pemeriksaan Alat Pelindung Diri (APD) & Job Safety Analysis', cat: 'INHOUSE', loc: 'Workshop Lapangan' },
    { src: '/images/galeri/IMG_1910.JPG', title: 'Sesi Diskusi Kelas & Pemaparan Regulasi PP 50/2012', cat: 'SERTIFIKASI', loc: 'Ruang Seminar' },
    { src: '/images/galeri/DSC_0121.JPG', title: 'Pemberian Sertifikat Kompetensi & Lisensi K3', cat: 'BNSP', loc: 'Yogyakarta' },
    { src: '/images/galeri/DSC_0157.JPG', title: 'Praktek Pengukuran Faktor Fisik & Lingkungan Kerja', cat: 'INHOUSE', loc: 'Area Pabrik' },
    { src: '/images/galeri/DSC_0171.JPG', title: 'Pelatihan Scaffolding & Inspeksi Perancah Konstruksi', cat: 'HEIGHT', loc: 'Site Project' },
    { src: '/images/galeri/DSC_0282.JPG', title: 'Foto Bersama Instruktur Senior Kemnaker RI & Peserta Pelatihan', cat: 'SERTIFIKASI', loc: 'Yogyakarta' }
  ];

  const categories = [
    { id: 'ALL', label: 'Semua Dokumentasi' },
    { id: 'SERTIFIKASI', label: 'Sertifikasi Kemnaker & BNSP' },
    { id: 'FIRE', label: 'Damkar & Kebakaran' },
    { id: 'HEIGHT', label: 'Ketinggian & Scaffolding' },
    { id: 'P3K', label: 'P3K & First Aid' },
    { id: 'INHOUSE', label: 'In-House Perusahaan' },
  ];

  const filtered = photos.filter((p) => selectedCat === 'ALL' || p.cat === selectedCat);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ─── Header & Breadcrumbs ────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Galeri Foto & Dokumentasi' }]} />

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <Camera className="w-8 h-8 text-emerald-600" />
              Galeri Dokumentasi & Kegiatan Pelatihan K3
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dokumentasi nyata kegiatan pembinaan KEMNAKER RI, uji kompetensi BNSP, simulasi tanggap darurat pemadaman kebakaran, dan pelatihan in-house di berbagai kota.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCat === cat.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all group flex flex-col justify-between"
            >
              <div className="h-64 overflow-hidden relative bg-slate-100">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {photo.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{photo.loc}</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                    Dokumentasi Resmi
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
