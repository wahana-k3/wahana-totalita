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
  ArrowRight,
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
      {/* ─── Top Trust Ribbon (Sleek Clean Light Bar) ────────────────────────────── */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              PJK3 Resmi SKP KEMNAKER RI • LSP BNSP
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-slate-400">
              Mitra Terdaftar PaDi UMKM (BUMN) & LPSE RI
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <Link
              href="/verifikasi"
              className="text-slate-300 hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1"
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

      {/* ─── Main Glassmorphism Header ───────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-premium border-b border-slate-200/80'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Real Brand Logo Lockup */}
            <Logo variant="dark" size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all"
              >
                Beranda
              </Link>

              {/* Pelatihan Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('pelatihan')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all">
                  <span>Pelatihan & Sertifikasi</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform" />
                </button>

                {activeDropdown === 'pelatihan' && (
                  <div className="absolute top-full left-0 w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/pelatihan"
                      className="p-3 rounded-xl hover:bg-emerald-50/70 transition-colors flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          Katalog Semua Pelatihan (147 Program)
                        </div>
                        <div className="text-[11px] text-slate-500">Sertifikasi Kemnaker RI & BNSP</div>
                      </div>
                    </Link>
                    <Link
                      href="/jadwal"
                      className="p-3 rounded-xl hover:bg-emerald-50/70 transition-colors flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          Jadwal Pelatihan 2026
                        </div>
                        <div className="text-[11px] text-slate-500">Kelas Online Zoom & Tatap Muka</div>
                      </div>
                    </Link>
                    <Link
                      href="/perusahaan"
                      className="p-3 rounded-xl hover:bg-emerald-50/70 transition-colors flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          In-House Training Perusahaan
                        </div>
                        <div className="text-[11px] text-slate-500">Pelatihan khusus di lokasi perusahaan</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Layanan Korporat Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('layanan')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all">
                  <span>Layanan Korporat</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'layanan' && (
                  <div className="absolute top-full left-0 w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/perpanjangan-skp"
                      className="p-3 rounded-xl hover:bg-emerald-50/70 transition-colors flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          Perpanjangan SKP & Lisensi K3
                        </div>
                        <div className="text-[11px] text-slate-500">Kemnaker RI tanpa pelatihan ulang</div>
                      </div>
                    </Link>
                    <Link
                      href="/csms"
                      className="p-3 rounded-xl hover:bg-emerald-50/70 transition-colors flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          Konsultasi CSMS & SMK3
                        </div>
                        <div className="text-[11px] text-slate-500">Dokumen tender & prakualifikasi HSE</div>
                      </div>
                    </Link>
                    <Link
                      href="/layanan-pemerintah"
                      className="p-3 rounded-xl hover:bg-emerald-50/70 transition-colors flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          Layanan Instansi Pemerintah
                        </div>
                        <div className="text-[11px] text-slate-500">Pengadaan via LPSE & PaDi UMKM</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Tools HSE Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('tools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all">
                  <span>Tools HSE</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'tools' && (
                  <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/tools/safety-talk"
                      className="p-3 rounded-xl hover:bg-emerald-50/70 transition-colors flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          100 Materi Safety Talk
                        </div>
                        <div className="text-[11px] text-slate-500">Toolbox meeting & lembar presensi</div>
                      </div>
                    </Link>
                    <Link
                      href="/tools"
                      className="p-3 rounded-xl hover:bg-emerald-50/70 transition-colors flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          10 Kalkulator & Builder K3
                        </div>
                        <div className="text-[11px] text-slate-500">JSA, IBPR, Noise, Risk Matrix</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/galeri"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1.5"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Galeri (67 Foto)</span>
              </Link>

              <Link
                href="/artikel"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all"
              >
                Artikel & Berita
              </Link>
            </nav>

            {/* Desktop Modern CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20minta%20proposal%20penawaran%20dan%20jadwal%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Minta Proposal Kilat</span>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Slideout Navigation ─────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Beranda
              </Link>
              <Link
                href="/pelatihan"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Semua Pelatihan (147 Program)
              </Link>
              <Link
                href="/perpanjangan-skp"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 rounded-xl"
              >
                Perpanjangan SKP & Lisensi K3
              </Link>
              <Link
                href="/jadwal"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Jadwal Pelatihan 2026
              </Link>
              <Link
                href="/galeri"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Dokumentasi Pelatihan (67 Foto)
              </Link>
              <Link
                href="/tools/safety-talk"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                100 Safety Talks
              </Link>
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Tools & Kalkulator K3
              </Link>
              <Link
                href="/artikel"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Artikel & Wawasan K3
              </Link>
              <Link
                href="/verifikasi"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Verifikasi Sertifikat Online
              </Link>
            </nav>

            <div className="pt-2">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20minta%20proposal%20penawaran%20dan%20jadwal%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
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
