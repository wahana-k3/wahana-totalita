import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  ShieldCheck,
  Calculator,
  BarChart3,
  FileCheck2,
  Volume2,
  AlertCircle,
  FileText,
  Sparkles,
  ArrowRight,
  BookOpen,
  Eye
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ToolsIndexPage() {
  const tools = [
    {
      id: 'safety-talk',
      title: '100 Materi Safety Talk (TBM)',
      desc: 'Database 100 topik briefing keselamatan kerja harian lengkap dengan poin diskusi dan formulir absensi cetak.',
      icon: '📢',
      badge: 'Paling Populer',
      badgeColor: 'bg-brand-500 text-slate-950',
      url: '/tools/safety-talk'
    },
    {
      id: 'kalkulator-k3',
      title: 'Kalkulator K3 (FR & SR)',
      desc: 'Hitung Frequency Rate (Tingkat Kekerapan) & Severity Rate (Tingkat Keparahan) kecelakaan kerja standar Kemenaker & OSHA.',
      icon: '🧮',
      url: '/tools/kalkulator-k3'
    },
    {
      id: 'risk-matrix',
      title: 'Risk Matrix 5x5 Online',
      desc: 'Matriks penilaian tingkat risiko bahaya (Kemungkinan x Konsekuensi) untuk menyusun HIRADC & IBPR.',
      icon: '📊',
      url: '/tools/risk-matrix'
    },
    {
      id: 'jsa-builder',
      title: 'JSA (Job Safety Analysis) Builder',
      desc: 'Generator formulir Analisis Keselamatan Pekerjaan langkah demi langkah untuk pekerjaan berisiko tinggi.',
      icon: '📝',
      url: '/tools/jsa-builder'
    },
    {
      id: 'ibpr-generator',
      title: 'IBPR / HIRADC Generator',
      desc: 'Identifikasi Bahaya, Penilaian Risiko, dan Pengendalian Risiko sesuai standar SMK3 PP 50/2012 & ISO 45001.',
      icon: '🛡️',
      url: '/tools/ibpr-generator'
    },
    {
      id: 'apd-selector',
      title: 'APD Selector Guide',
      desc: 'Panduan rekomendasi Alat Pelindung Diri yang tepat berdasarkan jenis pekerjaan dan potensi paparan bahaya.',
      icon: '🥽',
      url: '/tools/apd-selector'
    },
    {
      id: 'kalkulator-kebisingan',
      title: 'Kalkulator Kebisingan & Noise Dose',
      desc: 'Hitung dosis paparan kebisingan harian pekerja berdasarkan Permenaker No. 5 Tahun 2018 (NAB 85 dBA).',
      icon: '🔊',
      url: '/tools/kalkulator-kebisingan'
    },
    {
      id: 'kalkulator-biaya-k3',
      title: 'Kalkulator Biaya Kerugian K3',
      desc: 'Estimasi kerugian langsung dan tidak langsung (Teori Gunung Es) akibat kecelakaan kerja di perusahaan.',
      icon: '💰',
      url: '/tools/kalkulator-biaya-k3'
    },
    {
      id: 'regulasi-k3',
      title: 'Database Regulasi K3 Indonesia',
      desc: 'Kompilasi lengkap Undang-Undang, Peraturan Pemerintah, dan Permenaker RI terbaru yang dapat dicari.',
      icon: '📚',
      url: '/tools/regulasi-k3'
    },
    {
      id: 'laporan-insiden',
      title: 'Form Investigasi Insiden',
      desc: 'Template formulir laporan awal dan investigasi akar masalah (5-Why) kecelakaan kerja dan near miss.',
      icon: '⚠️',
      url: '/tools/laporan-insiden'
    },
    {
      id: 'ai-analyzer',
      title: 'AI Document Analyzer K3',
      desc: 'Analisis dokumen HSE, JSA, dan SOP keselamatan kerja berbasis kecerdasan buatan.',
      icon: '🤖',
      url: '/tools/ai-analyzer'
    },
    {
      id: 'social-generator',
      title: 'Safety Campaign Generator',
      desc: 'Generator slogan dan materi kampanye Bulan K3 Nasional untuk poster dan media sosial.',
      icon: '🎨',
      url: '/tools/social-generator'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ─── Header & Breadcrumbs ────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Tools K3 Online' }]} />

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tools, Kalkulator & Generator K3 Online Gratis
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Rangkaian utilitas interaktif profesional untuk mempermudah tugas praktisi HSE, Safety Officer, dan supervisor lapangan di Indonesia.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.url}
              className="bg-white border border-slate-200 hover:border-brand-500 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </span>
                  {tool.badge && (
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tool.badgeColor || 'bg-brand-100 text-brand-800'}`}>
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {tool.title}
                </h2>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                Buka Tool Gratis →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
