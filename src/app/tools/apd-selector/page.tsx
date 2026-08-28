'use client';

import React, { useState } from 'react';
import { ShieldCheck, HardHat, Eye, Volume2, Footprints, Sparkles } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function APDSelectorPage() {
  const [jobType, setJobType] = useState('konstruksi');

  const apdGuide: Record<string, { title: string; apds: { name: string; standard: string; desc: string }[] }> = {
    konstruksi: {
      title: 'Proyek Konstruksi & Bangunan Gedung',
      apds: [
        { name: 'Safety Helmet (Helm Proyek)', standard: 'SNI ISO 3873 / ANSI Z89.1', desc: 'Melindungi kepala dari benturan benda jatuh dari ketinggian.' },
        { name: 'Safety Shoes (Sepatu Safety Steel Toe)', standard: 'SNI 7079 / EN ISO 20345', desc: 'Ujung baja tahan benturan 200J dan sol anti-paku.' },
        { name: 'High-Visibility Vest (Rompi Reflektif)', standard: 'EN ISO 20471', desc: 'Meningkatkan visibilitas pekerja di siang dan malam hari.' },
        { name: 'Full Body Harness Double Lanyard', standard: 'EN 361 / ANSI Z359.11', desc: 'Wajib untuk bekerja pada ketinggian > 1.8 meter.' }
      ]
    },
    pengelasan: {
      title: 'Pekerjaan Pengelasan & Pemotongan Logam (Hot Work)',
      apds: [
        { name: 'Welding Helmet (Kedok Las Auto-Darkening)', standard: 'ANSI Z87.1 / EN 175', desc: 'Melindungi mata & wajah dari radiasi infra-merah dan ultraviolet.' },
        { name: 'Leather Gloves (Sarung Tangan Las Kulit)', standard: 'EN 12477 Type A', desc: 'Tahan panas dan percikan terak logam cair.' },
        { name: 'Leather Apron / Jaket Las', standard: 'EN ISO 11611', desc: 'Perlindungan dada dan tubuh dari radiasi panas.' },
        { name: 'Respirator Las Partikulat (N95/FFP2)', standard: 'NIOSH / EN 149', desc: 'Menyaring asap logam beracun (fume).' }
      ]
    },
    kimia: {
      title: 'Penanganan Bahan Kimia Berbahaya (B3)',
      apds: [
        { name: 'Chemical Splash Goggles & Face Shield', standard: 'EN 166 3', desc: 'Mencegah cipratan zat asam/basa mengenai mata dan wajah.' },
        { name: 'Nitrile / Neoprene Chemical Gloves', standard: 'EN ISO 374-1', desc: 'Tahan penetrasi dan permeasi pelarut kimia keras.' },
        { name: 'Respirator Half-Face + Cartridge Organik/Asam', standard: 'NIOSH / EN 140', desc: 'Menyerap uap pelarut dan gas beracun.' },
        { name: 'Chemical Apron / Coverall Tychem', standard: 'EN 14605 Type 3/4', desc: 'Baju pelindung tahan tumpahan cairan kimia.' }
      ]
    },
    kebisingan: {
      title: 'Area Bising Mesin & Genset (>85 dBA)',
      apds: [
        { name: 'Ear Plug (Sumbat Telinga Busa/Silikon)', standard: 'NRR 25-33 dB / EN 352-2', desc: 'Meredam kebisingan hingga 25-30 dB untuk area pabrik.' },
        { name: 'Ear Muff (Penutup Telinga)', standard: 'NRR 27-31 dB / EN 352-1', desc: 'Perlindungan ekstra untuk kebisingan frekuensi tinggi.' }
      ]
    }
  };

  const current = apdGuide[jobType] || apdGuide.konstruksi;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'APD Selector Guide' }
            ]}
          />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Panduan Rekomendasi Alat Pelindung Diri (APD) K3
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Pilih jenis pekerjaan untuk melihat matriks APD wajib beserta standar SNI / EN / ANSI yang berlaku.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-wrap gap-2">
          {Object.keys(apdGuide).map((k) => (
            <button
              key={k}
              onClick={() => setJobType(k)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                jobType === k ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900">{current.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.apds.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                  <span className="bg-brand-100 text-brand-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                    {item.standard}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
