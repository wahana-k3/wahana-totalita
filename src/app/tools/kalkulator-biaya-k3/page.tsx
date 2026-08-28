'use client';

import React, { useState } from 'react';
import { Calculator, AlertTriangle, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function KalkulatorBiayaK3Page() {
  const [directCost, setDirectCost] = useState(10000000);
  const [icebergRatio, setIcebergRatio] = useState(4);

  const indirectCost = directCost * icebergRatio;
  const totalCost = directCost + indirectCost;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'Kalkulator Biaya Kerugian K3' }
            ]}
          />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kalkulator Biaya Kerugian Kecelakaan K3 (Teori Gunung Es)
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Estimasi kerugian nyata akibat insiden kerja, termasuk biaya tersembunyi (kerusakan alat, waktu investigasi, klaim, hingga reputasi bisnis).
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-600" />
            Biaya Langsung (Direct Cost)
          </h2>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Biaya Medis, Pengobatan & Santunan (Rp)</label>
            <input
              type="number"
              value={directCost}
              onChange={(e) => setDirectCost(Number(e.target.value) || 0)}
              className="w-full p-3 border border-slate-200 rounded-xl font-bold text-base text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Rasio Biaya Tidak Langsung (Iceberg Factor: 1 : 4 s/d 1 : 10)</label>
            <select
              value={icebergRatio}
              onChange={(e) => setIcebergRatio(Number(e.target.value))}
              className="w-full p-3 border border-slate-200 rounded-xl font-semibold text-slate-800"
            >
              <option value={2}>1 : 2 (Industri Ringan)</option>
              <option value={4}>1 : 4 (Manufaktur / Standar Heinrich)</option>
              <option value={6}>1 : 6 (Konstruksi & Proyek)</option>
              <option value={10}>1 : 10 (Migas & Pertambangan Berat)</option>
            </select>
          </div>
        </div>

        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-brand-400">Total Kerugian Nyata</h2>

          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-2xl">
              <div className="text-xs text-slate-400">Biaya Tidak Langsung (Kerusakan Mesin, Stop Produksi, dll.)</div>
              <div className="text-xl font-bold text-amber-400 mt-1">
                Rp {indirectCost.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl">
              <div className="text-xs text-slate-400">Total Kerugian Total (True Cost)</div>
              <div className="text-3xl font-extrabold text-white mt-1">
                Rp {totalCost.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
