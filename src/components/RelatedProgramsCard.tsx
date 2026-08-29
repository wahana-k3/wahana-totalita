'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Phone, Clock } from 'lucide-react';
import { TrainingProgram } from '@/lib/data/trainings';
import { getTrainingPhoto } from '@/lib/trainingImages';

interface RelatedProgramsProps {
  programs: TrainingProgram[];
  title?: string;
  subtitle?: string;
}

export default function RelatedProgramsCard({
  programs,
  title = 'Program Pelatihan & Sertifikasi Terkait',
  subtitle = 'Tingkatkan standar kompetensi keselamatan kerja dengan program sertifikasi resmi terakreditasi.',
}: RelatedProgramsProps) {
  if (!programs || programs.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
          Rekomendasi Sertifikasi
        </span>
        <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {programs.map((prog) => {
          const photoUrl = getTrainingPhoto(prog.slug, (prog as any).image_path);
          return (
            <div
              key={prog.id}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <Link href={`/pelatihan/${prog.slug}`} className="block relative h-36 w-full overflow-hidden bg-slate-900">
                  <img
                    src={photoUrl}
                    alt={prog.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                    <ShieldCheck className="w-3 h-3" />
                    {prog.certification}
                  </span>
                </Link>

                <div className="p-4 space-y-2">
                  <Link href={`/pelatihan/${prog.slug}`}>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {prog.name}
                    </h4>
                  </Link>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {prog.description}
                  </p>
                  <div className="text-[11px] text-slate-600 font-semibold pt-1 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{prog.duration_days} Hari &bull; {prog.mode}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 mt-auto border-t border-slate-100/80 flex items-center justify-between gap-2 pt-3">
                <Link
                  href={`/pelatihan/${prog.slug}`}
                  className="text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1 group/btn"
                >
                  <span>Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/6287759151278?text=${encodeURIComponent(
                    `Halo Wahana Totalita, saya tertarik daftar ${prog.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Daftar</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
