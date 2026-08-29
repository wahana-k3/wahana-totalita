'use client';

import React, { useState } from 'react';
import { MessageCircle, Calendar, Phone, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MobileConversionBarProps {
  pageTitle?: string;
  category?: string;
}

export default function MobileConversionBar({
  pageTitle = 'Pelatihan K3 & Sertifikasi',
  category = 'K3',
}: MobileConversionBarProps) {
  const [showScheduleSheet, setShowScheduleSheet] = useState(false);
  const defaultWaNumber = '6287759151278';

  const waText = `Halo Wahana Totalita, saya ingin informasi pendaftaran/jadwal untuk ${pageTitle} (${category}).`;
  const waUrl = `https://wa.me/${defaultWaNumber}?text=${encodeURIComponent(waText)}`;

  return (
    <>
      {/* Fixed Bottom Conversion Bar for Mobile (hidden on md and larger) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-4 py-3 shadow-[0_-8px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2.5 max-w-md mx-auto">
          {/* Secondary Quick Action: Jadwal & Info */}
          <button
            onClick={() => setShowScheduleSheet(true)}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
          >
            <Calendar className="w-4 h-4 text-slate-600" />
            <span>Jadwal &amp; Biaya</span>
          </button>

          {/* Primary High-Converting CTA: WhatsApp 1-Tap */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[1.4] bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xs py-3 px-4 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Konsultasi WA</span>
          </a>
        </div>
      </div>

      {/* Quick Schedule Drawer / Modal */}
      {showScheduleSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Jadwal &amp; Penawaran Resmi 2026
                </h3>
              </div>
              <button
                onClick={() => setShowScheduleSheet(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Dapatkan jadwal kelas terdekat (Online Zoom Interaktif maupun Tatap Muka di berbagai kota) beserta proposal silabus lengkap.
            </p>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-bold text-emerald-900">Keunggulan Wahana Totalita:</div>
              <ul className="text-xs text-emerald-800 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sertifikat Resmi Terakreditasi Kemnaker RI / BNSP</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instruktur Praktisi Senior &amp; Asesor Kompetensi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bimbingan Uji Kompetensi sampai Lulus</span>
                </li>
              </ul>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors text-center"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Dapatkan Jadwal via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
