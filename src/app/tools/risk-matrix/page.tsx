'use client';

import React, { useState } from 'react';
import { BarChart3, AlertTriangle, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function RiskMatrixPage() {
  const [likelihood, setLikelihood] = useState(3);
  const [severity, setSeverity] = useState(3);

  const score = likelihood * severity;

  const getRiskLevel = (val: number) => {
    if (val >= 15) return { label: 'EKSTREM (Extreme Risk)', bg: 'bg-red-600', text: 'text-red-600', desc: 'Pekerjaan TIDAK BOLEH dimulai sampai risiko diturunkan ke level lebih rendah. Wajib tindakan darurat segera.' };
    if (val >= 10) return { label: 'TINGGI (High Risk)', bg: 'bg-orange-500', text: 'text-orange-500', desc: 'Memerlukan tindakan koreksi pengendalian risiko mendesak dan persetujuan tertulis dari pimpinan/manajemen.' };
    if (val >= 5) return { label: 'SEDANG (Medium Risk)', bg: 'bg-yellow-500', text: 'text-yellow-600', desc: 'Perlu tindakan pengendalian spesifik dan pemantauan berkala oleh pengawas lapangan.' };
    return { label: 'RENDAH (Low Risk)', bg: 'bg-emerald-500', text: 'text-emerald-600', desc: 'Risiko dapat diterima dengan prosedur kerja standar dan penggunaan APD wajib rutin.' };
  };

  const risk = getRiskLevel(score);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'Risk Matrix 5x5' }
            ]}
          />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Risk Matrix 5x5: Penilaian Risiko Bahaya K3 Online
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Alat bantu evaluasi risiko Keselamatan dan Kesehatan Kerja untuk dokumen HIRADC / IBPR berdasarkan standar ISO 45001 dan SMK3 PP 50/2012.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Controls */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-bold text-slate-900 text-sm block mb-2">
              1. Kemungkinan Terjadi (Likelihood)
            </label>
            <select
              value={likelihood}
              onChange={(e) => setLikelihood(Number(e.target.value))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800"
            >
              <option value={1}>1 - Sangat Jarang (Almost Impossible)</option>
              <option value={2}>2 - Jarang (Unlikely)</option>
              <option value={3}>3 - Mungkin (Possible)</option>
              <option value={4}>4 - Sering (Likely)</option>
              <option value={5}>5 - Sangat Sering (Almost Certain)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-900 text-sm block mb-2">
              2. Keparahan Akibat (Severity)
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800"
            >
              <option value={1}>1 - Tidak Signifikan (First Aid Only)</option>
              <option value={2}>2 - Ringan (Cedera Ringan / Medical Treatment)</option>
              <option value={3}>3 - Sedang (Hilang Hari Kerja / LTI)</option>
              <option value={4}>4 - Berat (Cacat Permanen / Kerusakan Besar)</option>
              <option value={5}>5 - Katastropik (Kematian / Fatality)</option>
            </select>
          </div>
        </div>

        {/* Risk Result Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs text-slate-500 font-semibold">Skor Tingkat Risiko</span>
              <div className="text-3xl font-extrabold text-slate-900 mt-0.5">
                Nilai: {score} / 25
              </div>
            </div>
            <div className={`px-4 py-2 rounded-xl text-white font-extrabold text-sm ${risk.bg}`}>
              {risk.label}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Rekomendasi Tindakan Pengendalian:</h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {risk.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
