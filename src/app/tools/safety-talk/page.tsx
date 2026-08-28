'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Printer,
  Share2,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  ShieldCheck,
  X,
  Sparkles,
  Download,
  Filter
} from 'lucide-react';
import safetyTalksData from '@/data/safety_talks.json';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function SafetyTalkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTalk, setActiveTalk] = useState<typeof safetyTalksData[0] | null>(null);

  // Print mode state
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printForm, setPrintForm] = useState({
    company: 'PT. WAHANA TOTALITA KONSULTAN',
    project: 'Proyek / Fasilitas Operasional',
    location: 'Area Kerja Utama',
    supervisor: 'Supervisor / HSE Officer',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    { id: 'all', label: 'Semua (100)' },
    { id: 'umum', label: 'Umum & Budaya K3' },
    { id: 'ketinggian', label: 'Ketinggian' },
    { id: 'kebakaran', label: 'Kebakaran' },
    { id: 'listrik', label: 'Listrik' },
    { id: 'kimia', label: 'Kimia & B3' },
    { id: 'kesehatan', label: 'Kesehatan & Ergonomi' },
    { id: 'alatberat', label: 'Alat Berat & Rigging' },
    { id: 'tambang', label: 'Pertambangan' },
    { id: 'lingkungan', label: 'Lingkungan' },
    { id: 'teknologi', label: 'Teknologi & AI' },
  ];

  const filteredTalks = useMemo(() => {
    return safetyTalksData.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.id.toString() === searchQuery.trim();
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ─── Breadcrumbs & Header ────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: '100 Materi Safety Talk' }
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200 text-brand-700 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Database Lengkap 100 Topik Toolbox Meeting (TBM) 2026
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                100 Materi Safety Talk Harian K3: Singkat, Jelas + Absensi
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Koleksi materi briefing keselamatan kerja harian 5 menit. Dilengkapi fakta risiko kecelakaan, pertanyaan diskusi tim, langkah aksi lapangan, dan formulir cetak daftar hadir absensi.
              </p>
            </div>

            {/* Quick Stats / Action */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              <button
                onClick={() => {
                  if (filteredTalks.length > 0) setActiveTalk(filteredTalks[0]);
                  setIsPrintModalOpen(true);
                }}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4" />
                Cetak Lembar Absensi
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* ─── Search & Category Filters ───────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik safety talk (contoh: APD, Ketinggian, LOTO, Scaffolding, Kebakaran, #15)..."
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

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
            Menampilkan <strong>{filteredTalks.length}</strong> dari 100 topik materi
          </div>
          {searchQuery && (
            <div>
              Filter pencarian: <em>&ldquo;{searchQuery}&rdquo;</em>
            </div>
          )}
        </div>

        {/* ─── Grid of 100 Safety Talk Cards ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalks.map((talk) => (
            <div
              key={talk.id}
              onClick={() => setActiveTalk(talk)}
              className="bg-white border border-slate-200 hover:border-brand-500 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-brand-50 text-brand-700 font-extrabold text-xs px-2.5 py-1 rounded-md border border-brand-200">
                    Topik #{talk.id}
                  </span>
                  <span className="capitalize text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {talk.category}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {talk.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {talk.description}
                </p>

                {talk.statistic && (
                  <div className="bg-amber-50/70 border border-amber-200/60 rounded-lg p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{talk.statistic}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {talk.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                  Buka Detail →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Modal Detail Popup ────────────────────────────────── */}
      {activeTalk && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 relative">
            {/* Close Button */}
            <button
              onClick={() => setActiveTalk(null)}
              className="absolute right-5 top-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span className="bg-brand-100 text-brand-800 text-xs font-bold px-2.5 py-1 rounded-md">
                  Materi #{activeTalk.id}
                </span>
                <span className="capitalize text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {activeTalk.category}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {activeTalk.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeTalk.description}
              </p>
            </div>

            {/* Statistic */}
            {activeTalk.statistic && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold mb-0.5">Fakta Risiko & Statistik K3:</div>
                  <div>{activeTalk.statistic}</div>
                </div>
              </div>
            )}

            {/* Poin Diskusi Interaktif */}
            {activeTalk.discussion_points && activeTalk.discussion_points.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-600" />
                  Poin Pertanyaan & Diskusi Briefing (Tanyakan ke Tim):
                </h4>
                <ul className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs sm:text-sm text-slate-700">
                  {activeTalk.discussion_points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Langkah Aksi Lapangan */}
            {activeTalk.action_steps && activeTalk.action_steps.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Langkah Tindakan Aman Wajib Hari Ini:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeTalk.action_steps.map((st, i) => (
                    <div key={i} className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setIsPrintModalOpen(true);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Cetak Lembar Hadir (Absensi)
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Materi Safety Talk K3 Hari Ini: *${activeTalk.title}*\n\n${activeTalk.description}\n\nBaca selengkapnya di: https://wahanatotalita.com/tools/safety-talk`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share ke Grup WA
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── Printable Attendance Sheet Modal ─────────────────── */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto no-print">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">Konfigurasi Lembar Absensi Safety Talk</h3>
                <p className="text-xs text-slate-500">Sesuaikan nama perusahaan & lokasi sebelum dicetak/disimpan ke PDF</p>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Perusahaan / Kontraktor</label>
                <input
                  type="text"
                  value={printForm.company}
                  onChange={(e) => setPrintForm({ ...printForm, company: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Proyek / Site</label>
                <input
                  type="text"
                  value={printForm.project}
                  onChange={(e) => setPrintForm({ ...printForm, project: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Lokasi / Area Kerja</label>
                <input
                  type="text"
                  value={printForm.location}
                  onChange={(e) => setPrintForm({ ...printForm, location: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pimpinan Briefing (Supervisor / HSE)</label>
                <input
                  type="text"
                  value={printForm.supervisor}
                  onChange={(e) => setPrintForm({ ...printForm, supervisor: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Printer className="w-4 h-4" />
                Cetak / Simpan PDF Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Hidden Printable Document (Appears only when printed) ── */}
      <div id="printable-sheet" className="hidden print:block text-black p-4 font-sans text-xs">
        <div className="border-b-2 border-black pb-3 mb-4 flex justify-between items-start">
          <div>
            <h1 className="text-base font-extrabold uppercase tracking-wide">{printForm.company}</h1>
            <h2 className="text-sm font-bold">FORMULIR DAFTAR HADIR TOOLBOX MEETING (TBM) / SAFETY TALK</h2>
            <div className="text-[10px] text-gray-600 mt-1">Standar Dokumen SMK3 PP 50/2012 & CSMS</div>
          </div>
          <div className="text-right text-[10px] space-y-0.5">
            <div><strong>Tanggal:</strong> {printForm.date}</div>
            <div><strong>Waktu:</strong> Pagi / Shift Awal</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border border-black p-3 mb-4 text-[11px]">
          <div>
            <div><strong>Proyek / Divisi:</strong> {printForm.project}</div>
            <div><strong>Lokasi / Area:</strong> {printForm.location}</div>
          </div>
          <div>
            <div><strong>Topik Briefing:</strong> #{activeTalk?.id || '1'} - {activeTalk?.title || 'Penggunaan APD yang Benar'}</div>
            <div><strong>Pimpinan Briefing:</strong> {printForm.supervisor}</div>
          </div>
        </div>

        {activeTalk && (
          <div className="border border-black p-3 mb-4 text-[10px] space-y-1">
            <div><strong>Ringkasan Materi:</strong> {activeTalk.description}</div>
            {activeTalk.statistic && <div><strong>Fakta Bahaya:</strong> {activeTalk.statistic}</div>}
            {activeTalk.action_steps && (
              <div>
                <strong>Langkah Wajib:</strong> {activeTalk.action_steps.join('; ')}
              </div>
            )}
          </div>
        )}

        <h3 className="font-bold text-xs mb-2 uppercase">Daftar Kehadiran Peserta Briefing:</h3>
        <table className="w-full border-collapse border border-black text-[10px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-1.5 w-8 text-center">No</th>
              <th className="border border-black p-1.5 text-left">Nama Lengkap Pekerja</th>
              <th className="border border-black p-1.5 text-left w-36">Jabatan / Posisi</th>
              <th className="border border-black p-1.5 text-center w-24">Tanda Tangan</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(15)].map((_, i) => (
              <tr key={i} className="h-6">
                <td className="border border-black text-center">{i + 1}</td>
                <td className="border border-black px-2"></td>
                <td className="border border-black px-2"></td>
                <td className="border border-black px-2 text-center text-gray-300 font-mono text-[9px]">{i + 1}.</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between text-[10px] text-center pt-2">
          <div className="w-48">
            <div>Dibuat Oleh (HSE / Supervisor):</div>
            <div className="h-12"></div>
            <div className="border-t border-black font-bold">({printForm.supervisor})</div>
          </div>
          <div className="w-48">
            <div>Diketahui Oleh (Site Manager):</div>
            <div className="h-12"></div>
            <div className="border-t border-black font-bold">(..................................................)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
