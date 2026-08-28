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
  ExternalLink,
  Sparkles,
  FileCheck2,
  Building2
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ─── Trust Badges Ribbon ─────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-slate-850">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">KEMNAKER RI</div>
              <div className="text-[11px] text-slate-400">PJK3 Resmi Terdaftar</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">BNSP INDONESIA</div>
              <div className="text-[11px] text-slate-400">LSP Terlisensi Resmi</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">PaDi UMKM & LPSE</div>
              <div className="text-[11px] text-slate-400">Mitra Pengadaan BUMN/Pemerintah</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
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
            <Logo variant="light" size="lg" />

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              <strong>PT Wahana Totalita Konsultan</strong> adalah Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) resmi penunjukan Kementerian Ketenagakerjaan RI dan Lembaga Sertifikasi Profesi BNSP di Indonesia.
            </p>

            <div className="space-y-2.5 text-xs text-slate-400 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Ringroad Timur No. 59, Banguntapan, Bantul, D.I. Yogyakarta 55198</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline / WhatsApp: 0877-5915-1278</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@wahanatotalita.com</span>
              </div>
            </div>

            {/* Quick Action Lead Magnet */}
            <div className="pt-2">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20minta%20katalog%20dan%20proposal%20pelatihan%20K3%20terbaru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Download Silabus & Proposal 2026</span>
              </a>
            </div>
          </div>

          {/* Program Pelatihan */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm tracking-wide">Program Populer</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/pelatihan/pelatihan-ahli-k3-umum-sertifikasi-kemnaker-ri" className="hover:text-emerald-400 transition-colors">
                  Ahli K3 Umum KEMNAKER
                </Link>
              </li>
              <li>
                <Link href="/pelatihan/pelatihan-ahli-muda-k3-konstruksi-sertifikasi-kemnaker-ri" className="hover:text-emerald-400 transition-colors">
                  Ahli K3 Konstruksi
                </Link>
              </li>
              <li>
                <Link href="/pelatihan/pelatihan-petugas-peran-kebakaran-kelas-d-kemnaker-ri" className="hover:text-emerald-400 transition-colors">
                  Damkar Kelas D/C/B/A
                </Link>
              </li>
              <li>
                <Link href="/pelatihan/pelatihan-tkbt-ii-sertifikasi-kemnaker-ri" className="hover:text-emerald-400 transition-colors">
                  K3 Ketinggian & TKBT II
                </Link>
              </li>
              <li>
                <Link href="/pelatihan/pelatihan-petugas-p3k-sertifikasi-kemnaker-ri" className="hover:text-emerald-400 transition-colors">
                  Petugas P3K di Tempat Kerja
                </Link>
              </li>
              <li>
                <Link href="/pelatihan/pelatihan-k3-operator-forklift-kelas-2-sertifikasi-kemnaker-ri" className="hover:text-emerald-400 transition-colors">
                  Operator Forklift & Alat Berat
                </Link>
              </li>
              <li>
                <Link href="/pelatihan" className="text-emerald-400 font-semibold hover:underline">
                  Semua 147 Program →
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan & CSMS */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm tracking-wide">Layanan Korporat</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/perpanjangan-skp" className="hover:text-emerald-400 transition-colors">
                  Perpanjangan SKP & Lisensi
                </Link>
              </li>
              <li>
                <Link href="/csms" className="hover:text-emerald-400 transition-colors">
                  Konsultasi Dokumen CSMS
                </Link>
              </li>
              <li>
                <Link href="/smk3" className="hover:text-emerald-400 transition-colors">
                  Audit & Pendampingan SMK3
                </Link>
              </li>
              <li>
                <Link href="/perusahaan" className="hover:text-emerald-400 transition-colors">
                  In-House Training Perusahaan
                </Link>
              </li>
              <li>
                <Link href="/layanan-pemerintah" className="hover:text-emerald-400 transition-colors">
                  Pengadaan LPSE & BUMN
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-emerald-400 transition-colors">
                  Galeri Dokumentasi (67 Foto)
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm tracking-wide">Tools & Verifikasi</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/verifikasi" className="hover:text-emerald-400 transition-colors">
                  Verifikasi Keaslian Sertifikat
                </Link>
              </li>
              <li>
                <Link href="/tools/safety-talk" className="hover:text-emerald-400 transition-colors">
                  100 Materi Safety Talk
                </Link>
              </li>
              <li>
                <Link href="/tools/jsa-builder" className="hover:text-emerald-400 transition-colors">
                  JSA Builder Online
                </Link>
              </li>
              <li>
                <Link href="/tools/ibpr-generator" className="hover:text-emerald-400 transition-colors">
                  IBPR Matrix Generator
                </Link>
              </li>
              <li>
                <Link href="/glosarium" className="hover:text-emerald-400 transition-colors">
                  Glosarium Istilah K3 (184 Kata)
                </Link>
              </li>
              <li>
                <Link href="/insiden" className="hover:text-emerald-400 transition-colors">
                  Database Analisis Insiden
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Bottom Copyright Bar ────────────────────────────── */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 PT Wahana Totalita Konsultan. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <Link href="/kebijakan-privasi" className="hover:text-slate-400 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">
              Sitemap
            </Link>
            <Link href="/verifikasi" className="hover:text-slate-400 transition-colors">
              Status Akreditasi PJK3
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
