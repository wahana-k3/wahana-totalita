'use client';

import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, Printer } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function IBPRGeneratorPage() {
  const [area, setArea] = useState('Area Pabrik & Gudang Penyimpanan');
  const [items, setItems] = useState([
    {
      activity: 'Pengisian Bahan Bakar Forklift (LPG/Solar)',
      hazard: 'Kebocoran gas/cairan mudah terbakar',
      risk: 'Kebakaran, ledakan, luka bakar',
      control: 'Sediakan APAR 6kg di dekat lokasi, dilarang merokok dalam radius 15m, gunakan sarung tangan nitril'
    },
    {
      activity: 'Penyusunan Pallet di Rak Tinggi (>4 meter)',
      hazard: 'Pallet miring, barang terjatuh dari atas',
      risk: 'Tertimpa barang berat, cedera kepala fatal',
      control: 'Wajib gunakan helm proyek bersertifikat, pasang jaring pengaman (safety net), inspeksi batas kapasitas rak'
    }
  ]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'IBPR / HIRADC Generator' }
            ]}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                IBPR (Identifikasi Bahaya & Penilaian Risiko) Online
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Generator dokumen HIRADC / IBPR standar SMK3 PP 50/2012 dan ISO 45001.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg"
            >
              <Printer className="w-4 h-4" /> Cetak IBPR
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-xs">
          <label className="font-bold text-slate-700 block mb-1">Lokasi / Area Identifikasi</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full p-2.5 border border-slate-200 rounded-xl font-semibold"
          />
        </div>

        <div className="space-y-4">
          {items.map((it, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-extrabold text-brand-700">Aktivitas #{idx + 1}</span>
                {items.length > 1 && (
                  <button
                    onClick={() => setItems(items.filter((_, i) => i !== idx))}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Hapus
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kegiatan / Proses Kerja</label>
                  <input
                    type="text"
                    value={it.activity}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx].activity = e.target.value;
                      setItems(updated);
                    }}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Potensi Bahaya</label>
                  <input
                    type="text"
                    value={it.hazard}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx].hazard = e.target.value;
                      setItems(updated);
                    }}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hierarki Pengendalian Risiko</label>
                <textarea
                  rows={2}
                  value={it.control}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].control = e.target.value;
                    setItems(updated);
                  }}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
