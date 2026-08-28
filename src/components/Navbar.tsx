'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  FileCheck2
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ─── Top Trust Announcement Bar ────────────────────────────── */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PJK3 Resmi SKP KEMNAKER RI & BNSP
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              Mitra Terdaftar PaDi UMKM (BUMN) & LPSE RI
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-slate-300">
            <Link href="/verifikasi" className="hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              Verifikasi Sertifikat
            </Link>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/6287759151278"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 font-bold text-white transition-colors"
            >
              📞 Hotline: 0877-5915-1278
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation Header ───────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Real Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo.png"
                alt="Wahana Totalita Konsultan"
                className="h-11 sm:h-13 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Beranda
              </Link>

              {/* Pelatihan Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('pelatihan')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition-colors">
                  <span>Pelatihan & Sertifikasi</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </button>

                {activeDropdown === 'pelatihan' && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/pelatihan"
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Katalog Semua Pelatihan (147 Program)</div>
                        <div className="text-[11px] text-slate-500">Sertifikasi Kemnaker RI & BNSP</div>
                      </div>
                    </Link>
                    <Link
                      href="/jadwal"
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <Calendar className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Jadwal Pelatihan 2026</div>
                        <div className="text-[11px] text-slate-500">Kelas Online Zoom & Tatap Muka</div>
                      </div>
                    </Link>
                    <Link
                      href="/perusahaan"
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <Building2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">In-House Training Perusahaan</div>
                        <div className="text-[11px] text-slate-500">Pelatihan khusus di lokasi perusahaan</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Layanan & CSMS Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('layanan')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition-colors">
                  <span>Layanan Korporat</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'layanan' && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/csms"
                      className="p-2.5 rounded-xl hover:bg-emerald-50/50 transition-colors flex items-start gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Konsultasi CSMS & Tender</div>
                        <div className="text-[11px] text-slate-500">Penyusunan dokumen lolos kualifikasi BUMN/Migas</div>
                      </div>
                    </Link>
                    <Link
                      href="/smk3"
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Audit & Sertifikasi SMK3 PP 50/2012</div>
                        <div className="text-[11px] text-slate-500">Pendampingan sertifikasi bendera emas/perak</div>
                      </div>
                    </Link>
                    <Link
                      href="/perpanjangan-skp"
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <FileCheck2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Perpanjangan SKP & Lisensi K3</div>
                        <div className="text-[11px] text-slate-500">Proses resmi Kemnaker RI cepat & bergaransi</div>
                      </div>
                    </Link>
                    <Link
                      href="/layanan-pemerintah"
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <Building2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Pengadaan Instansi Pemerintah</div>
                        <div className="text-[11px] text-slate-500">Jalur resmi LPSE, E-Katalog & PaDi UMKM</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Tools K3 Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('tools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition-colors">
                  <span>Tools K3</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                    Gratis
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {activeDropdown === 'tools' && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in-50 duration-150">
                    <Link
                      href="/tools/safety-talk"
                      className="p-2.5 rounded-xl hover:bg-emerald-50/50 transition-colors flex items-start gap-3"
                    >
                      <span className="text-lg">📢</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">100 Materi Safety Talk (TBM)</div>
                        <div className="text-[11px] text-slate-500">Lengkap dengan lembar absensi cetak</div>
                      </div>
                    </Link>
                    <Link
                      href="/tools/kalkulator-k3"
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <span className="text-lg">🧮</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Kalkulator FR & SR K3</div>
                        <div className="text-[11px] text-slate-500">Hitung Frequency & Severity Rate</div>
                      </div>
                    </Link>
                    <Link
                      href="/tools/risk-matrix"
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3"
                    >
                      <span className="text-lg">📊</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Risk Matrix 5x5 Online</div>
                        <div className="text-[11px] text-slate-500">Penilaian risiko HIRADC / IBPR</div>
                      </div>
                    </Link>
                    <Link
                      href="/tools"
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-center text-xs font-bold text-emerald-700 block mt-1"
                    >
                      Lihat Semua 13 Tools K3 →
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/galeri"
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                Galeri Foto
              </Link>

              <Link
                href="/artikel"
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Artikel & Edukasi
              </Link>
            </nav>

            {/* Right CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs xl:text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 fill-current" />
                Konsultasi WhatsApp
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="https://wa.me/6287759151278"
                className="bg-emerald-600 text-white p-2.5 rounded-xl"
              >
                <Phone className="w-4 h-4 fill-current" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Menu Drawer ─────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
            >
              Beranda
            </Link>
            <Link
              href="/pelatihan"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
            >
              Katalog Pelatihan (147 Program)
            </Link>
            <Link
              href="/jadwal"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
            >
              Jadwal Pelatihan 2026
            </Link>
            <Link
              href="/csms"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
            >
              Konsultasi CSMS & Tender
            </Link>
            <Link
              href="/tools/safety-talk"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
            >
              100 Materi Safety Talk (TBM)
            </Link>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
            >
              Tools & Kalkulator K3
            </Link>
            <Link
              href="/galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
            >
              Galeri Dokumentasi Foto
            </Link>
            <Link
              href="/artikel"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
            >
              Artikel & Edukasi K3
            </Link>
            <Link
              href="/verifikasi"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800"
            >
              Verifikasi Sertifikat
            </Link>

            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pelatihan%20K3"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 text-white font-bold text-center py-3 rounded-xl block text-sm shadow-md"
            >
              Hubungi CS via WhatsApp
            </a>
          </div>
        )}
      </header>
    </>
  );
}
