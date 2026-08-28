'use client';

import React, { useState } from 'react';
import { Calculator, ShieldCheck, Info, RotateCcw } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function KalkulatorK3Page() {
  const [employees, setEmployees] = useState(100);
  const [workDays, setWorkDays] = useState(250);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [lostTimeInjuries, setLostTimeInjuries] = useState(2);
  const [lostWorkDays, setLostWorkDays] = useState(15);

  const totalManHours = employees * workDays * hoursPerDay;
  const frequencyRate = totalManHours > 0 ? (lostTimeInjuries * 1_000_000) / totalManHours : 0;
  const severityRate = totalManHours > 0 ? (lostWorkDays * 1_000_000) / totalManHours : 0;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'Kalkulator FR & SR' }
            ]}
          />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kalkulator K3: Frequency Rate (FR) & Severity Rate (SR)
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Hitung tingkat kekerapan (Frequency Rate) dan tingkat keparahan (Severity Rate) kecelakaan kerja berdasarkan standar 1.000.000 jam kerja orang (Kemenaker RI & OSHA).
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-600" />
            Parameter Data Perusahaan
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Jumlah Rata-rata Tenaga Kerja (Orang)</label>
              <input
                type="number"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value) || 0)}
                className="w-full p-3 border border-slate-200 rounded-xl font-semibold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hari Kerja / Tahun</label>
                <input
                  type="number"
                  value={workDays}
                  onChange={(e) => setWorkDays(Number(e.target.value) || 0)}
                  className="w-full p-3 border border-slate-200 rounded-xl font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Jam Kerja / Hari</label>
                <input
                  type="number"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value) || 0)}
                  className="w-full p-3 border border-slate-200 rounded-xl font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Jumlah Kasus Kecelakaan Hilang Hari Kerja (LTI)</label>
              <input
                type="number"
                value={lostTimeInjuries}
                onChange={(e) => setLostTimeInjuries(Number(e.target.value) || 0)}
                className="w-full p-3 border border-slate-200 rounded-xl font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Total Hari Kerja Hilang (Lost Workdays)</label>
              <input
                type="number"
                value={lostWorkDays}
                onChange={(e) => setLostWorkDays(Number(e.target.value) || 0)}
                className="w-full p-3 border border-slate-200 rounded-xl font-semibold text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="space-y-6">
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-brand-400">Hasil Perhitungan K3</h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <div className="text-xs text-slate-400">Total Jam Kerja Orang (Man-Hours)</div>
                <div className="text-2xl font-extrabold text-white mt-1">
                  {totalManHours.toLocaleString('id-ID')} Jam
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <div className="text-xs text-slate-400">Frequency Rate (FR)</div>
                <div className="text-3xl font-extrabold text-brand-400 mt-1">
                  {frequencyRate.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Kasus kecelakaan per 1.000.000 jam kerja</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <div className="text-xs text-slate-400">Severity Rate (SR)</div>
                <div className="text-3xl font-extrabold text-amber-400 mt-1">
                  {severityRate.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Hari kerja hilang per 1.000.000 jam kerja</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
            <strong>Rumus Resmi KEMNAKER RI:</strong>
            <div>• FR = (Jumlah Kasus LTI x 1.000.000) / Total Jam Kerja Orang</div>
            <div>• SR = (Jumlah Hari Hilang x 1.000.000) / Total Jam Kerja Orang</div>
          </div>
        </div>
      </div>
    </div>
  );
}
