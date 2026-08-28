import json, os

with open('src/data/kota_full_data.json', 'r', encoding='utf-8') as f:
    kota_data = json.load(f)

# City testimonials by type
testimonials = {
    "energy_mining": [
        {"nama": "Bambang Setyawan, S.T.", "role": "HSE Superintendent · Perusahaan Energi", "text": "Sertifikasi POP dan Ahli K3 Umum di Wahana Totalita sangat membantu tim kami dalam audit SMKP dan CSMS. Materi sangat aplikatif dan instruktur berpengalaman di sektor tambang & migas."},
        {"nama": "Dedy Kurniawan", "role": "Safety Officer · Kontraktor Tambang", "text": "Penyelenggaraan kelas online sangat fleksibel untuk kami yang bekerja dengan sistem shift di site. Ujian sertifikasi berjalan lancar dan sertifikat resmi Kemnaker RI terbit tepat waktu."},
        {"nama": "Rina Wijayanti", "role": "HSE Coordinator · Industri Pengolahan", "text": "Wahana Totalita sangat profesional dalam memfasilitasi in-house training perusahaan kami. Dokumen administrasi, invoice, dan Faktur Pajak lengkap tanpa kendala."}
    ],
    "industrial": [
        {"nama": "Ir. Hendra Pratama", "role": "Plant Manager · Manufaktur Otomotif", "text": "Kami mengikutsertakan 15 personel untuk sertifikasi Ahli K3 Listrik & Operator Forklift. Pelatihan in-house disesuaikan langsung dengan layout bahaya pabrik kami di kawasan industri."},
        {"nama": "Siti Nurhaliza, S.T.", "role": "EHS Specialist · Industri Farmasi & Kimia", "text": "Instruktur sangat kompeten menjelaskan integrasi SMK3 PP 50/2012 dengan regulasi K3 Kimia. Pelayanan ramah, cepat, dan sangat direkomendasikan untuk pembinaan K3 korporasi."},
        {"nama": "Aris Munandar", "role": "HSE Officer · Logistik & Pergudangan", "text": "Rekomendasi terbaik untuk pelatihan K3. Biaya kompetitif, silabus resmi, dan bimbingan ujian intensif membuat seluruh tim kami lulus 100%."}
    ],
    "urban": [
        {"nama": "Faisal Rahman, S.T.", "role": "Project Safety Engineer · Konstruksi Gedung", "text": "Sangat puas dengan pelatihan Ahli K3 Konstruksi dan AK3U Kemnaker RI. Sangat membantu untuk syarat tender proyek LPSE dan kualifikasi kontraktor."},
        {"nama": "Dewi Anggraini", "role": "HR & GA Manager · Property & Hospitality", "text": "Pendaftaran sangat mudah via WhatsApp. Tim Wahana Totalita mendampingi proses pemberkasan hingga penerbitan SKP resmi tanpa repot."},
        {"nama": "Reza Pahlevi", "role": "Fresh Graduate Teknik · Alumni AK3U", "text": "Mengikuti kelas online dari rumah dengan jadwal teratur. Sertifikat resmi Kemnaker RI menjadi modal utama saya langsung diterima kerja sebagai safety officer."}
    ]
}

# Generate FAQs per city
cities_detailed = {}
city_keys = list(kota_data.keys())

for idx, (slug, c) in enumerate(kota_data.items()):
    city_name = c['city_name']
    province = c['province']
    industries = c['industries']
    nearby = c['nearby']
    city_type = c.get('city_type', 'industrial')
    
    # Ring cities
    ring = []
    n = len(city_keys)
    for i in range(1, 4):
        ring.append(city_keys[(idx + i) % n])
    
    if city_type == 'energy_mining':
        faqs = [
            {
                "q": f"Apa saja sertifikasi K3 yang paling banyak dibutuhkan di {city_name}?",
                "a": f"Di {city_name} dan wilayah {province}, kebutuhan sertifikasi keselamatan kerja sangat terfokus pada Ahli K3 Umum (AK3U) Kemnaker RI, Pengawas Operasional Pertambangan (POP/POM BNSP), K3 Migas, serta K3 Konstruksi guna memenuhi kualifikasi kerja di sektor {industries}."
            },
            {
                "q": f"Berapa rincian biaya pelatihan K3 di {city_name}?",
                "a": f"Biaya pelatihan K3 di {city_name} sangat fleksibel dan kompetitif, bergantung pada jenis program sertifikasi (Kemnaker RI atau BNSP), metode kelas (online interaktif Zoom atau tatap muka langsung), serta paket in-house training grup untuk korporasi di {city_name} dan kawasan terdekat ({nearby}). Hubungi kami via WhatsApp untuk mendapatkan proposal silabus resmi serta rincian harga penawaran terbaru."
            },
            {
                "q": f"Berapa lama durasi pelaksanaan pelatihan K3 di {city_name}?",
                "a": "Durasi program berkisar antara 3 hingga 5 hari kerja tergantung skema kompetensi yang dipilih. Pelatihan teknis dan sertifikasi BNSP umumnya memerlukan waktu 3–5 hari kerja, sementara pembinaan Ahli K3 Umum Kemnaker RI berlangsung intensif dengan kurikulum komprehensif dan evaluasi kelulusan."
            },
            {
                "q": f"Apakah sertifikat K3 Wahana Totalita diakui resmi di {city_name}?",
                "a": f"Ya, seluruh sertifikat diterbitkan resmi oleh Kementerian Ketenagakerjaan RI (KEMNAKER RI) atau Badan Nasional Sertifikasi Profesi (BNSP). Sertifikat ini memiliki keabsahan hukum yang berlaku secara nasional dan memenuhi prasyarat tender LPSE, kualifikasi vendor BUMN, serta audit standar K3 perusahaan di seluruh {province}."
            },
            {
                "q": f"Apa saja syarat mendaftar pelatihan K3 bagi peserta dari {city_name}?",
                "a": f"Persyaratan umum meliputi salinan KTP, pas foto latar merah, dan salinan ijazah terakhir (minimal SMA/SMK untuk lisensi teknis operator atau minimal D3/S1 untuk sertifikasi Ahli K3 Umum). Seluruh proses pendaftaran dan verifikasi berkas bagi calon peserta dari {city_name} dan sekitarnya dapat dilakukan secara online melalui tim representatif kami."
            }
        ]
    elif city_type == 'industrial':
        faqs = [
            {
                "q": f"Apa saja sertifikasi K3 yang paling banyak dibutuhkan di {city_name}?",
                "a": f"Sektor industri dan manufaktur di {city_name} dan sekitarnya ({province}) umumnya mensyaratkan sertifikasi Ahli K3 Umum Kemnaker RI, Operator Forklift & Alat Angkat, Ahli K3 Listrik, K3 Kimia, serta Petugas Penanggulangan Kebakaran untuk mendukung operasional fasilitas pabrik."
            },
            {
                "q": f"Berapa rincian biaya pelatihan K3 di {city_name}?",
                "a": f"Biaya pelatihan K3 di {city_name} bervariasi sesuai program sertifikasi (Kemnaker RI atau BNSP), format kelas (webinar interaktif atau praktik tatap muka), serta paket in-house training grup untuk korporasi di {city_name} maupun kawasan industrinya ({nearby}). Hubungi kami via WhatsApp untuk mendapatkan proposal penawaran harga resmi dan silabus terbaru."
            },
            {
                "q": f"Berapa lama durasi pelaksanaan pelatihan K3 di {city_name}?",
                "a": "Durasi program berkisar antara 3 hingga 5 hari kerja tergantung bidang keahlian. Program sertifikasi BNSP atau operator teknis umumnya memakan waktu 3–5 hari, sedangkan pembinaan Ahli K3 Umum Kemnaker RI dilaksanakan secara intensif mencakup pemaparan materi regulasi, studi kasus, dan evaluasi pengujian."
            },
            {
                "q": f"Apakah sertifikat K3 Wahana Totalita diakui resmi di {city_name}?",
                "a": f"Ya, seluruh sertifikat diterbitkan resmi oleh Kemnaker RI atau BNSP dengan status legalitas nasional. Sertifikat ini menjadi syarat wajib pemenuhan kualifikasi rekanan CSMS, tender LPSE/BUMN, serta audit sertifikasi SMK3 PP 50/2012 di wilayah {province}."
            },
            {
                "q": f"Apa saja syarat mendaftar pelatihan K3 bagi peserta dari {city_name}?",
                "a": f"Persyaratan umum mencakup salinan KTP, pas foto latar merah, dan salinan ijazah terakhir (minimal SMA/SMK untuk lisensi teknis operator atau D3/S1 untuk program Ahli K3 Umum). Berkas pendaftaran dari {city_name} dan sekitarnya dapat dikirimkan secara daring via WhatsApp tim kami."
            }
        ]
    else:
        faqs = [
            {
                "q": f"Apa saja sertifikasi K3 yang paling banyak dibutuhkan di {city_name}?",
                "a": f"Kebutuhan utama di {city_name} dan provinsi {province} mencakup Ahli K3 Umum (AK3U) untuk kepatuhan manajerial gedung/perusahaan, Ahli Muda K3 Konstruksi, Safety Officer BNSP, serta sertifikasi AMDAL lingkungan hidup."
            },
            {
                "q": f"Berapa rincian biaya pelatihan K3 di {city_name}?",
                "a": f"Biaya pelatihan K3 di {city_name} bervariasi sesuai skema pelatihan pilihan Anda (online interaktif atau tatap muka terdekat) dan kebutuhan sertifikasi perorangan atau korporasi di {city_name} dan kota sekitarnya ({nearby}). Tim kami siap memberikan rincian proposal harga resmi melalui konsultasi WhatsApp."
            },
            {
                "q": f"Berapa lama durasi pelaksanaan pelatihan K3 di {city_name}?",
                "a": "Durasi program berkisar antara 3 hingga 5 hari kerja tergantung spesifikasi pelatihan. Program pembinaan Ahli K3 Umum Kemnaker RI dan sertifikasi BNSP dirancang terstruktur dan padat agar peserta siap lulus uji kompetensi."
            },
            {
                "q": f"Apakah sertifikat K3 Wahana Totalita diakui resmi di {city_name}?",
                "a": f"Ya, sertifikat diterbitkan langsung oleh instansi pembina negara resmi (Kemnaker RI & BNSP) dan diakui penuh untuk kebutuhan tender pemerintah, kepatuhan audit perusahaan, serta pengajuan Surat Keputusan Penunjukan (SKP) Ahli K3 di {province}."
            },
            {
                "q": f"Apa saja syarat mendaftar pelatihan K3 bagi peserta dari {city_name}?",
                "a": f"Persyaratan cukup dengan salinan identitas KTP, pas foto latar merah, dan ijazah terakhir (minimal SMA/SMK untuk teknis operator atau D3/S1 untuk AK3U). Pendaftaran untuk peserta dari {city_name} dan sekitarnya dibuka setiap bulan secara online."
            }
        ]
    
    c['faqs'] = faqs
    c['testimonials'] = testimonials.get(city_type, testimonials['industrial'])
    c['ring_cities'] = ring
    cities_detailed[slug] = c

# Also check if any extra city from pages_registry needs to be included
with open('src/data/pages_registry.json', 'r', encoding='utf-8') as f:
    pr = json.load(f)

for k, v in pr.items():
    if v.get('type') == 'city' and k not in cities_detailed:
        city_name = v.get('city_name', k.replace('pelatihan-k3-', '').capitalize())
        cities_detailed[k] = {
            "slug": k,
            "type": "city",
            "city_key": k.replace('pelatihan-k3-', ''),
            "city_name": city_name,
            "province": v.get('province', 'Indonesia'),
            "title": v.get('title', f"Pelatihan & Sertifikasi K3 {city_name} — BNSP & KEMNAKER RI"),
            "desc": v.get('meta_desc', f"Daftar pelatihan dan sertifikasi K3 resmi di {city_name}."),
            "industries": "manufaktur, konstruksi, logistik, energi, dan kelistrikan",
            "demand": f"Kebutuhan tenaga K3 bersertifikat di wilayah {city_name} meningkat seiring percepatan industri dan proyek infrastruktur.",
            "highlight": f"Pusat pertumbuhan industri wilayah {city_name}",
            "companies": "Perusahaan BUMN, Kontraktor Nasional, Manufaktur & Swasta",
            "nearby": "Kawasan industri dan perkotaan sekitarnya",
            "img": "/images/galeri/PELATIHAN DAMKAR.JPG",
            "city_type": "industrial",
            "programs": [
                ["🦺", "Ahli K3 Umum (AK3U)", "KEMNAKER RI", "3–5 Hari", "pelatihan-ahli-k3-umum-sertifikasi-kemnaker-ri"],
                ["🏗️", "Ahli K3 Konstruksi", "KEMNAKER RI", "5 Hari", "pelatihan-ahli-muda-k3-konstruksi-sertifikasi-kemnaker-ri"],
                ["⚡", "Ahli K3 Listrik", "KEMNAKER RI", "5 Hari", "pelatihan-ahli-k3-listrik-sertifikasi-kemnaker-ri"],
                ["🔥", "Ahli K3 Kebakaran", "KEMNAKER RI", "5–7 Hari", "pelatihan-petugas-peran-kebakaran-kelas-d-kemnaker-ri"],
                ["🏗️", "Operator Forklift", "KEMNAKER RI", "3 Hari", "pelatihan-k3-operator-forklift-kelas-2-sertifikasi-kemnaker-ri"],
                ["📋", "Safety Officer & Auditor K3", "BNSP", "3 Hari", "pelatihan-auditor-smk3-online"]
            ],
            "heading": f"Pelatihan & Sertifikasi K3 {city_name}",
            "meta_title": v.get('meta_title', f"Pelatihan K3 {city_name} | Sertifikasi BNSP & Kemnaker"),
            "meta_desc": v.get('meta_desc', f"Daftar pelatihan dan sertifikasi K3 resmi di {city_name}."),
            "faqs": faqs,
            "testimonials": testimonials['industrial'],
            "ring_cities": city_keys[:3]
        }

with open('src/data/cities_detailed.json', 'w', encoding='utf-8') as f:
    json.dump(cities_detailed, f, indent=2, ensure_ascii=False)

print(f"Generated src/data/cities_detailed.json with {len(cities_detailed)} complete cities!")
