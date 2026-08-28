'use client';

import React, { useState } from 'react';
import { FileText, Plus, Trash2, Printer, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function JSABuilderPage() {
  const [jobTitle, setJobTitle] = useState('Pekerjaan Pengelasan Tangki di Ketinggian');
  const [department, setDepartment] = useState('Maintenance / Workshop');
  const [supervisor, setSupervisor] = useState('HSE Officer / Supervisor');
  const [steps, setSteps] = useState([
    {
      step: 'Persiapan area kerja dan inspeksi peralatan las',
      hazards: 'Kabel terkelupas, percikan api dekat bahan mudah terbakar',
      controls: 'Inspeksi kabel isolasi ganda, singkirkan bahan mudah terbakar dalam radius 10 meter, sediakan APAR'
    },
    {
      step: 'Menaiki scaffolding menuju titik pengelasan',
      hazards: 'Terjatuh dari ketinggian, perancah tidak stabil',
      controls: 'Pastikan scaffolding ber-tag hijau, wajib gunakan Full Body Harness dengan hook di atas kepala'
    },
    {
      step: 'Proses pengelasan dan pemotongan besi',
      hazards: 'Asap las beracun, radiasi sinar UV, percikan panas',
      controls: 'Gunakan kedok las (welding helmet), sarung tangan kulit panjang, apron, dan masker respirator partikulat'
    }
  ]);

  const addStep = () => {
    setSteps([
      ...steps,
      { step: 'Langkah pekerjaan baru', hazards: 'Potensi bahaya yang teridentifikasi', controls: 'Tindakan pengendalian risiko' }
    ]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'JSA Builder' }
            ]}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                JSA (Job Safety Analysis) Builder Online
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Susun dokumen Analisis Keselamatan Pekerjaan langkah demi langkah dan cetak siap pakai.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg"
            >
              <Printer className="w-4 h-4" /> Cetak JSA
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Basic Info */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Tugas / Pekerjaan</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Departemen / Divisi</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Penyusun / Supervisor</label>
            <input
              type="text"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        {/* Steps Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base">Urutan Langkah Kerja & Pengendalian Bahaya</h2>
            <button
              onClick={addStep}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Tambah Langkah
            </button>
          </div>

          {steps.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-extrabold text-xs text-brand-700">Langkah #{idx + 1}</span>
                {steps.length > 1 && (
                  <button
                    onClick={() => removeStep(idx)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">1. Tahapan Tugas</label>
                  <textarea
                    rows={3}
                    value={item.step}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].step = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">2. Potensi Bahaya</label>
                  <textarea
                    rows={3}
                    value={item.hazards}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].hazards = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">3. Tindakan Pengendalian</label>
                  <textarea
                    rows={3}
                    value={item.controls}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].controls = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
