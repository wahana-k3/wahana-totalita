import React from 'react';
import { MessageSquare, Users, ShieldCheck, Plus } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ForumPage() {
  const topics = [
    { title: 'Tanya jawab syarat perpanjangan SKP Ahli K3 Umum yang sudah lewat masa berlaku', replies: 12, cat: 'Regulasi & SKP', author: 'Budi (Safety Officer)' },
    { title: 'Studi kasus implementasi CSMS kategori High Risk untuk tender PLN', replies: 8, cat: 'CSMS', author: 'Rian HSE' },
    { title: 'Rekomendasi jenis APD respirator terbaik untuk paparan uap cat polyurethane', replies: 15, cat: 'B3 & Kimia', author: 'Ahmad' },
    { title: 'Tips lulus ujian wawancara portofolio BNSP skema Ahli K3 Muda', replies: 24, cat: 'Sertifikasi BNSP', author: 'Wahyu' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumbs items={[{ name: 'Forum Komunitas K3' }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Forum Diskusi & Komunitas Praktisi K3 Indonesia
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Wadah tanya jawab, sharing ilmu lapangan, dan konsultasi antar profesional keselamatan kerja.
              </p>
            </div>
            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20bergabung%20grup%20WhatsApp%20Komunitas%20K3"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg"
            >
              <Users className="w-4 h-4" /> Gabung Grup WA Komunitas
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        {topics.map((t, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded">{t.cat}</span>
              <h2 className="text-base font-bold text-slate-900">{t.title}</h2>
              <div className="text-xs text-slate-400">Ditanyakan oleh: <strong>{t.author}</strong></div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-brand-600 font-bold bg-slate-100 px-3 py-1.5 rounded-lg">
                💬 {t.replies} Diskusi
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
