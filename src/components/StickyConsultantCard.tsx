'use client';

import React from 'react';
import { MessageCircle, ShieldCheck, Clock, Award, CheckCircle2, ChevronRight } from 'lucide-react';

interface StickyConsultantCardProps {
  topicTitle: string;
  category?: string;
  sourceType?: 'artikel' | 'pelatihan' | 'service' | 'csms';
}

export default function StickyConsultantCard({
  topicTitle,
  category = 'K3',
  sourceType = 'pelatihan',
}: StickyConsultantCardProps) {
  const defaultWaNumber = '6287759151278';
  
  const getContextualText = () => {
    if (sourceType === 'artikel') {
      return `Halo Wahana Totalita, saya sedang membaca artikel "${topicTitle}" dan ingin konsultasi program pelatihan/layanan terkait untuk perusahaan saya.`;
    }
    if (sourceType === 'csms') {
      return `Halo Wahana Totalita, saya membutuhkan konsultasi dan pendampingan dokumen CSMS (Contractor Safety Management System) untuk perusahaan kami.`;
    }
    return `Halo Wahana Totalita, saya tertarik mendaftar program "${topicTitle}" (${category}). Mohon info jadwal terdekat, silabus, dan biaya investasinya.`;
  };

  const waUrl = `https://wa.me/${defaultWaNumber}?text=${encodeURIComponent(getContextualText())}`;

  return (
    <div className="sticky top-24 bg-white rounded-3xl border border-emerald-100 shadow-xl p-6 space-y-5 overflow-hidden group hover:border-emerald-300 transition-all">
      {/* Decorative Emerald Accent Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

      {/* Consultant Status Header */}
      <div className="flex items-center gap-3.5 pt-1">
        <div className="relative">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-900 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
            WT
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-extrabold text-slate-900 text-sm">Konsultan K3 Senior</h4>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Tim Ahli Resmi &bull; Layanan Konsultasi Aktif
          </p>
        </div>
      </div>

      {/* Value Proposition Box */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2 text-xs">
        <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider text-emerald-800">
          Layanan Konsultasi Resmi:
        </div>
        <ul className="space-y-1.5 text-slate-600">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Jadwal &amp; Biaya Terupdate 2026</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Penawaran In-House Training PT</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Silabus Resmi BNSP / Kemnaker</span>
          </li>
        </ul>
      </div>

      {/* Target Topic Context Box */}
      <div className="text-xs text-slate-500 bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
        <span className="font-semibold text-emerald-900 block mb-0.5">Topik Konsultasi:</span>
        <span className="line-clamp-2 text-slate-700 font-medium">{topicTitle}</span>
      </div>

      {/* High-Converting CTA Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-500 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span>Chat WhatsApp Konsultan</span>
      </a>

      <p className="text-[10px] text-center text-slate-400 leading-tight">
        Gratis konsultasi kebutuhan sertifikasi &amp; kepatuhan regulasi K3 perusahaan Anda.
      </p>
    </div>
  );
}
