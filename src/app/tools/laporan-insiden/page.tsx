'use client';

import React, { useState } from 'react';
import { AlertCircle, Printer } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function LaporanInsidenPage() {
  const [formData, setFormData] = useState({
    title: 'Kejadian Pekerja Terpeleset di Area Gudang',
    date: new Date().toISOString().split('T')[0],
    category: 'Near Miss / Hampir Celaka',
    chronology: 'Pada pukul 09.30 WIB, seorang pekerja forklift melihat ceceran oli di lantai lorong B. Seorang operator pejalan kaki hampir terpeleset namun sempat berpegangan pada tiang rak.',
    cause: 'Penyebab langsung: Ceceran oli pelumas dari kebocoran hidrolik forklift. Akar masalah: Pemeriksaan pra-harian (P2H) forklift terlewatkan.',
    actions: '1. Area segera dibersihkan menggunakan absorbent pad.\n2. Forklift ditarik untuk perbaikan seal hidrolik.\n3. Dilakukan briefing safety talk tentang pentingnya P2H.'
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'Form Laporan Insiden' }
            ]}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Formulir Laporan & Investigasi Insiden K3
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Catat kronologi kejadian kecelakaan kerja / near miss dan cetak lembar formulir investigasi.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg"
            >
              <Printer className="w-4 h-4" /> Cetak Laporan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Judul Insiden</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Klasifikasi Insiden</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              >
                <option>Near Miss / Hampir Celaka</option>
                <option>P3K / First Aid Injury</option>
                <option>Medical Treatment Case (MTC)</option>
                <option>Lost Time Injury (LTI)</option>
                <option>Property Damage (Kerusakan Aset)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Kronologi Kejadian</label>
            <textarea
              rows={4}
              value={formData.chronology}
              onChange={(e) => setFormData({ ...formData, chronology: e.target.value })}
              className="w-full p-3 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Analisis Akar Masalah (Root Cause / 5-Why)</label>
            <textarea
              rows={3}
              value={formData.cause}
              onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
              className="w-full p-3 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Tindakan Perbaikan & Pencegahan (CAPA)</label>
            <textarea
              rows={3}
              value={formData.actions}
              onChange={(e) => setFormData({ ...formData, actions: e.target.value })}
              className="w-full p-3 border border-slate-200 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
