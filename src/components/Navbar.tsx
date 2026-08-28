'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  FileText,
  MapPin,
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const toggleMobileSection = (name: string) => {
    setMobileExpandedSection((prev) => (prev === name ? null : name));
  };

  return (
    <div ref={navRef} className="relative w-full z-50">
      {/* ─── Top Trust Ribbon (Clean Light Bar) ────────────────────────────── */}
      <div className="bg-slate-100 text-slate-700 text-xs py-2 px-4 border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-bold text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              PJK3 Resmi SKP KEMNAKER RI • LSP BNSP
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-600 font-medium">
              Mitra Terdaftar PaDi UMKM (BUMN) & LPSE RI
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <Link
              href="/verifikasi"
              className="text-slate-700 hover:text-emerald-700 font-semibold transition-colors flex items-center gap-1"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Verifikasi Sertifikat</span>
              <span className="sm:hidden">Verifikasi</span>
            </Link>
            <span className="text-slate-300">|</span>
            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pelatihan%20K3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-bold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 fill-current shrink-0" />
              <span>0877-5915-1278</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Sticky Header ───────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/90'
            : 'bg-white border-b border-slate-200/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Real Brand Logo Lockup */}
            <Logo variant="dark" size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all"
              >
                Beranda
              </Link>

              {/* Pelatihan Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('pelatihan')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown('pelatihan')}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                    activeDropdown === 'pelatihan'
                      ? 'text-emerald-700 bg-emerald-50/70'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Pelatihan & Sertifikasi</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === 'pelatihan' ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Container with Hover Bridge */}
                {activeDropdown === 'pelatihan' && (
                  <div className="absolute top-full left-0 pt-2 w-[360px] z-50 animate-in fade-in-50 duration-150">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 grid grid-cols-1 gap-1">
                      <Link
                        href="/pelatihan"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-start gap-3.5 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                            Katalog Pelatihan (147 Program)
                          </div>
                          <div className="text-[11px] text-slate-500">Sertifikasi Kemnaker RI & BNSP</div>
                        </div>
                      </Link>

                      <Link
                        href="/jadwal"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-start gap-3.5 group"
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
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-start gap-3.5 group"
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
                  </div>
                )}
              </div>

              {/* Layanan Korporat Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('layanan')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown('layanan')}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                    activeDropdown === 'layanan'
                      ? 'text-emerald-700 bg-emerald-50/70'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Layanan Korporat</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === 'layanan' ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Container with Hover Bridge */}
                {activeDropdown === 'layanan' && (
                  <div className="absolute top-full left-0 pt-2 w-[360px] z-50 animate-in fade-in-50 duration-150">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 grid grid-cols-1 gap-1">
                      <Link
                        href="/perpanjangan-skp"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-start gap-3.5 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                            Perpanjangan SKP & Lisensi K3
                          </div>
                          <div className="text-[11px] text-slate-500">Kemnaker RI tanpa ujian ulang</div>
                        </div>
                      </Link>

                      <Link
                        href="/csms"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-start gap-3.5 group"
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
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-start gap-3.5 group"
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
                  </div>
                )}
              </div>

              {/* Tools HSE Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('tools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown('tools')}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                    activeDropdown === 'tools'
                      ? 'text-emerald-700 bg-emerald-50/70'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Tools HSE</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === 'tools' ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Container with Hover Bridge */}
                {activeDropdown === 'tools' && (
                  <div className="absolute top-full left-0 pt-2 w-[340px] z-50 animate-in fade-in-50 duration-150">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 grid grid-cols-1 gap-1">
                      <Link
                        href="/tools/safety-talk"
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-start gap-3.5 group"
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
                        onClick={() => setActiveDropdown(null)}
                        className="p-3 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-start gap-3.5 group"
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
                  </div>
                )}
              </div>

              <Link
                href="/galeri"
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1.5"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Galeri (67 Foto)</span>
              </Link>

              <Link
                href="/artikel"
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all"
              >
                Artikel
              </Link>
            </nav>

            {/* Desktop Modern CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20minta%20proposal%20penawaran%20dan%20jadwal%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-emerald-600/25 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Minta Proposal Kilat</span>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Slideout Navigation ─────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Beranda
              </Link>

              {/* Mobile Pelatihan Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileSection('pelatihan')}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  <span>Pelatihan & Sertifikasi</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpandedSection === 'pelatihan' ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {mobileExpandedSection === 'pelatihan' && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl mt-1">
                    <Link
                      href="/pelatihan"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700"
                    >
                      Katalog Pelatihan (147 Program)
                    </Link>
                    <Link
                      href="/jadwal"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700"
                    >
                      Jadwal Pelatihan 2026
                    </Link>
                    <Link
                      href="/perusahaan"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700"
                    >
                      In-House Training Perusahaan
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Layanan Korporat Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileSection('layanan')}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  <span>Layanan Korporat</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpandedSection === 'layanan' ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {mobileExpandedSection === 'layanan' && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl mt-1">
                    <Link
                      href="/perpanjangan-skp"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700"
                    >
                      Perpanjangan SKP & Lisensi K3
                    </Link>
                    <Link
                      href="/csms"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700"
                    >
                      Konsultasi CSMS & SMK3
                    </Link>
                    <Link
                      href="/layanan-pemerintah"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700"
                    >
                      Layanan Instansi Pemerintah
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Tools HSE Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileSection('tools')}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  <span>Tools HSE</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpandedSection === 'tools' ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {mobileExpandedSection === 'tools' && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl mt-1">
                    <Link
                      href="/tools/safety-talk"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700"
                    >
                      100 Materi Safety Talk
                    </Link>
                    <Link
                      href="/tools"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700"
                    >
                      10 Kalkulator & Builder K3
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/galeri"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Dokumentasi Pelatihan (67 Foto)
              </Link>
              <Link
                href="/artikel"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Artikel & Berita K3
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Konsultasi WhatsApp Sekarang</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
