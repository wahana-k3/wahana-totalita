'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Phone,
  Calendar,
  BookOpen,
  Wrench,
  Building2,
  FileCheck,
  Award,
  Users,
  Search
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-brand-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              PJK3 Resmi KEMNAKER RI & BNSP
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">Yogyakarta & Online Se-Indonesia</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pelatihan%20K3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              +62 877-5915-1278
            </a>
            <Link href="/verifikasi" className="hover:text-brand-300 text-slate-300 font-medium transition-colors">
              Cek Sertifikat
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy-900/95 backdrop-blur-md shadow-lg shadow-black/10' : 'bg-navy-900'
        } border-b border-slate-800 text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-none group-hover:text-brand-300 transition-colors">
                  WAHANA <span className="text-brand-400">TOTALITA</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide mt-1">
                  KONSULTAN K3 & SERTIFIKASI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/pelatihan"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith('/pelatihan') ? 'text-brand-400 bg-slate-800/80' : 'text-slate-200 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Katalog Program
              </Link>

              <Link
                href="/jadwal"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith('/jadwal') ? 'text-brand-400 bg-slate-800/80' : 'text-slate-200 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Jadwal 2026
              </Link>

              {/* Layanan Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('layanan')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/50 flex items-center gap-1 transition-colors">
                  Layanan K3 <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'layanan' && (
                  <div className="absolute top-full left-0 w-72 bg-navy-900 border border-slate-700 rounded-xl shadow-2xl p-2 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link href="/csms" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <Building2 className="w-4 h-4 text-brand-400" />
                      <div>
                        <div className="font-semibold text-white">Konsultasi CSMS</div>
                        <div className="text-xs text-slate-400">Vendor Management System</div>
                      </div>
                    </Link>
                    <Link href="/perpanjangan-skp" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <FileCheck className="w-4 h-4 text-brand-400" />
                      <div>
                        <div className="font-semibold text-white">Perpanjangan SKP</div>
                        <div className="text-xs text-slate-400">SKP & Lisensi KEMNAKER</div>
                      </div>
                    </Link>
                    <Link href="/layanan-pemerintah" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <Award className="w-4 h-4 text-brand-400" />
                      <div>
                        <div className="font-semibold text-white">Instansi & BUMN</div>
                        <div className="text-xs text-slate-400">Vendor Resmi LPSE & PaDi</div>
                      </div>
                    </Link>
                    <Link href="/smk3" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <ShieldCheck className="w-4 h-4 text-brand-400" />
                      <div>
                        <div className="font-semibold text-white">SMK3 PP 50/2012</div>
                        <div className="text-xs text-slate-400">Implementasi & Audit K3</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('tools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/50 flex items-center gap-1 transition-colors">
                  Tools Online <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'tools' && (
                  <div className="absolute top-full left-0 w-80 bg-navy-900 border border-slate-700 rounded-xl shadow-2xl p-2 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link href="/tools/safety-talk" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm bg-brand-950/40 border border-brand-800/40">
                      <span className="text-lg">📢</span>
                      <div>
                        <div className="font-semibold text-brand-300 flex items-center gap-2">
                          100 Materi Safety Talk <span className="bg-brand-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded">Populer</span>
                        </div>
                        <div className="text-xs text-slate-400">TBM Harian K3 + Cetak Absensi</div>
                      </div>
                    </Link>
                    <Link href="/tools/kalkulator-k3" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <Wrench className="w-4 h-4 text-brand-400" />
                      <div>
                        <div className="font-semibold text-white">Kalkulator K3</div>
                        <div className="text-xs text-slate-400">FR, SR & Jam Kerja Selamat</div>
                      </div>
                    </Link>
                    <Link href="/tools/risk-matrix" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <span className="text-lg">📊</span>
                      <div>
                        <div className="font-semibold text-white">Risk Matrix 5x5</div>
                        <div className="text-xs text-slate-400">Penilaian Tingkat Risiko K3</div>
                      </div>
                    </Link>
                    <Link href="/tools/jsa-builder" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <span className="text-lg">📝</span>
                      <div>
                        <div className="font-semibold text-white">JSA Builder</div>
                        <div className="text-xs text-slate-400">Job Safety Analysis Otomatis</div>
                      </div>
                    </Link>
                    <Link href="/tools" className="p-2 text-center text-xs text-brand-400 font-semibold hover:underline">
                      Lihat Semua 13 Tools Gratis →
                    </Link>
                  </div>
                )}
              </div>

              {/* Platform Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('platform')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/50 flex items-center gap-1 transition-colors">
                  Platform K3 <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'platform' && (
                  <div className="absolute top-full left-0 w-72 bg-navy-900 border border-slate-700 rounded-xl shadow-2xl p-2 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link href="/glosarium" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <BookOpen className="w-4 h-4 text-brand-400" />
                      <div>
                        <div className="font-semibold text-white">Glosarium K3</div>
                        <div className="text-xs text-slate-400">180+ Istilah & Regulasi</div>
                      </div>
                    </Link>
                    <Link href="/insiden" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <span className="text-lg">⚠️</span>
                      <div>
                        <div className="font-semibold text-white">Database Insiden</div>
                        <div className="text-xs text-slate-400">Analisis Kasus K3 Indonesia</div>
                      </div>
                    </Link>
                    <Link href="/resources" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <span className="text-lg">📄</span>
                      <div>
                        <div className="font-semibold text-white">Resource & Template</div>
                        <div className="text-xs text-slate-400">Download SOP & Dokumen K3</div>
                      </div>
                    </Link>
                    <Link href="/lowongan" className="p-2.5 rounded-lg hover:bg-slate-800 flex items-center gap-3 text-sm">
                      <span className="text-lg">💼</span>
                      <div>
                        <div className="font-semibold text-white">Lowongan HSE</div>
                        <div className="text-xs text-slate-400">Info Karir Safety Officer</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/artikel"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith('/artikel') ? 'text-brand-400 bg-slate-800/80' : 'text-slate-200 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Artikel
              </Link>
            </nav>

            {/* CTA WhatsApp Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-brand-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Konsultasi WhatsApp
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                aria-label="Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-navy-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 max-h-[80vh] overflow-y-auto">
            <Link
              href="/pelatihan"
              className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
            >
              📚 Katalog Program
            </Link>
            <Link
              href="/jadwal"
              className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
            >
              📅 Jadwal Pelatihan 2026
            </Link>
            <Link
              href="/tools/safety-talk"
              className="block px-3 py-2 rounded-md font-semibold text-brand-300 bg-brand-950/60 border border-brand-800"
            >
              📢 100 Materi Safety Talk (TBM)
            </Link>
            <Link
              href="/tools"
              className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
            >
              🛠️ Semua Tools K3 Online
            </Link>
            <Link
              href="/csms"
              className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
            >
              🏢 Konsultasi CSMS
            </Link>
            <Link
              href="/perpanjangan-skp"
              className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
            >
              📄 Perpanjangan SKP Ahli K3
            </Link>
            <Link
              href="/glosarium"
              className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
            >
              📖 Glosarium K3
            </Link>
            <Link
              href="/artikel"
              className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
            >
              ✍️ Artikel & Berita K3
            </Link>
            <Link
              href="/verifikasi"
              className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
            >
              ✅ Verifikasi Sertifikat
            </Link>

            <div className="pt-2">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20program%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-center py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30"
              >
                <Phone className="w-4 h-4" />
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
