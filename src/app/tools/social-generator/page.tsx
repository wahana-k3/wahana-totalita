'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function SocialGeneratorPage() {
  const [topic, setTopic] = useState('Bulan K3 Nasional & Budaya Keselamatan');
  const [copied, setCopied] = useState(false);

  const slogans = [
    'Keselamatan Bukan Pilihan, Tapi Kebutuhan! Utamakan K3 di Setiap Langkah Kerja.',
    'Pulang dengan Selamat Adalah Prioritas Tertinggi untuk Keluarga di Rumah.',
    'Satu Tindakan Tidak Aman Bisa Mengubah Segalanya. Selalu Patuhi SOP & Kenakan APD!',
    'Budaya K3 Unggul, Produktivitas Meningkat, Perusahaan Berkelanjutan.'
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'Safety Campaign Generator' }
            ]}
          />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Safety Campaign & Slogan Generator K3
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Generator slogan, caption media sosial, dan materi kampanye keselamatan kerja harian.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Slogan & Kutipan K3 Populer:</h2>
          <div className="space-y-3">
            {slogans.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 text-xs sm:text-sm text-slate-800"
              >
                <span>&ldquo;{s}&rdquo;</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(s);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="bg-white border border-slate-300 hover:border-brand-500 p-2 rounded-xl text-slate-600 hover:text-brand-600 shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
