import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, Award, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Accreditation Badges Banner */}
      <div className="bg-navy-900/60 border-b border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-base">Terakreditasi Resmi Pemerintah RI</div>
              <div className="text-xs text-slate-400">PJK3 KEMNAKER RI • Lembaga Sertifikasi BNSP • PaDi UMKM • Vendor LPSE</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
            <span className="bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-brand-400" /> KEMNAKER RI
            </span>
            <span className="bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-brand-400" /> BNSP
            </span>
            <span className="bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-brand-400" /> PaDi UMKM
            </span>
            <span className="bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-brand-400" /> Vendor LPSE
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Company Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="font-display font-extrabold text-xl text-white tracking-tight">
              WAHANA <span className="text-brand-400">TOTALITA</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Wahana Totalita Konsultan adalah lembaga pelatihan dan sertifikasi K3, Lingkungan Hidup, Mining, dan Sistem Manajemen terkemuka di Indonesia yang diakui resmi oleh KEMNAKER RI & BNSP.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
              <span>D.I. Yogyakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-400 shrink-0" />
              <a href="https://wa.me/6287759151278" target="_blank" rel="noopener noreferrer" className="hover:text-brand-300">
                +62 877-5915-1278 (WhatsApp Resmi)
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-400 shrink-0" />
              <span>info@wahanatotalita.com</span>
            </div>
          </div>
        </div>

        {/* Program Populer */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Program Utama</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/pelatihan/pelatihan-ahli-k3-umum-sertifikasi-kemnaker-ri" className="hover:text-brand-300 transition-colors">Ahli K3 Umum KEMNAKER</Link></li>
            <li><Link href="/pelatihan/pelatihan-dan-sertifikasi-training-of-trainer-tot-instruktur-bnsp" className="hover:text-brand-300 transition-colors">TOT Instruktur BNSP</Link></li>
            <li><Link href="/pelatihan/pelatihan-auditor-sistem-manajemen-k3-sertifikasi-kemnaker-ri" className="hover:text-brand-300 transition-colors">Auditor SMK3 PP 50/2012</Link></li>
            <li><Link href="/pelatihan/pelatihan-ahli-muda-k3-konstruksi-sertifikasi-kemnaker-ri" className="hover:text-brand-300 transition-colors">Ahli K3 Konstruksi</Link></li>
            <li><Link href="/pelatihan/pelatihan-ahli-k3-listrik-sertifikasi-kemnaker-ri" className="hover:text-brand-300 transition-colors">Ahli K3 Listrik</Link></li>
            <li><Link href="/pelatihan/pelatihan-petugas-p3k-sertifikasi-kemnaker-ri" className="hover:text-brand-300 transition-colors">Petugas P3K di Tempat Kerja</Link></li>
            <li><Link href="/pelatihan" className="text-brand-400 hover:underline font-medium">Lihat Semua 105 Program →</Link></li>
          </ul>
        </div>

        {/* Layanan & Industri */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Layanan Khusus</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/csms" className="hover:text-brand-300 transition-colors">Konsultasi CSMS Migas & Tambang</Link></li>
            <li><Link href="/perpanjangan-skp" className="hover:text-brand-300 transition-colors">Perpanjangan SKP & Lisensi</Link></li>
            <li><Link href="/layanan-pemerintah" className="hover:text-brand-300 transition-colors">Pengadaan Instansi / LPSE</Link></li>
            <li><Link href="/smk3" className="hover:text-brand-300 transition-colors">Pendampingan Audit SMK3</Link></li>
            <li><Link href="/higiene-industri" className="hover:text-brand-300 transition-colors">Pengukuran Higiene Industri</Link></li>
            <li><Link href="/k3-pertambangan" className="hover:text-brand-300 transition-colors">Pelatihan POP/POM Tambang</Link></li>
            <li><Link href="/klien" className="hover:text-brand-300 transition-colors">Klien & Testimoni</Link></li>
          </ul>
        </div>

        {/* Platform & Tools */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Platform & Tools</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/tools/safety-talk" className="text-brand-300 font-semibold hover:underline">100 Materi Safety Talk</Link></li>
            <li><Link href="/tools/kalkulator-k3" className="hover:text-brand-300 transition-colors">Kalkulator K3 (FR & SR)</Link></li>
            <li><Link href="/tools/risk-matrix" className="hover:text-brand-300 transition-colors">Risk Matrix 5x5 Online</Link></li>
            <li><Link href="/glosarium" className="hover:text-brand-300 transition-colors">Glosarium 180+ Istilah K3</Link></li>
            <li><Link href="/insiden" className="hover:text-brand-300 transition-colors">Database Kasus Insiden K3</Link></li>
            <li><Link href="/jadwal" className="hover:text-brand-300 transition-colors">Jadwal Training Terbaru</Link></li>
            <li><Link href="/verifikasi" className="hover:text-brand-300 transition-colors">Verifikasi Sertifikat</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-navy-950 border-t border-slate-850 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © 2026 <strong>Wahana Totalita Konsultan</strong>. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex gap-6">
            <Link href="/kebijakan-privasi" className="hover:text-slate-300">Kebijakan Privasi</Link>
            <Link href="/perusahaan" className="hover:text-slate-300">Tentang Kami</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300">Sitemap XML</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
