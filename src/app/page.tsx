import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Phone,
  ArrowRight,
  Search,
  Calendar,
  Clock,
  Sparkles,
  Building2,
  FileCheck2,
  Star,
  Check,
  Zap,
  HelpCircle,
  Camera
} from 'lucide-react';
import trainingsData from '@/data/trainings.json';
import articlesData from '@/data/articles.json';
import safetyTalksData from '@/data/safety_talks.json';
import { getTrainingPhoto } from '@/lib/trainingImages';

export default function HomePage() {
  const featuredTrainings = trainingsData.slice(0, 6);
  const latestArticles = articlesData.slice(0, 3);
  const totalSafetyTalks = safetyTalksData.length;

  const realClientLogos = [
    { name: 'PT Pertamina (Persero)', src: '/images/clients/78a55-pertamina.png' },
    { name: 'PT PLN (Persero)', src: '/images/clients/58303-pln-persero.png' },
    { name: 'PT Wijaya Karya (WIKA)', src: '/images/clients/1bbc3-wika.png' },
    { name: 'PT Waskita Karya (Persero)', src: '/images/clients/5147b-waskita.png' },
    { name: 'PT Total Bangun Persada', src: '/images/clients/1c571-total-bangun-persada.png' },
    { name: 'Samsung C&T Corporation', src: '/images/clients/d23da-samsung-cnt.png' },
    { name: 'PetroChina International', src: '/images/clients/d9f47-petrochina.jpg' },
    { name: 'PT Adaro Energy Indonesia', src: '/images/clients/c306e-adaro.png' },
    { name: 'PT Pamapersada Nusantara', src: '/images/clients/9c87b-pamapersada-1-.jpg' },
    { name: 'PT Telkomsel', src: '/images/clients/b5c3d-telkomsel-logo-capi.png' },
    { name: 'PT Sumber Alfaria Trijaya (Alfamart)', src: '/images/clients/76c17-logo-alfamart.png' },
    { name: 'PT Kereta Api Indonesia (KAI)', src: '/images/clients/48046-kai.png' },
    { name: 'PT ANTAM Tbk', src: '/images/clients/78168-pt-antam.png' },
    { name: 'PT Petrokimia Gresik', src: '/images/clients/46e2f-petrokimia.png' },
    { name: 'Universitas Gadjah Mada (UGM)', src: '/images/clients/8e764-ugm-clien.jpg' },
    { name: 'Universitas Brawijaya', src: '/images/clients/3de95-universitas-brawijaya-logo.jpg' },
  ];

  const galleryPreviews = [
    { src: '/images/galeri/PELATIHAN DAMKAR.JPG', title: 'Simulasi Pemadaman Kebakaran (Damkar K3)' },
    { src: '/images/galeri/IMG_1945.JPG', title: 'Praktek Bekerja di Ketinggian & Full Body Harness' },
    { src: '/images/galeri/DSC_0100.JPG', title: 'Pelatihan Sertifikasi Ahli K3 Umum Batch Yogyakarta' },
    { src: '/images/galeri/FOTO BARENG ada ibu sopian nor.jpg', title: 'Uji Kompetensi Asesor BNSP & Kelulusan Peserta' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold shadow-inner">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>PJK3 Resmi KEMNAKER RI • LSP BNSP Terlisensi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
              Tingkatkan Karir & Standar Keselamatan Perusahaan Bersama <span className="text-emerald-400">Wahana Totalita</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              Lembaga pembinaan K3 resmi terakreditasi penunjukan <strong>Kementerian Ketenagakerjaan RI</strong> dan <strong>Badan Nasional Sertifikasi Profesi (BNSP)</strong>. Melayani lebih dari 1.500+ perusahaan di seluruh Indonesia.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/pelatihan"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm sm:text-base group"
              >
                <span>Lihat 147 Program Pelatihan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20program%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 text-emerald-400 fill-current" />
                <span>Konsultasi CS WhatsApp</span>
              </a>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">147+</div>
                <div className="text-xs text-slate-400">Skema & Program K3</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">1,500+</div>
                <div className="text-xs text-slate-400">Klien Korporat</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
                <div className="text-xs text-slate-400">Garansi Kelulusan</div>
              </div>
            </div>
          </div>

          {/* Quick Schedule / Action Card */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Jadwal Batch Terdekat</div>
                <h3 className="font-extrabold text-white text-lg sm:text-xl">Pendaftaran Dibuka</h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                Tahun 2026
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-800/70 border border-slate-700/60 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">Ahli K3 Umum (AK3U)</div>
                  <div className="text-slate-400 text-[11px]">Sertifikasi KEMNAKER RI • Blended Zoom</div>
                </div>
                <Link
                  href="/pelatihan/ahli-k3-umum-sertifikasi-kemnaker-ri"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  Daftar
                </Link>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">Training of Trainer (TOT)</div>
                  <div className="text-slate-400 text-[11px]">Instruktur Level 4 BNSP • Online</div>
                </div>
                <Link
                  href="/pelatihan/pelatihan-dan-sertifikasi-training-of-trainer-tot-level-4-sertifikasi-bnsp"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  Daftar
                </Link>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">POP Pertambangan</div>
                  <div className="text-slate-400 text-[11px]">Pengawas Operasional Pertama BNSP</div>
                </div>
                <Link
                  href="/pelatihan/pengawas-operasional-pertama-pop-pertambangan-sertifikasi-bnsp"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  Daftar
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/jadwal"
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 rounded-xl block text-center border border-slate-700 transition-colors"
              >
                Lihat Kalender Lengkap Jadwal 2026 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Real Client Logos Section (1,500+ Klien) ────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Dipercaya 1,500+ Perusahaan & Lembaga
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Klien Korporat, BUMN & Institusi Pendidikan
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Telah dipercaya oleh berbagai BUMN terkemuka, kontraktor multinasional, industri tambang, migas, dan universitas negeri di Indonesia.
          </p>
        </div>

        {/* Real Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 items-center">
          {realClientLogos.map((client, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 h-20 sm:h-24 flex items-center justify-center shadow-sm hover:shadow-md hover:border-emerald-500 transition-all group"
              title={client.name}
            >
              <img
                src={client.src}
                alt={client.name}
                className="max-h-12 max-w-[90%] object-contain grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── 100 Safety Talk Spotlight Tool ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Tool HSE Terpopuler #1
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Database 100 Materi Safety Talk (TBM) & Lembar Absensi
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Tersedia <strong>{totalSafetyTalks} topik materi briefing K3 harian</strong> lengkap dengan poin diskusi teknis, langkah aksi pencegahan, statistik kecelakaan kerja nyata, dan fitur cetak lembar daftar hadir (attendance sheet) format A4.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/tools/safety-talk"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-xs sm:text-sm"
                >
                  <span>Buka 100 Topik Safety Talk Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tools"
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold px-5 py-3.5 rounded-xl text-xs sm:text-sm"
                >
                  Lihat Semua Tools K3
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3 text-xs">
              <div className="font-bold text-white text-sm">Topik Populer Safety Talk:</div>
              <div className="space-y-2">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">#01</span> 3 Detik yang Menyelamatkan Nyawa (Take 5)
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">#04</span> Inspeksi Full Body Harness Sebelum Dipakai
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">#07</span> Lockout / Tagout (LOTO) Keselamatan Listrik
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Popular Training Programs Grid ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Program Unggulan</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pelatihan & Sertifikasi K3 Terpopuler
            </h2>
          </div>
          <Link
            href="/pelatihan"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Lihat Semua 147 Pelatihan →
          </Link>
        </div>

        {/* Trainings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrainings.map((item) => {
            const photoUrl = getTrainingPhoto(item.slug, (item as any).image_path);
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  <Link href={`/pelatihan/${item.slug}`} className="block relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={photoUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {item.certification}
                      </span>
                      <span className="text-[11px] font-semibold text-white capitalize bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                        {item.mode}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 space-y-3">
                    <Link href={`/pelatihan/${item.slug}`}>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description || 'Program pembinaan dan sertifikasi kompetensi resmi untuk meningkatkan standar keselamatan kerja.'}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                      <div>⏱️ <strong>{item.duration_days} Hari</strong></div>
                      <div>📜 <strong>{item.validity_months || 36} Bulan</strong></div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-auto border-t border-slate-100 flex items-center justify-between gap-2 pt-4">
                  <div>
                    <div className="text-[11px] text-slate-400">Investasi Mulai</div>
                    <div className="font-extrabold text-slate-900 text-base">
                      {item.price > 0 ? `Rp ${Number(item.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/pelatihan/${item.slug}`}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                    >
                      Detail
                    </Link>
                    <a
                      href={`https://wa.me/6287759151278?text=${encodeURIComponent(item.wa_text || `Halo Wahana Totalita, saya tertarik daftar ${item.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Daftar
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CSMS & SMK3 Corporate Service Banner ────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
              Layanan Konsultasi Korporat
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Butuh Dokumen CSMS untuk Lolos Tender BUMN & Migas?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Kami mendampingi kontraktor dan vendor dalam penyusunan sistem Contractor Safety Management System (CSMS) dan audit SMK3 PP 50/2012 agar siap lolos prakualifikasi Pertamina, PLN, Adaro, dan instansi pemerintah.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/csms"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md"
              >
                Pelajari Layanan CSMS →
              </Link>
              <Link
                href="/smk3"
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm"
              >
                Sertifikasi SMK3 PP 50/2012
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
            <div className="font-bold text-white text-sm">Paket Pendampingan CSMS:</div>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Penyusunan HSE Plan & HIRADC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pemenuhan 6 Tahap Kriteria CSMS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Simulasi Pertanyaan Audit CSMS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garansi Lolos Pra-Kualifikasi Tender</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Real Documentation & Photo Gallery ──────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Dokumentasi Nyata</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <Camera className="w-7 h-7 text-emerald-600" />
              Galeri Kegiatan & Praktek Lapangan K3
            </h2>
          </div>
          <Link
            href="/galeri"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Buka Semua Galeri Foto →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryPreviews.map((g, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={g.src}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {g.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Latest Articles & Guides ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Pusat Edukasi</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Artikel & Panduan Regulasi K3 Terbaru
            </h2>
          </div>
          <Link
            href="/artikel"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Lihat Semua 146 Artikel →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {art.category || 'K3'}
                </span>

                <Link href={`/artikel/${art.slug}`}>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {art.meta_desc || 'Panduan lengkap dan informasi regulasi K3 di Indonesia oleh tim konsultan Wahana Totalita.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{art.author || 'Wahana Totalita'}</span>
                <Link
                  href={`/artikel/${art.slug}`}
                  className="font-bold text-emerald-700 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  Baca Panduan →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Frequently Asked Questions (FAQ) ────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Tanya Jawab</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-3">
          <details className="bg-white border border-slate-200 rounded-2xl p-5 group open:border-emerald-500 transition-all">
            <summary className="font-bold text-slate-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between">
              <span>Apakah sertifikat yang diterbitkan resmi terdaftar di KEMNAKER RI / BNSP?</span>
              <span className="text-emerald-700 font-bold group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              Ya, seluruh sertifikasi yang diselenggarakan melalui jalur Kemnaker RI diterbitkan langsung oleh Kementerian Ketenagakerjaan RI lengkap dengan SKP dan Lisensi K3 (Kartu Kewenangan). Untuk jalur BNSP, sertifikat berlogo Garuda Nasional dengan nomor registrasi BNSP resmi yang berlaku secara nasional.
            </p>
          </details>

          <details className="bg-white border border-slate-200 rounded-2xl p-5 group open:border-emerald-500 transition-all">
            <summary className="font-bold text-slate-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between">
              <span>Bagaimana jika peserta tidak lulus ujian kompetensi?</span>
              <span className="text-emerald-700 font-bold group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              Wahana Totalita memberikan <strong>Garansi Ujian Ulang Gratis (Remedial)</strong> sampai peserta dinyatakan kompeten dan berhak mendapatkan sertifikat tanpa dikenakan biaya pelatihan ulang.
            </p>
          </details>

          <details className="bg-white border border-slate-200 rounded-2xl p-5 group open:border-emerald-500 transition-all">
            <summary className="font-bold text-slate-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between">
              <span>Apakah tersedia program In-House Training untuk perusahaan di luar Yogyakarta?</span>
              <span className="text-emerald-700 font-bold group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              Tentu. Kami melayani In-House Training di seluruh wilayah Indonesia (Jakarta, Surabaya, Balikpapan, Medan, Makassar, dll.) dengan jadwal dan silabus materi yang dapat disesuaikan dengan kebutuhan operasional perusahaan Anda.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
