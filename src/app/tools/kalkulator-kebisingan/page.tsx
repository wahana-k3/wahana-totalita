'use client';

import React, { useState } from 'react';
import { Volume2, AlertTriangle, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function KalkulatorKebisinganPage() {
  const [dBA, setDBA] = useState(88);
  const [exposureHours, setExposureHours] = useState(4);

  // Permenaker 5/2018 NAB Kebisingan: T = 8 / 2^((dBA - 85)/3)
  const maxAllowedHours = 8 / Math.pow(2, (dBA - 85) / 3);
  const noiseDose = (exposureHours / maxAllowedHours) * 100;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'Kalkulator Kebisingan' }
            ]}
          />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kalkulator Kebisingan & Noise Dose Permenaker 5/2018
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Hitung batas waktu pemaparan aman dan persentase dosis kebisingan harian berdasarkan Nilai Ambang Batas (NAB) 85 dBA.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-brand-600" />
            Parameter Pengukuran Suara
          </h2>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Tingkat Kebisingan Area (dBA)</label>
            <input
              type="number"
              value={dBA}
              onChange={(e) => setDBA(Number(e.target.value) || 0)}
              className="w-full p-3 border border-slate-200 rounded-xl font-bold text-base"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Durasi Paparan Pekerja (Jam / Hari)</label>
            <input
              type="number"
              step="0.5"
              value={exposureHours}
              onChange={(e) => setExposureHours(Number(e.target.value) || 0)}
              className="w-full p-3 border border-slate-200 rounded-xl font-bold text-base"
            />
          </div>
        </div>

        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-brand-400">Hasil Analisis Kebisingan</h2>

          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-2xl">
              <div className="text-xs text-slate-400">Waktu Paparan Maksimal yang Diizinkan</div>
              <div className="text-2xl font-extrabold text-white mt-1">
                {maxAllowedHours >= 1 ? `${maxAllowedHours.toFixed(2)} Jam / hari` : `${(maxAllowedHours * 60).toFixed(0)} Menit / hari`}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl">
              <div className="text-xs text-slate-400">Noise Dose Harian</div>
              <div className={`text-3xl font-extrabold mt-1 ${noiseDose > 100 ? 'text-red-400' : 'text-emerald-400'}`}>
                {noiseDose.toFixed(1)}%
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {noiseDose > 100 ? '⚠️ MELEBIHI NAB! Wajib Ear Muff / Pengendalian Teknis.' : '✅ Di Bawah Batas Maksimal.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
