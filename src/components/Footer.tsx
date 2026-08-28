import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ─── Trust Badges Ribbon ─────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-slate-850">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">KEMNAKER RI</div>
              <div className="text-[11px] text-slate-400">PJK3 Resmi Terdaftar</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">BNSP INDONESIA</div>
              <div className="text-[11px] text-slate-400">LSP Terlisensi Resmi</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">PaDi UMKM & LPSE</div>
              <div className="text-[11px] text-slate-400">Mitra Pengadaan BUMN/Pemerintah</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <span className="text-emerald-400 font-extrabold text-xs">100%</span>
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">Garansi Kelulusan</div>
              <div className="text-[11px] text-slate-400">Ujian Ulang Gratis Sampai Kompeten</div>
            </div>
          </div>
        </div>

        {/* ─── Footer Main Links Grid ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Wahana Totalita Konsultan"
                className="h-12 w-auto object-contain brightness-105"
              />
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              <strong>PT Wahana Totalita Konsultan</strong> adalah Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) resmi penunjukan Kementerian Ketenagakerjaan RI dan Lembaga Sertifikasi Profesi BNSP di Indonesia.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Ringroad Timur No. 59, Banguntapan, Bantul, D.I. Yogyakarta 55198</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline / WA: 0877-5915-1278</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@wahanatotalita.com</span>
              </div>
            </div>
          </div>

          {/* Program Pelatihan */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm tracking-wide">Program Populer</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/pelatihan/ahli-k3-umum-sertifikasi-kemnaker-ri" className="hover:text-emerald-400 transition-colors">
                  Ahli K3 Umum KEMNAKER
                </Link>
              </li>
              <li>
                <Link href="/pelatihan/ahli-k3-konstruksi-sertifikasi-kemnaker-ri" className="hover:text-emerald-400 transition-colors">
                  Ahli K3 Konstruksi
                </Link>
              </li>
              <li>
                <Link href="/pelatihan/pelatihan-dan-sertifikasi-training-of-trainer-tot-level-4-sertifikasi-bnsp" className="hover:text-emerald-400 transition-colors">
                  TOT Instruktur BNSP
                </Link>
              </li>
              <li>
                <Link href="/pelatihan/pengawas-operasional-pertama-pop-pertambangan-sertifikasi-bnsp" className="hover:text-emerald-400 transition-colors">
                  POP Pertambangan BNSP
                </Link>
              </li>
              <li>
                <Link href="/pelatihan/pelatihan-k3-listrik-sertifikasi-kemnaker-ri" className="hover:text-emerald-400 transition-colors">
                  Ahli K3 Listrik Industri
                </Link>
              </li>
              <li>
                <Link href="/pelatihan" className="text-emerald-400 font-bold hover:underline">
                  Lihat Semua 147 Program →
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan & Konsultasi */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm tracking-wide">Layanan Korporat</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/csms" className="hover:text-emerald-400 transition-colors">
                  Konsultasi Dokumen CSMS
                </Link>
              </li>
              <li>
                <Link href="/smk3" className="hover:text-emerald-400 transition-colors">
                  Audit SMK3 PP 50/2012
                </Link>
              </li>
              <li>
                <Link href="/perpanjangan-skp" className="hover:text-emerald-400 transition-colors">
                  Perpanjangan SKP K3
                </Link>
              </li>
              <li>
                <Link href="/perusahaan" className="hover:text-emerald-400 transition-colors">
                  In-House Training Custom
                </Link>
              </li>
              <li>
                <Link href="/layanan-pemerintah" className="hover:text-emerald-400 transition-colors">
                  Pengadaan LPSE & PaDi
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-emerald-400 transition-colors">
                  Dokumentasi & Galeri Foto
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Platform */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm tracking-wide">Tools & Platform</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/tools/safety-talk" className="hover:text-emerald-400 transition-colors">
                  100 Materi Safety Talk
                </Link>
              </li>
              <li>
                <Link href="/tools/kalkulator-k3" className="hover:text-emerald-400 transition-colors">
                  Kalkulator FR & SR
                </Link>
              </li>
              <li>
                <Link href="/tools/risk-matrix" className="hover:text-emerald-400 transition-colors">
                  Risk Matrix 5x5
                </Link>
              </li>
              <li>
                <Link href="/tools/jsa-builder" className="hover:text-emerald-400 transition-colors">
                  JSA Builder Online
                </Link>
              </li>
              <li>
                <Link href="/glosarium" className="hover:text-emerald-400 transition-colors">
                  Glosarium Istilah K3
                </Link>
              </li>
              <li>
                <Link href="/verifikasi" className="hover:text-emerald-400 transition-colors">
                  Verifikasi Sertifikat
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Bottom Copyright ────────────────────────────────── */}
        <div className="pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2012 – {new Date().getFullYear()} <strong>PT Wahana Totalita Konsultan</strong>. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/kebijakan-privasi" className="hover:text-slate-400 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">
              Sitemap XML
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
