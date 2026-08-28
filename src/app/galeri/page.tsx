'use client';

import React, { useState } from 'react';
import { Camera, ShieldCheck, MapPin, Calendar, CheckCircle2, X, ZoomIn, Phone } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import galleryData from '@/data/gallery.json';

export default function GaleriPage() {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

  const categories = [
    { id: 'ALL', label: 'Semua Dokumentasi (67)' },
    { id: 'SERTIFIKASI', label: 'Sertifikasi Kemnaker' },
    { id: 'BNSP', label: 'Uji Kompetensi BNSP' },
    { id: 'FIRE', label: 'Damkar & Kebakaran' },
    { id: 'HEIGHT', label: 'Ketinggian & Scaffolding' },
    { id: 'P3K', label: 'P3K & First Aid' },
    { id: 'INHOUSE', label: 'In-House Perusahaan' },
  ];

  const filtered = galleryData.filter((p) => selectedCat === 'ALL' || p.cat === selectedCat);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ─── Lightbox Modal ──────────────────────────────────── */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full transition-colors"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {activePhoto.cat} • {activePhoto.loc}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {activePhoto.title}
                </h3>
              </div>

              <a
                href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya tertarik mendaftar pelatihan setelah melihat foto kegiatan "${activePhoto.title}"`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                Daftar Pelatihan Ini
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── Header & Breadcrumbs ────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Galeri Foto & Dokumentasi' }]} />

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3 font-display">
              <Camera className="w-8 h-8 text-emerald-600" />
              Galeri Dokumentasi & Kegiatan Pelatihan K3
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dokumentasi nyata kegiatan pembinaan KEMNAKER RI, uji kompetensi BNSP, simulasi tanggap darurat pemadaman kebakaran, dan pelatihan in-house di berbagai kota seluruh Indonesia.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCat === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Menampilkan <strong>{filtered.length}</strong> dokumentasi kegiatan resmi
        </div>

        {/* Full Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden relative bg-slate-900">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 bg-white/90 text-slate-900 rounded-full shadow-lg">
                    <ZoomIn className="w-5 h-5 text-emerald-700" />
                  </div>
                </div>
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-slate-900/80 backdrop-blur-sm text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded">
                    {photo.cat}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                  {photo.title}
                </h3>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{photo.loc}</span>
                  </div>
                  <span className="font-semibold text-slate-500">Foto Resmi</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Bottom Lead Consultation Box ─────────────────── */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
              Penyelenggara Pelatihan K3 Terpercaya
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Ingin Menyelenggarakan Pembinaan K3 di Lokasi / Perusahaan Anda?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Kami menyediakan instruktur bersertifikasi KEMNAKER RI & BNSP, modul resmi, perlengkapan simulasi praktek lengkap, dan jaminan kelulusan.
            </p>
          </div>

          <a
            href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20tertarik%20mengadakan%20pelatihan%20K3%20in-house%20perusahaan"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/30 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 fill-current" />
            Konsultasi In-House Training
          </a>
        </div>
      </div>
    </div>
  );
}
