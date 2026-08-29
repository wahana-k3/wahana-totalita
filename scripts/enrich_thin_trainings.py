import os
import json

def get_standard_curriculum(name, category, certification):
    name_lower = name.lower()
    
    if 'rumah sakit' in name_lower or 'k3rs' in name_lower:
        return [
            "Dasar-dasar K3 dan Regulasi K3 Rumah Sakit (Permenkes 66/2016)",
            "Identifikasi Bahaya Biologis, Kimia, Fisik, dan Ergonomi di RS",
            "Manajemen Bahan Berbahaya dan Beracun (B3) Medis",
            "Sistem Proteksi Kebakaran dan Evakuasi Bencana di RS",
            "Pengelolaan Alat Pelindung Diri (APD) dan Pengendalian Infeksi (PPI)",
            "Investigasi Insiden dan Pelaporan Kecelakaan Kerja RS"
        ]
    elif 'migas' in name_lower or 'cepu' in name_lower:
        return [
            "Peraturan K3 Sektor Minyak dan Gas Bumi (ESDM/Migas)",
            "Sistem Izin Kerja Aman (Permit to Work / PTW) & LOTO di Area Migas",
            "Identifikasi Bahaya Gas Beracun (H2S), Mudah Terbakar & Explosive",
            "Penggunaan Self-Contained Breathing Apparatus (SCBA) & Detektor Gas",
            "Prosedur Keadaan Darurat & Penanggulangan Tumpahan Minyak",
            "Prinsip Process Safety Management (PSM) di Industri Migas"
        ]
    elif 'bangunan tinggi' in name_lower or 'tkbt' in name_lower or 'ketinggian' in name_lower or 'scaffolding' in name_lower:
        return [
            "Peraturan Perundangan K3 Bekerja Pada Ketinggian (Permenaker 09/2016)",
            "Karakteristik & Bahaya Bekerja pada Bangunan Tinggi",
            "Pemilihan, Pemeriksaan, dan Pemakaian Full Body Harness & Fall Arrester",
            "Teknik Pemasangan Anchor Point, Lifeline, dan Jaring Pengaman",
            "Sistem Penyelamatan Diri & Pertolongan Pertama di Ketinggian (Rescue)",
            "Praktek Manuver Pergerakan Aman pada Struktur Ketinggian"
        ]
    elif 'csms' in name_lower or 'kontraktor' in name_lower:
        return [
            "Konsep Dasar Contractor Safety Management System (CSMS)",
            "Tahapan Pra-Kualifikasi Dokumen HSE Plan & Risk Assessment Kontraktor",
            "Penyusunan Job Safety Analysis (JSA) & Work Permit System",
            "Pengawasan K3 Lapangan dan Monitoring Kepatuhan Sub-kontraktor",
            "Evaluasi Kinerja K3 Kontraktor & Pelaporan Akhir Proyek",
            "Audit dan Verifikasi CSMS Sesuai Standar Industri"
        ]
    elif 'kebakaran' in name_lower or 'damkar' in name_lower or 'fire' in name_lower:
        return [
            "Dasar Hukum & Manajemen Penanggulangan Kebakaran (Kepmenaker 186/1999)",
            "Teori Api, Anatomi Kebakaran, dan Klasifikasi Kelas Kebakaran",
            "Pengoperasian APAR, Hydrant Gedung, dan Sistem Sprinkler Otomatis",
            "Penyusunan Rencana Tanggap Darurat Kebakaran & Fire Drill",
            "Teknik Evakuasi Korban dan Prosedur Search and Rescue (SAR)",
            "Pemeriksaan dan Pemeliharaan Rutin Sarana Proteksi Kebakaran"
        ]
    elif 'listrik' in name_lower:
        return [
            "Regulasi K3 Listrik & Standar PUIL 2020 (Permenaker 12/2015)",
            "Identifikasi Bahaya Sengatan Listrik, Busur Api (Arc Flash) & Short Circuit",
            "Prosedur Lockout Tagout (LOTO) pada Panel & Jaringan Listrik",
            "Pemeriksaan Instalasi Penyalur Petir dan Pembumian (Grounding)",
            "Pengujian Peralatan Proteksi Listrik dan Thermal Imaging",
            "Penanganan Korban Kecelakaan Tersengat Listrik & First Aid"
        ]
    elif 'lingkungan' in name_lower or 'amdal' in name_lower or 'limbah' in name_lower or 'pppa' in name_lower or 'mpu' in name_lower:
        return [
            "Peraturan Perundangan Pengelolaan Lingkungan Hidup (UU 32/2009 & PP 22/2021)",
            "Identifikasi Sumber & Karakteristik Limbah B3 Industri",
            "Pengelolaan TPS Limbah B3, Manifest Elektronik (FESTRONIK) & Labeling",
            "Operasional Instalasi Pengolahan Air Limbah (IPAL) & Pengendalian Emisi Udara",
            "Penyusunan Dokumen Pemantauan Lingkungan (RKL-RPL / UKL-UPL)",
            "Tanggap Darurat Tumpahan Bahan Berbahaya & Pemulihan Lingkungan"
        ]
    elif 'tambang' in name_lower or 'pop' in name_lower or 'pom' in name_lower or 'pou' in name_lower:
        return [
            "Peraturan Perundangan Keselamatan Pertambangan (Kepmen ESDM 1827 K/2018)",
            "Tugas dan Tanggung Jawab Pengawas Operasional Tambang",
            "Identifikasi Bahaya dan Pengendalian Risiko (IBPR) Area Tambang",
            "Teknik Inspeksi Terencana dan Observasi Tugas K3 Pertambangan",
            "Penyelidikan Kecelakaan Tambang dan Analisis Akar Masalah",
            "Sistem Manajemen Keselamatan Pertambangan (SMKP Minerba)"
        ]
    elif 'auditor' in name_lower or 'smk3' in name_lower or 'iso' in name_lower:
        return [
            "Prinsip Dasar Sistem Manajemen K3 (PP 50/2012) & ISO 45001:2018",
            "Teknik Audit SMK3: Perencanaan, Pelaksanaan, dan Pelaporan Audit",
            "Kriteria Penilaian 64, 122, dan 166 Parameter Audit SMK3",
            "Penyusunan Temuan Ketidaksesuaian (NCR) dan Tindakan Korektif (CAPA)",
            "Tinjauan Manajemen dan Peningkatan Berkelanjutan (Continual Improvement)",
            "Simulasi Audit Lapangan dan Wawancara Auditee"
        ]
    else:
        # Standard robust K3 competency curriculum
        return [
            "Peraturan Perundangan K3 Nasional & Kebijakan Keselamatan Perusahaan",
            "Identifikasi Bahaya, Penilaian Risiko, dan Penentuan Pengendalian (IBPR/HIRADC)",
            "Penerapan Prosedur Kerja Aman (SOP) dan Izin Kerja Khusus",
            "Penggunaan & Pemeliharaan Alat Pelindung Diri (APD) Sesuai Standar",
            "Pertolongan Pertama pada Kecelakaan (P3K) dan Tanggap Darurat",
            "Investigasi Kecelakaan Kerja & Pelaporan Kepatuhan K3"
        ]

def enrich():
    print("Enriching thin trainings in dataset...")
    with open('src/data/trainings/all.json', 'r', encoding='utf-8') as f:
        trainings = json.load(f)

    enriched_count = 0
    for t in trainings:
        curriculum = t.get('curriculum') or []
        desc = t.get('description') or ''

        # If curriculum is missing or has less than 4 points
        if len(curriculum) < 4:
            new_curr = get_standard_curriculum(t.get('name', ''), t.get('category', ''), t.get('certification', ''))
            t['curriculum'] = new_curr
            enriched_count += 1

        # If description is too short
        if len(desc.split()) < 30:
            cert = t.get('certification', 'Sertifikasi Resmi')
            mode = t.get('mode', 'online/offline')
            t['description'] = (
                f"Program {t.get('name')} diselenggarakan resmi dengan {cert} untuk mempersiapkan "
                f"profesional dan praktisi K3 yang kompeten, memenuhi regulasi perundangan ketenagakerjaan, "
                f"serta mampu mengendalikan potensi bahaya kecelakaan kerja dan penyakit akibat kerja (PAK) di tempat kerja. "
                f"Pelatihan dapat diikuti secara {mode} dengan bimbingan praktisi dan instruktur senior berpengalaman."
            )
            enriched_count += 1

        # Enhance meta title & desc if missing
        if not t.get('meta_title'):
            t['meta_title'] = f"Pelatihan {t.get('name')} 2026 | {t.get('certification')} - Wahana Totalita"
        if not t.get('meta_desc'):
            t['meta_desc'] = f"Daftar pelatihan {t.get('name')} bersertifikat {t.get('certification')}. Jadwal terbaru 2026, silabus lengkap SKKNI, instruktur berpengalaman. Hubungi Wahana Totalita."

    # Save back to modular and main files
    with open('src/data/trainings/all.json', 'w', encoding='utf-8') as f:
        json.dump(trainings, f, indent=2, ensure_ascii=False)
    with open('src/data/trainings.json', 'w', encoding='utf-8') as f:
        json.dump(trainings, f, indent=2, ensure_ascii=False)

    print(f"[OK] Enriched {enriched_count} training records with complete SKKNI/Kemnaker syllabus and rich descriptions.")

if __name__ == '__main__':
    enrich()
