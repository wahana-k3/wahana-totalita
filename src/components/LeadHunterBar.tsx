'use client';

import React, { useState } from 'react';
import { Phone, X, Sparkles, Send, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export default function LeadHunterBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('Ahli K3 Umum KEMNAKER');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');

  const programs = [
    'Ahli K3 Umum (AK3U) KEMNAKER RI',
    'Perpanjangan SKP & Lisensi K3',
    'Penyusunan Dokumen CSMS',
    'In-House Training Perusahaan',
    'Petugas Peran Kebakaran (Damkar)',
    'K3 Ketinggian & TKBT II',
    'Petugas P3K di Tempat Kerja',
    'Operator Forklift & Alat Berat',
    'Sertifikasi Personel BNSP',
  ];

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin Wahana Totalita,%0A%0ASaya ingin konsultasi / minta penawaran:%0A- *Program:* ${selectedProgram}%0A- *Nama:* ${fullName || '-'}${companyName ? `%0A- *Perusahaan:* ${companyName}` : ''}${phone ? `%0A- *No WA:* ${phone}` : ''}%0A%0AMohon info jadwal & biaya terbarunya. Terima kasih.`;
    window.open(`https://wa.me/6287759151278?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* ─── Single Unified Sexy 2026 Floating Action Button ───────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-slate-900/90 hover:bg-emerald-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl border border-slate-700/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-glow"
          aria-label="Konsultasi K3 Cepat"
        >
          {/* Live Pulsing Dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>

          <div className="flex flex-col text-left">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider leading-none">
              CS Online
            </span>
            <span className="text-xs font-extrabold text-white leading-tight">
              Konsultasi & Silabus
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white ml-1 shadow-sm">
            <Phone className="w-4 h-4 fill-current" />
          </div>
        </button>
      </div>

      {/* ─── Instant RFQ / Proposal Modal ─────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Respon Kilat &lt; 3 Menit
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                Minta Silabus & Penawaran K3
              </h3>
              <p className="text-xs text-slate-500">
                Pilih program kebutuhan Anda. Tim konsultan kami akan langsung mengirimkan jadwal dan proposal via WhatsApp.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSendWhatsApp} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Pilih Program / Layanan:</label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {programs.map((p, idx) => (
                    <option key={idx} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Lengkap:</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Perusahaan (Opsional):</label>
                  <input
                    type="text"
                    placeholder="Contoh: PT Bangun Bersama"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nomor WhatsApp Aktif:</label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim ke WhatsApp Konsultan</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Kerahasiaan Data Terjamin
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  Garansi Kelulusan 100%
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
