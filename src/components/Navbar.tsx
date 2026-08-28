'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Phone,
  Search,
  BookOpen,
  Wrench,
  Calendar,
  Award,
  Building2,
  Image as ImageIcon,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  Zap,
  HelpCircle,
  FileText
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ─── Executive Top Trust & Response Bar ────────────────────────────── */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-850">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              PJK3 Resmi SKP KEMNAKER RI • LSP BNSP
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">
              Mitra Terdaftar PaDi UMKM (BUMN) & LPSE RI
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-slate-300">
            <Link
              href="/verifikasi"
              className="hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1 text-slate-300"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              Verifikasi Sertifikat
            </Link>
            <span className="text-slate-700">|</span>
            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pelatihan%20K3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 fill-current" />
              Hotline: 0877-5915-1278
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Executive Header ───────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-md shadow-xl border-b border-slate-800'
            : 'bg-slate-950 border-b border-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Real Brand Logo Lockup */}
            <Logo variant="light" size="md" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/"
                className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-colors"
              >
                Beranda
              </Link>

              {/* Pelatihan Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('pelatihan')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-colors">
                  <span>Pelatihan & Sertifikasi</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'pelatihan' && (
                  <div className="absolute top-full left-0 w-84 bg-slate-900 rounded-2xl shadow-2xl border border-slate-750 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/pelatihan"
                      className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-3"
                    >
                      <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">Katalog Semua Pelatihan (147 Program)</div>
                        <div className="text-[11px] text-slate-400">Sertifikasi Kemnaker RI & BNSP</div>
                      </div>
                    </Link>
                    <Link
                      href="/jadwal"
                      className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-3"
                    >
                      <Calendar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">Jadwal Pelatihan 2026</div>
                        <div className="text-[11px] text-slate-400">Kelas Online Zoom & Tatap Muka</div>
                      </div>
                    </Link>
                    <Link
                      href="/perusahaan"
                      className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-3"
                    >
                      <Building2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">In-House Training Perusahaan</div>
                        <div className="text-[11px] text-slate-400">Pelatihan khusus di lokasi perusahaan</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Layanan & Perpanjangan Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('layanan')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-colors">
                  <span>Layanan Korporat</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'layanan' && (
                  <div className="absolute top-full left-0 w-84 bg-slate-900 rounded-2xl shadow-2xl border border-slate-750 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/perpanjangan-skp"
                      className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">Perpanjangan SKP & Lisensi K3</div>
                        <div className="text-[11px] text-slate-400">Kemnaker RI tanpa pelatihan ulang</div>
                      </div>
                    </Link>
                    <Link
                      href="/csms"
                      className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-3"
                    >
                      <Building2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">Konsultasi CSMS & SMK3</div>
                        <div className="text-[11px] text-slate-400">Dokumen tender & prakualifikasi HSE</div>
                      </div>
                    </Link>
                    <Link
                      href="/layanan-pemerintah"
                      className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-3"
                    >
                      <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">Layanan Instansi Pemerintah</div>
                        <div className="text-[11px] text-slate-400">Pengadaan via LPSE & PaDi UMKM</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Tools & Safety Talk Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('tools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-colors">
                  <span>Tools HSE</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'tools' && (
                  <div className="absolute top-full left-0 w-80 bg-slate-900 rounded-2xl shadow-2xl border border-slate-750 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/tools/safety-talk"
                      className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-3"
                    >
                      <BookOpen className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">100 Materi Safety Talk</div>
                        <div className="text-[11px] text-slate-400">Toolbox meeting & lembar presensi</div>
                      </div>
                    </Link>
                    <Link
                      href="/tools"
                      className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-3"
                    >
                      <Wrench className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">10 Kalkulator & Builder K3</div>
                        <div className="text-[11px] text-slate-400">JSA, IBPR, Noise, Risk Matrix</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/galeri"
                className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Galeri (67 Foto)</span>
              </Link>

              <Link
                href="/artikel"
                className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-colors"
              >
                Artikel & Berita
              </Link>
            </nav>

            {/* Desktop Lead Hunter CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20minta%20proposal%20penawaran%20dan%20jadwal%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-950/60 flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Minta Proposal Kilat</span>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Slideout Navigation ─────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-850 px-4 pt-3 pb-8 space-y-4 shadow-2xl">
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
              >
                Beranda
              </Link>
              <Link
                href="/pelatihan"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
              >
                Semua Pelatihan (147 Program)
              </Link>
              <Link
                href="/perpanjangan-skp"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-slate-900 rounded-xl"
              >
                Perpanjangan SKP & Lisensi K3
              </Link>
              <Link
                href="/jadwal"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
              >
                Jadwal Pelatihan 2026
              </Link>
              <Link
                href="/galeri"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
              >
                Dokumentasi Pelatihan (67 Foto)
              </Link>
              <Link
                href="/tools/safety-talk"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
              >
                100 Safety Talks
              </Link>
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
              >
                Tools & Kalkulator K3
              </Link>
              <Link
                href="/artikel"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
              >
                Artikel & Wawasan K3
              </Link>
              <Link
                href="/verifikasi"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
              >
                Verifikasi Sertifikat Online
              </Link>
            </nav>

            <div className="pt-2">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20minta%20proposal%20penawaran%20dan%20jadwal%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 fill-current" />
                Konsultasi WhatsApp Sekarang
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
