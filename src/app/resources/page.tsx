import React from 'react';
import { FileText, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ResourcesPage() {
  const templates = [
    { title: 'Template JSA (Job Safety Analysis) Excel & Word', cat: 'Dokumen JSA', size: '250 KB' },
    { title: 'Checklist Audit Internal SMK3 PP 50/2012 (166 Kriteria)', cat: 'SMK3', size: '420 KB' },
    { title: 'Formulir Laporan Investigasi Insiden & Near Miss', cat: 'Investigasi', size: '180 KB' },
    { title: 'Matriks Identifikasi Bahaya & IBPR/HIRADC Industri', cat: 'HIRADC', size: '310 KB' },
    { title: 'Standard Operating Procedure (SOP) Bekerja di Ketinggian', cat: 'SOP K3', size: '290 KB' },
    { title: 'Formulir Izin Kerja Khusus (Permit to Work / PTW)', cat: 'Izin Kerja', size: '150 KB' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Resources & Template K3' }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Download Template & Dokumen K3 Gratis
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Koleksi formulir, SOP, checklist audit SMK3, dan panduan keselamatan kerja siap edit.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-brand-500 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2.5 py-0.5 rounded">
                  {tpl.cat}
                </span>
                <h2 className="font-bold text-base text-slate-900 line-clamp-2">{tpl.title}</h2>
                <div className="text-xs text-slate-400">Ukuran file: {tpl.size}</div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin meminta template dokumen: ${tpl.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download via CS
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
