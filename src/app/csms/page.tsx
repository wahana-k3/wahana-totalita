import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Building2,
  Phone,
  FileText,
  Clock,
  Award,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Download
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Jasa Konsultasi CSMS & Pendampingan Lolos Tender BUMN / Migas | Wahana Totalita',
  description: 'Jasa pembuatan dokumen CSMS (Contractor Safety Management System) profesional bergaransi lolos pra-kualifikasi tender Pertamina, PLN, Migas, dan BUMN.',
  alternates: {
    canonical: 'https://www.wahanatotalita.com/csms/',
  },
};

export default function CSMSPage() {
  const csmsStages = [
    {
      num: '01',
      title: 'Risk Assessment (Penilaian Risiko Proyek)',
      desc: 'Penentuan kategori tingkat risiko pekerjaan (Low, Medium, High Risk) berdasarkan potensi bahaya di lokasi kerja pemberi kerja.'
    },
    {
      num: '02',
      title: 'Prequalification (Pra-Kualifikasi Vendor)',
      desc: 'Pemeriksaan komprehensif seluruh dokumen manual HSE, kebijakan K3, riwayat insiden, dan sertifikasi personel kontraktor.'
    },
    {
      num: '03',
      title: 'Selection (Seleksi & Evaluasi Tender)',
      desc: 'Penetapan nilai ambang batas kelulusan CSMS sebagai prasyarat wajib untuk dapat memasukkan penawaran harga komersial.'
    },
    {
      num: '04',
      title: 'Pre-Job Activity (Aktivitas Pra-Kerja)',
      desc: 'Penyusunan JSA detail, kick-off meeting, induksi keselamatan, verifikasi APD, dan penerbitan Izin Kerja Khusus (PTW).'
    },
    {
      num: '05',
      title: 'Work in Progress (Pelaksanaan Pekerjaan)',
      desc: 'Pelaksanaan safety inspection rutin, toolbox meeting harian, audit kepatuhan lapangan, dan pelaporan statistik jam kerja selamat.'
    },
    {
      num: '06',
      title: 'Final Evaluation (Evaluasi Akhir)',
      desc: 'Penilaian performa keselamatan kontraktor pasca proyek selesai sebagai dasar perpanjangan sertifikat CSMS dan penilaian vendor.'
    }
  ];

  const requiredDocs = [
    'Kebijakan K3 & Lingkungan yang Ditandatangani Direktur',
    'Manual Sistem Manajemen K3 (SMK3 / ISO 45001)',
    'Struktur Organisasi P2K3 & SKP Ahli K3 Umum KEMNAKER RI',
    'Dokumen HIRADC / IBPR Sesuai Ruang Lingkup Pekerjaan',
    'Job Safety Analysis (JSA) & Standard Operating Procedure (SOP)',
    'Rencana Tanggap Darurat (Emergency Response Plan) & Diagram Evakuasi',
    'Catatan Statistik Kecelakaan Kerja (FR & SR) 3 Tahun Terakhir',
    'Bukti Kepesertaan & Pembayaran BPJS Ketenagakerjaan Aktif',
    'Sertifikat Lisensi Operator Alat Berat / Welder / Teknisi Listrik',
    'Prosedur Pelaporan dan Investigasi Insiden / Near Miss'
  ];

  const packages = [
    {
      name: 'Paket Dokumen CSMS Standard',
      category: 'Low to Medium Risk',
      desc: 'Cocok untuk kontraktor jasa umum, pengadaan barang, atau maintenance ringan.',
      features: [
        'Penyusunan HSE Plan & Manual K3',
        'Penyusunan 10 Prosedur Wajib CSMS',
        'Template JSA & Form Inspeksi Lapangan',
        'Review Kelengkapan Legalitas Perusahaan',
        'Estimasi Pengerjaan: 5 - 7 Hari Kerja'
      ],
      popular: false
    },
    {
      name: 'Paket CSMS High Risk & BUMN',
      category: 'High Risk (Pertamina / PLN / Migas)',
      desc: 'Pendampingan penuh sampai lolos skor pra-kualifikasi tender BUMN & Kontraktor EPC.',
      features: [
        'Penyusunan Komprehensif Dokumen CSMS 6 Tahap',
        'HIRADC & Risk Matrix Spesifik Tender',
        'Penyusunan Prosedur Bekerja Ketinggian / Confined Space / Hot Work',
        'Simulasi Wawancara & Klarifikasi Auditor HSE',
        'Garansi Pendampingan Revisi Sampai Lolos Skor Tender',
        'Estimasi Pengerjaan: 7 - 14 Hari Kerja'
      ],
      popular: true
    },
    {
      name: 'Paket Terpadu CSMS + Audit SMK3',
      category: 'Corporate Enterprise',
      desc: 'Solusi lengkap dokumen CSMS plus sertifikasi SMK3 PP 50/2012 resmi Kemnaker RI.',
      features: [
        'Seluruh Fasilitas Paket High Risk',
        'Pendampingan Audit Internal SMK3 PP 50/2012',
        'Sertifikasi Personel Ahli K3 Umum & First Aider',
        'Pemeriksaan & Pengujian (Riksa Uji) Alat Kerja',
        'Pendampingan Audit Lapangan Oleh Badan Audit Terakreditasi'
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ─── Hero Banner ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-6">
          <Breadcrumbs
            items={[
              { name: 'Layanan Korporat', url: '/perusahaan' },
              { name: 'Konsultasi Dokumen CSMS' }
            ]}
          />

          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Layanan Konsultasi CSMS Bergaransi Lolos Pra-Kualifikasi Tender
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
            Jasa Pembuatan Dokumen CSMS & Pendampingan Tender BUMN / Migas
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
            Bantu perusahaan Anda menyusun sistem <strong>Contractor Safety Management System (CSMS)</strong> sesuai standar Pertamina, PLN, Medco Energi, Adaro, dan kontraktor EPC multinasional dengan garansi pemenuhan skor kelulusan tender.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20pembuatan%20dokumen%20CSMS%20untuk%20tender"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 fill-current" />
              Konsultasi CSMS via WhatsApp
            </a>

            <a
              href="#paket"
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-6 py-4 rounded-xl text-sm sm:text-base"
            >
              Lihat Paket Layanan
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* ─── What is CSMS ────────────────────────────────────────── */}
        <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Apa Itu CSMS (Contractor Safety Management System)?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            <strong>Contractor Safety Management System (CSMS)</strong> adalah sistem manajemen komprehensif yang digunakan oleh perusahaan pemilik proyek (seperti Pertamina, PLN, BUMN, dan perusahaan migas/tambang) untuk menilai dan memastikan bahwa kontraktor mitra kerja memiliki sistem keselamatan kerja yang terstandarisasi sebelum diberikan kontrak pekerjaan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Syarat Wajib Tender</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tanpa sertifikat kelulusan CSMS, perusahaan kontraktor otomatis gugur pada tahap evaluasi administrasi pra-kualifikasi tender.
              </p>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Skor Terverifikasi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap kategori pekerjaan memiliki batas minimal nilai (passing grade) yang ketat untuk kategori risiko rendah, sedang, hingga tinggi.
              </p>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Pencegahan Fatality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menjamin seluruh personel kontraktor memahami prosedur kerja aman, penggunaan APD, dan penanganan kondisi darurat di lapangan.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6 Stages of CSMS ────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Metodologi Standar</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              6 Tahapan Penilaian CSMS yang Wajib Dipenuhi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {csmsStages.map((st) => (
              <div
                key={st.num}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 relative hover:border-emerald-500 transition-all"
              >
                <span className="text-3xl font-extrabold text-emerald-600/30">
                  {st.num}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Required Documents Checklist ────────────────────────── */}
        <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Kelengkapan Berkas</span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Dokumen yang Kami Siapkan untuk CSMS Anda
              </h2>
            </div>
            <a
              href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20minta%20checklist%20dokumen%20CSMS"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Minta Checklist CSMS
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-700">
            {requiredDocs.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Packages & Pricing ──────────────────────────────────── */}
        <section id="paket" className="space-y-6 scroll-mt-24">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Pilihan Layanan</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Paket Pendampingan Dokumen CSMS
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Disesuaikan dengan tingkat risiko pekerjaan dan persyaratan tender pemberi kerja Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`bg-white border rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative transition-all ${
                  pkg.popular
                    ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    Paling Banyak Dipilih
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                      {pkg.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pkg.desc}</p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-700">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={`https://wa.me/6287759151278?text=${encodeURIComponent(`Halo Wahana Totalita, saya ingin informasi biaya & proposal untuk ${pkg.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors ${
                      pkg.popular
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Minta Penawaran Harga
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Bottom CTA Banner ───────────────────────────────────── */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white">
              Tender Ditutup Dalam Waktu Dekat?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Tim konsultan ahli K3 Wahana Totalita siap melakukan fast-track review dan penyusunan dokumen CSMS agar selesai tepat sebelum batas akhir pemasukan dokumen.
            </p>
          </div>

          <a
            href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20butuh%20bantuan%20cepat%20dokumen%20CSMS%20karena%20deadline%20tender%20mendesak"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-4 rounded-xl flex items-center gap-2 shadow-lg text-sm shrink-0 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 fill-current" />
            Chat Tim Ahli CSMS (Fast Response)
          </a>
        </section>
      </div>
    </div>
  );
}
