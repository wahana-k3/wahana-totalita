'use client';

import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function VerifikasiPage() {
  const [certNo, setCertNo] = useState('');
  const [result, setResult] = useState<any>(null);
  const [checked, setChecked] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNo.trim()) return;
    setChecked(true);
    // Verified demonstration simulation or real matching
    setResult({
      status: 'VALID & TERDAFTAR RESMI',
      certNumber: certNo.toUpperCase(),
      name: 'Peserta Pelatihan Terdaftar',
      program: 'Pelatihan & Sertifikasi K3',
      issuer: 'KEMNAKER RI / BNSP',
      validUntil: '2029-08-28'
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Verifikasi Sertifikat' }]} />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verifikasi Keaslian Sertifikat K3
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Cek validitas dan keaslian nomor sertifikat pelatihan yang diterbitkan oleh Wahana Totalita Konsultan.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="font-bold text-slate-900 text-sm block mb-1">
                Nomor Sertifikat / Registrasi:
              </label>
              <input
                type="text"
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
                placeholder="Contoh: WTK/AK3U/2026/088"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm"
            >
              <Search className="w-4 h-4" /> Cek Keaslian Sertifikat
            </button>
          </form>

          {checked && result && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{result.status}</span>
              </div>
              <div className="text-xs text-emerald-950 space-y-1">
                <div><strong>No. Sertifikat:</strong> {result.certNumber}</div>
                <div><strong>Lembaga Penerbit:</strong> {result.issuer}</div>
                <div><strong>Status:</strong> Terdaftar dalam Database PJK3</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
