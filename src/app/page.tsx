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
  Camera,
  BookOpen,
  Wrench,
  Download,
  FileText
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
    <div className="space-y-20 pb-20 bg-slate-50">
      {/* ─── Hero Section: Executive Business Authority ────────────────────────── */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-850">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Authority Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-emerald-500/40 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>PJK3 RESMI KEMNAKER RI • LSP BNSP TERLISENSI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-display">
              Solusi Sertifikasi K3 & Konsultasi HSE Terpercaya untuk <span className="text-emerald-400">Industri Nasional</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              Lembaga pembinaan K3 resmi penunjukan <strong>Kementerian Ketenagakerjaan RI</strong> dan <strong>Badan Nasional Sertifikasi Profesi (BNSP)</strong>. Membantu lebih dari <strong>1.500+ perusahaan</strong> memenuhi regulasi wajib, lolos audit SMK3, dan memenangkan tender CSMS.
            </p>

            {/* Direct Conversion Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/pelatihan"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold px-8 py-4 rounded-xl shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 text-sm sm:text-base group"
              >
                <span>Lihat 147 Program Pelatihan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20minta%20proposal%20penawaran%20dan%20silabus%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-white border border-slate-700 hover:border-emerald-500/50 font-bold px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
              >
                <Phone className="w-4 h-4 text-emerald-400 fill-current" />
                <span>Konsultasi CS WhatsApp</span>
              </a>
            </div>

            {/* Trust Metric Counters */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">147+</div>
                <div className="text-xs text-slate-400">Skema & Program K3</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">1,500+</div>
                <div className="text-xs text-slate-400">Klien BUMN & Swasta</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
                <div className="text-xs text-slate-400">Garansi Kelulusan</div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Lead Hunter Proposal Box */}
          <div className="lg:col-span-5 bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Layanan Cepat 2026</div>
                <h3 className="font-extrabold text-white text-lg sm:text-xl font-display">
                  Minta Proposal & Silabus Kilat
                </h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                Respon &lt; 5 Mnt
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between hover:border-emerald-500/40 transition-colors">
                <div>
                  <div className="font-bold text-white text-sm">Ahli K3 Umum (AK3U)</div>
                  <div className="text-slate-400 text-[11px]">Sertifikasi KEMNAKER RI • Blended Zoom</div>
                </div>
                <Link
                  href="/pelatihan/pelatihan-ahli-k3-umum-sertifikasi-kemnaker-ri"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs"
                >
                  Detail →
                </Link>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between hover:border-emerald-500/40 transition-colors">
                <div>
                  <div className="font-bold text-white text-sm">Perpanjangan SKP & Lisensi K3</div>
                  <div className="text-slate-400 text-[11px]">Proses administratif tanpa ulang pelatihan</div>
                </div>
                <Link
                  href="/perpanjangan-skp"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs"
                >
                  Syarat →
                </Link>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between hover:border-emerald-500/40 transition-colors">
                <div>
                  <div className="font-bold text-white text-sm">Penyusunan Dokumen CSMS</div>
                  <div className="text-slate-400 text-[11px]">Prakualifikasi tender migas & BUMN</div>
                </div>
                <Link
                  href="/csms"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs"
                >
                  Konsul →
                </Link>
              </div>
            </div>

            {/* Direct RFQ Action Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20minta%20penawaran%20harga%20dan%20proposal%20In-House%20Training%20perusahaan%20kami"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Minta Penawaran In-House / Corporate</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Enterprise Client Showcase Wall: 1,500+ Corporate Trust ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Dipercaya 1,500+ Perusahaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Mitra K3 Terpilih Sektor Energi, Konstruksi & BUMN
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Mulai dari BUMN strategis, perusahaan migas multinasional, hingga perguruan tinggi terkemuka mempercayakan sertifikasi dan kepatuhan K3 kepada Wahana Totalita.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {realClientLogos.map((client, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center justify-center h-24 hover:bg-white hover:border-emerald-500/40 hover:shadow-md transition-all group"
                title={client.name}
              >
                <div className="relative w-full h-12 flex items-center justify-center">
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={100}
                    height={40}
                    className="max-h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3-Step Interactive Lead Hunter Section ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Kebutuhan Sertifikasi Anda
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Pilih Jalur Sesuai Kebutuhan Karir & Perusahaan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Perorangan & Fresh Graduate */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Perorangan / Jobseeker</span>
                <h3 className="text-lg font-bold text-slate-900">Fresh Graduate & Calon HSE Officer</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tingkatkan daya saing kerja dengan sertifikat resmi Ahli K3 Umum KEMNAKER RI. Tersedia program bimbingan karir dan pemahaman regulasi K3 industri terkini.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sertifikat Resmi Kemnaker RI & SKP</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Modul, Flashdisk, & Rekaman Zoom</span>
                </li>
              </ul>
            </div>

            <Link
              href="/pelatihan/pelatihan-ahli-k3-umum-sertifikasi-kemnaker-ri"
              className="w-full bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span>Daftar Ahli K3 Umum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: In-House Training Perusahaan */}
          <div className="bg-gradient-to-b from-slate-950 to-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative flex flex-col justify-between space-y-6">
            <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
              Paling Populer
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Perusahaan & Pabrik</span>
                <h3 className="text-lg font-bold text-white font-display">In-House Training di Lokasi Klien</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pelatihan massal karyawan di tempat kerja Anda dengan silabus yang disesuaikan dengan jenis bahaya spesifik pabrik/proyek. Hemat biaya perjalanan.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Jadwal & Lokasi Fleksibel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instruktur Senior & Praktisi Industri</span>
                </li>
              </ul>
            </div>

            <Link
              href="/perusahaan"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950"
            >
              <span>Minta Proposal In-House</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Konsultasi CSMS & Perpanjangan SKP */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Kontraktor & Vendor</span>
                <h3 className="text-lg font-bold text-slate-900">Perpanjangan SKP & CSMS Tender</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Urus perpanjangan lisensi K3 yang hampir expired tanpa repot, serta pendampingan penyusunan dokumen CSMS untuk lolos prakualifikasi tender BUMN.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Perpanjangan SKP Tanpa Pelatihan Ulang</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dokumen CSMS Siap Audit & Verifikasi</span>
                </li>
              </ul>
            </div>

            <Link
              href="/perpanjangan-skp"
              className="w-full bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span>Layanan Perpanjangan SKP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Training Programs: 147 Programs ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Katalog Pelatihan Terlengkap
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
              Program Pelatihan & Sertifikasi K3 Populer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tersedia 147 program pembinaan Kemenaker RI & BNSP dengan jadwal rutin setiap bulan.
            </p>
          </div>

          <Link
            href="/pelatihan"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:shadow"
          >
            <span>Buka Semua 147 Program</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrainings.map((c) => {
            const photoSrc = getTrainingPhoto(c.slug || c.id, c.image_path);
            return (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Dedicated Program Photo / Flyer Banner */}
                  <div className="relative w-full h-48 bg-slate-900 overflow-hidden">
                    <Image
                      src={photoSrc}
                      alt={c.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {c.certification}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border border-slate-700">
                      {c.duration_days ? `${c.duration_days} Hari` : 'Jadwal Rutin'}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <Link href={`/pelatihan/${c.slug}`}>
                      <h3 className="font-bold text-base text-slate-900 hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                        {c.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {c.description || 'Program pembinaan kompetensi K3 berstandar nasional Kemnaker RI dan BNSP.'}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Investasi</div>
                    <div className="text-sm font-extrabold text-slate-900">
                      {c.price > 0 ? `Rp ${Number(c.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                    </div>
                  </div>

                  <Link
                    href={`/pelatihan/${c.slug}`}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    Daftar Sekarang
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 67-Photo Documentation Showcase ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Bukti Pembinaan Nyata
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
              Galeri Dokumentasi Pelatihan
            </h2>
          </div>
          <Link
            href="/galeri"
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Semua 67 Foto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryPreviews.map((g, idx) => (
            <Link
              key={idx}
              href="/galeri"
              className="group relative h-56 rounded-3xl overflow-hidden shadow-sm border border-slate-200 block"
            >
              <Image
                src={g.src}
                alt={g.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-bold line-clamp-2">
                {g.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── HSE Tools & 100 Safety Talks Showcase ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Free HSE Resources & Tools
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              100 Materi Safety Talk & 10 Interactive K3 Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Dukung briefing harian tim proyek Anda dengan lembar materi safety talk lengkap dengan presensi hadir siap cetak, serta kalkulator kebisingan, JSA builder, dan IBPR matrix gratis.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/tools/safety-talk"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <BookOpen className="w-4 h-4" />
                <span>Buka 100 Safety Talks</span>
              </Link>
              <Link
                href="/tools"
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Buka Semua Tools K3</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-3 text-xs">
            <div className="font-bold text-emerald-400 border-b border-slate-800 pb-2">
              Topik Safety Talk Populer:
            </div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bahaya Bekerja di Ketinggian & Full Body Harness</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Prosedur Masuk Ruang Terbatas (Confined Space)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Pengendalian Bahaya Listrik & LOTO</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Tanggap Darurat Kebakaran & Penggunaan APAR</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Final Conversion CTA ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-950 text-white border border-emerald-500/30 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
            Konsultasi K3 Gratis 24/7
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl mx-auto font-display">
            Siap Membangun Budaya K3 Terbaik di Perusahaan Anda?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Hubungi konsultan Wahana Totalita hari ini untuk konsultasi jadwal, perpanjangan lisensi, atau penawaran in-house training korporat.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pelatihan%20K3"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Chat WhatsApp Konsultan (0877-5915-1278)</span>
            </a>
            <Link
              href="/pelatihan"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-8 py-4 rounded-xl border border-slate-700"
            >
              Lihat Semua Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
