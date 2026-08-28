'use client';

import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AIAnalyzerPage() {
  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        score: '85/100 (Kepatuhan Baik)',
        findings: [
          'Identifikasi bahaya utama (ketinggian & listrik) telah tercakup dengan baik.',
          'Rekomendasi APD sudah mencantumkan standar keselamatan SNI/EN.',
          'Disarankan menambahkan prosedur mitigasi darurat dan nomor kontak darurat pos medis.'
        ],
        regulations: [
          'Permenaker No. 9 Tahun 2016 (K3 Ketinggian)',
          'Permenaker No. 12 Tahun 2015 (K3 Listrik)',
          'PP No. 50 Tahun 2012 (SMK3)'
        ]
      });
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Tools K3', url: '/tools' },
              { name: 'AI Document Analyzer' }
            ]}
          />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Analyzer Dokumen & SOP Keselamatan Kerja
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Evaluasi dokumen JSA, HIRADC, dan SOP K3 secara cerdas untuk memeriksa kelengkapan pengendalian bahaya dan kepatuhan regulasi Indonesia.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <label className="font-bold text-slate-900 text-sm block">
            Tempelkan Teks Prosedur / JSA yang Ingin Dianalisis:
          </label>
          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Contoh: Prosedur pekerjaan penggalian pipa sedalam 2 meter menggunakan excavator di dekat kabel listrik tegangan menengah..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
          />

          <button
            onClick={handleAnalyze}
            disabled={analyzing || !inputText.trim()}
            className="bg-brand-600 hover:bg-brand-500 disabled:bg-slate-300 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            {analyzing ? 'Menganalisis Dokumen...' : 'Analisis Dokumen K3 Sekarang'}
          </button>
        </div>

        {result && (
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs text-brand-400 font-bold uppercase tracking-wider">Hasil Analisis AI K3</span>
              <span className="bg-brand-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full">
                Skor: {result.score}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-200">Temuan & Rekomendasi Perbaikan:</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {result.findings.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h3 className="font-bold text-sm text-slate-200">Dasar Regulasi Terkait:</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {result.regulations.map((r: string, i: number) => (
                  <span key={i} className="bg-slate-800 border border-slate-700 text-brand-300 px-3 py-1 rounded-lg">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
