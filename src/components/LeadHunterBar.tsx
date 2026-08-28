'use client';

import React, { useState, useEffect } from 'react';
import { Phone, FileText, Sparkles, X, ChevronRight, ShieldCheck, Clock } from 'lucide-react';

export default function LeadHunterBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('Ahli K3 Umum');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo Tim Sales Wahana Totalita, saya dari ${companyName || 'Perusahaan'} ingin meminta penawaran harga & silabus resmi untuk program ${selectedProgram}.`;
    window.open(`https://wa.me/6287759151278?text=${encodeURIComponent(msg)}`, '_blank');
    setShowQuickForm(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* ─── Floating Lead Hunter Trigger (Desktop Bottom-Right & Mobile Bottom Bar) ──────────────── */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Floating Quick Action Pill */}
        <div className="hidden sm:flex items-center gap-3 bg-slate-950/95 text-white border border-emerald-500/40 p-2.5 pl-4 rounded-full shadow-2xl backdrop-blur-md transition-all hover:scale-105">
          <div className="flex items-center gap-2 text-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-400">CS Online</span>
            <span className="text-slate-400 text-[11px]">• Respon &lt; 3 Menit</span>
          </div>

          <button
            onClick={() => setShowQuickForm(true)}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md shadow-emerald-950/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Minta Penawaran / Silabus</span>
          </button>
        </div>

        {/* Sticky Mobile Conversion Bar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-slate-800 p-2.5 px-4 flex items-center justify-between gap-2 z-50 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              PJK3 Resmi Kemnaker RI
            </div>
            <div className="text-xs font-extrabold text-white">Konsultasi K3 2026</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuickForm(true)}
              className="bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold px-3 py-2 rounded-lg"
            >
              Proposal
            </button>
            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pelatihan%20K3"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1 shadow-lg shadow-emerald-950"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              Chat WA
            </a>
          </div>
        </div>
      </div>

      {/* ─── Fast Proposal & Lead Modal ────────────────────────────── */}
      {showQuickForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
            <button
              onClick={() => setShowQuickForm(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Resmi PJK3 KEMNAKER RI & BNSP
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                Minta Penawaran & Silabus Resmi
              </h3>
              <p className="text-xs text-slate-300">
                Dapatkan proposal penawaran resmi, silabus lengkap, dan jadwal pelatihan batch terdekat dalam hitungan menit via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleQuickInquiry} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nama Perusahaan / Instansi (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: PT Bangun Nusantara Jaya"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Pilih Program yang Diminati
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Ahli K3 Umum (KEMNAKER RI)">Ahli K3 Umum (KEMNAKER RI)</option>
                  <option value="Ahli K3 Konstruksi (KEMNAKER RI)">Ahli K3 Konstruksi (KEMNAKER RI)</option>
                  <option value="Petugas & Regu Damkar K3 (Kelas D/C/B/A)">Petugas & Regu Damkar K3 (Kelas D/C/B/A)</option>
                  <option value="Pelatihan K3 Ketinggian & Scaffolding">Pelatihan K3 Ketinggian & Scaffolding</option>
                  <option value="Petugas P3K di Tempat Kerja">Petugas P3K di Tempat Kerja</option>
                  <option value="Perpanjangan SKP & Lisensi K3">Perpanjangan SKP & Lisensi K3</option>
                  <option value="Penyusunan Dokumen CSMS">Penyusunan Dokumen CSMS</option>
                  <option value="In-House Training Perusahaan">In-House Training Khusus Perusahaan</option>
                  <option value="Program Sertifikasi BNSP Lainnya">Program Sertifikasi BNSP Lainnya</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Kirim via WhatsApp Sekarang
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Konsultan kami standby dan membalas dalam 1–5 menit</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
