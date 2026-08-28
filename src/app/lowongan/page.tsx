import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Building2, Calendar, Phone } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function LowonganPage() {
  const jobs = [
    { title: 'HSE Officer Konstruksi Gedung', company: 'Kontraktor BUMN Utama', loc: 'Jakarta & IKN', exp: 'Min. 2 Tahun', date: 'Aktif' },
    { title: 'Safety Inspector Pertambangan', company: 'Mining Contractor', loc: 'Kalimantan Timur', exp: 'Min. POP BNSP', date: 'Aktif' },
    { title: 'Ahli K3 Listrik Industri', company: 'Pabrik Manufaktur Makanan', loc: 'Cikarang / Karawang', exp: 'Sertifikat Kemnaker', date: 'Aktif' },
    { title: 'Petugas Pengelolaan Limbah B3', company: 'Industri Kimia & Farmasi', loc: 'Cilegon, Banten', exp: 'Min. D3 / POPAL', date: 'Aktif' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Lowongan Kerja HSE & K3' }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Info Lowongan Kerja HSE & Safety Officer Terbaru
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Peluang karir bagi alumni sertifikasi KEMNAKER RI dan BNSP di berbagai sektor industri.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((j, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-brand-600 font-bold">
                  <span>{j.company}</span>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{j.date}</span>
                </div>
                <h2 className="text-base font-bold text-slate-900">{j.title}</h2>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {j.loc}</div>
                  <div className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {j.exp}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Jalur Khusus Alumni</span>
                <a
                  href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin informasi loker HSE: ${j.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Lamar via Admin
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
