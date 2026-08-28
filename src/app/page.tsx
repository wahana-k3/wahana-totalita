import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Phone,
  FileText,
  Search,
  Wrench,
  BookOpen,
  Building2,
  Briefcase
} from 'lucide-react';
import trainingsData from '@/data/trainings.json';
import articlesData from '@/data/articles.json';
import safetyTalksData from '@/data/safety_talks.json';

export default function HomePage() {
  const featuredTrainings = trainingsData.slice(0, 6);
  const recentArticles = articlesData.slice(0, 3);
  const popularSafetyTalks = safetyTalksData.slice(0, 4);

  const categories = [
    {
      name: "Keselamatan Kerja (K3)",
      slug: "k3",
      count: "50+ Program",
      desc: "Ahli K3 Umum, Konstruksi, Listrik, Kimia, Kebakaran, P3K & Ketinggian.",
      icon: "🦺"
    },
    {
      name: "Sistem Manajemen & ISO",
      slug: "system-management",
      count: "20+ Program",
      desc: "SMK3 PP 50/2012, ISO 45001, ISO 9001, ISO 14001, CSMS & TOT Instruktur.",
      icon: "📜"
    },
    {
      name: "Lingkungan & B3",
      slug: "lingkungan",
      count: "15+ Program",
      desc: "Pengelolaan Limbah B3, AMDAL, POPAL, POPDA & Higiene Industri.",
      icon: "🌱"
    },
    {
      name: "Pertambangan (Mining)",
      slug: "mining",
      count: "10+ Program",
      desc: "Pengawas Operasional Pertama (POP), POM, POU & Keselamatan Tambang.",
      icon: "⛏️"
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Accreditation Chip */}
            <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-brand-500/30 text-brand-300 px-4 py-1.5 rounded-full text-xs font-semibold shadow-inner">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <span>PJK3 KEMNAKER RI • BNSP • PaDi UMKM • Vendor LPSE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Pelatihan K3 & Sertifikasi BNSP <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-emerald-300 to-brand-500">
                Terakreditasi Resmi di Indonesia
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
              Tingkatkan kompetensi HSE dan raih lisensi resmi KEMNAKER RI & BNSP. Tersedia kelas Online interaktif via Zoom maupun Tatap Muka di Yogyakarta & In-House seluruh Indonesia.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20program%20pelatihan%20K3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-brand-500/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 text-base"
              >
                <Phone className="w-5 h-5 fill-current" />
                Konsultasi Jadwal & Biaya via WA
              </a>

              <Link
                href="/jadwal"
                className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white font-semibold px-7 py-4 rounded-xl flex items-center gap-2 transition-all hover:border-slate-600 text-base"
              >
                <Calendar className="w-5 h-5 text-brand-400" />
                Lihat Jadwal 2026
              </Link>
            </div>

            {/* Key Trust Stats */}
            <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/80">
              <div className="p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">100+</div>
                <div className="text-xs text-slate-400 mt-1">Program Sertifikasi</div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-400">1,500+</div>
                <div className="text-xs text-slate-400 mt-1">Klien Perusahaan & BUMN</div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99.8%</div>
                <div className="text-xs text-slate-400 mt-1">Tingkat Kelulusan</div>
              </div>
              <div className="p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-400">100%</div>
                <div className="text-xs text-slate-400 mt-1">Sertifikat Resmi Terverifikasi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── High-Impact Banner: 100 Materi Safety Talk Spotlight ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-900 via-navy-900 to-navy-950 border border-brand-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-80 h-80 bg-brand-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 text-brand-300 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                📢 Fitur Unggulan HSE
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                100 Materi Safety Talk (TBM) Harian K3 2026
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Koleksi terlengkap materi Toolbox Meeting harian: fakta statistik, poin diskusi interaktif, langkah pencegahan, hingga lembar cetak daftar hadir siap pakai untuk supervisor & HSE officer.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <Link
                href="/tools/safety-talk"
                className="w-full sm:w-auto bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30 transition-all text-sm whitespace-nowrap"
              >
                Buka 100 Materi Gratis →
              </Link>
              <Link
                href="/tools"
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm border border-slate-700 whitespace-nowrap"
              >
                Lihat 13 Tools K3 Lainnya
              </Link>
            </div>
          </div>

          {/* Quick Preview Cards */}
          <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularSafetyTalks.map((talk) => (
              <Link
                key={talk.id}
                href="/tools/safety-talk"
                className="bg-navy-950/80 border border-slate-800 hover:border-brand-500/50 p-4 rounded-xl transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-brand-400 font-medium mb-1">
                  <span>Topik #{talk.id}</span>
                  <span className="capitalize bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300">{talk.category}</span>
                </div>
                <h4 className="font-semibold text-white text-sm group-hover:text-brand-300 line-clamp-1 transition-colors">
                  {talk.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {talk.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Training Categories ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bidang Pelatihan & Sertifikasi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Pilih kategori spesialisasi sesuai kebutuhan profesi dan kepatuhan regulasi perusahaan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/pelatihan/${cat.slug}`}
              className="bg-white border border-slate-200 hover:border-brand-500 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
                    {cat.count}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {cat.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                Jelajahi Program →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Programs Grid ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Program Sertifikasi Paling Diminati
            </h2>
            <p className="text-slate-600 text-sm">
              Sertifikat resmi KEMNAKER RI & BNSP dengan jadwal batch terdekat setiap bulan.
            </p>
          </div>

          <Link
            href="/pelatihan"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            Lihat Semua 105 Program <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrainings.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 border border-brand-200 text-[11px] font-bold px-2.5 py-1 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {item.certification}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded">
                    {item.mode}
                  </span>
                </div>

                <Link href={`/pelatihan/${item.slug}`}>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 hover:text-brand-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {item.description || 'Program pembinaan dan sertifikasi kompetensi resmi untuk meningkatkan standar keselamatan kerja perusahaan.'}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                  <div>⏱️ <strong>{item.duration_days} Hari</strong></div>
                  <div>📜 Masa Berlaku <strong>{item.validity_months || 36} Bulan</strong></div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] text-slate-400">Investasi Mulai</div>
                  <div className="font-extrabold text-slate-900 text-base">
                    {item.price > 0 ? `Rp ${Number(item.price).toLocaleString('id-ID')}` : 'Hubungi CS'}
                  </div>
                </div>

                <a
                  href={`https://wa.me/6287759151278?text=${encodeURIComponent(item.wa_text || `Halo Wahana Totalita, saya tertarik daftar ${item.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors"
                >
                  Daftar via WA
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Layanan Khusus Perusahaan & CSMS ─────────────────────── */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="text-brand-400 font-bold text-xs uppercase tracking-wider">Solusi Korporat</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Konsultasi CSMS, SMK3 & Pendampingan Sertifikasi
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Kami mendampingi ratusan kontraktor dan perusahaan meraih sertifikat kelayakan CSMS Pertamina/PLN/Mining, audit SMK3 PP 50/2012, dan pengadaan instansi pemerintah.
            </p>
            <div className="pt-2">
              <Link
                href="/csms"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                Pelajari Layanan CSMS →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/csms" className="bg-slate-800/80 border border-slate-700 hover:border-brand-500 p-6 rounded-2xl transition-all">
              <Building2 className="w-8 h-8 text-brand-400 mb-3" />
              <h3 className="font-bold text-white text-base mb-1">Penyusunan Dokumen CSMS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pembuatan dokumen HSE plan, risk assessment, dan audit pra-kualifikasi tender migas & pertambangan.
              </p>
            </Link>

            <Link href="/perpanjangan-skp" className="bg-slate-800/80 border border-slate-700 hover:border-brand-500 p-6 rounded-2xl transition-all">
              <FileText className="w-8 h-8 text-brand-400 mb-3" />
              <h3 className="font-bold text-white text-base mb-1">Perpanjangan SKP KEMNAKER</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pengurusan renewal SKP dan Lisensi K3 sebelum masa berlaku 3 tahun habis secara resmi dan cepat.
              </p>
            </Link>

            <Link href="/layanan-pemerintah" className="bg-slate-800/80 border border-slate-700 hover:border-brand-500 p-6 rounded-2xl transition-all">
              <Award className="w-8 h-8 text-brand-400 mb-3" />
              <h3 className="font-bold text-white text-base mb-1">Pengadaan Instansi & BUMN</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tersedia di PaDi UMKM dan e-Katalog LPSE dengan faktur pajak dan administrasi lengkap.
              </p>
            </Link>

            <Link href="/smk3" className="bg-slate-800/80 border border-slate-700 hover:border-brand-500 p-6 rounded-2xl transition-all">
              <ShieldCheck className="w-8 h-8 text-brand-400 mb-3" />
              <h3 className="font-bold text-white text-base mb-1">Pendampingan Audit SMK3</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Persiapan audit 64, 122, atau 166 kriteria untuk meraih Bendera Emas / Perak SMK3 Kemnaker.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Latest Articles & K3 Guides ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Artikel & Panduan Regulasi K3 Terbaru
            </h2>
            <p className="text-slate-600 text-sm">
              Edukasi mendalam seputar perundang-undangan, tips keselamatan kerja, dan standar BNSP.
            </p>
          </div>

          <Link
            href="/artikel"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            Lihat Semua 94 Artikel <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-block bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {art.category || 'K3'}
                </span>
                <Link href={`/artikel/${art.slug}`}>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 hover:text-brand-600 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                </Link>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {art.meta_desc || 'Panduan lengkap keselamatan dan kesehatan kerja menurut regulasi Kementerian Ketenagakerjaan RI.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Wahana Totalita</span>
                <Link href={`/artikel/${art.slug}`} className="font-bold text-brand-600 hover:underline">
                  Baca Selengkapnya →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Frequently Asked Questions (FAQ) ─────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-slate-600 text-sm">
            Jawaban lengkap seputar pelatihan, sertifikasi, dan legalitas Wahana Totalita.
          </p>
        </div>

        <div className="space-y-4">
          <details className="bg-white border border-slate-200 rounded-2xl p-5 group open:border-brand-500 transition-all shadow-sm">
            <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
              <span>Apakah sertifikat yang diterbitkan resmi dari KEMNAKER RI & BNSP?</span>
              <span className="text-brand-600 font-bold group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              Ya, seluruh sertifikat pelatihan yang kami selenggarakan diterbitkan secara resmi oleh Kementerian Ketenagakerjaan RI (KEMNAKER RI) atau Badan Nasional Sertifikasi Profesi (BNSP) dan dapat diverifikasi keasliannya di portal resmi kementerian maupun menu Verifikasi Sertifikat di website kami.
            </p>
          </details>

          <details className="bg-white border border-slate-200 rounded-2xl p-5 group open:border-brand-500 transition-all shadow-sm">
            <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
              <span>Apakah pelatihan bisa diikuti secara Online via Zoom?</span>
              <span className="text-brand-600 font-bold group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              Ya, kami menyediakan kelas Online interaktif via Zoom untuk sebagian besar program pelatihan sertifikasi K3, TOT Instruktur, dan Auditor. Sertifikat yang didapatkan sama persis dan memiliki legalitas penuh yang berlaku di seluruh Indonesia.
            </p>
          </details>

          <details className="bg-white border border-slate-200 rounded-2xl p-5 group open:border-brand-500 transition-all shadow-sm">
            <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
              <span>Bagaimana cara mendaftar pelatihan di Wahana Totalita?</span>
              <span className="text-brand-600 font-bold group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              Anda cukup memilih program yang diinginkan dan klik tombol Konsultasi via WhatsApp. Tim CS kami akan mengirimkan jadwal terdekat, silabus materi lengkap, dan formulir pendaftaran.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
