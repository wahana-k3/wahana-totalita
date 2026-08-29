import os
import json

def enrich_article_content(article):
    title = article.get('title', '')
    slug = article.get('slug', '')
    content = article.get('content', '')
    word_count = len(content.split())

    if word_count >= 350:
        return article, False

    # Add rich structured sections tailored to the topic
    enriched_sections = []

    if 'ahli k3 umum' in title.lower() or 'ak3u' in title.lower():
        enriched_sections.append("""
<h3>Landasan Hukum & Regulasi Penunjukan Ahli K3 Umum</h3>
<p>Kewajiban penunjukan Ahli Keselamatan dan Kesehatan Kerja (K3) Umum diatur secara tegas dalam Undang-Undang No. 1 Tahun 1970 tentang Keselamatan Kerja dan Peraturan Menteri Tenaga Kerja No. PER.02/MEN/1992. Setiap perusahaan yang mempekerjakan lebih dari 100 orang tenaga kerja atau memiliki potensi bahaya tinggi (seperti industri manufaktur, konstruksi, kimia, dan migas) diwajibkan memiliki sekurang-kurangnya satu orang Ahli K3 Umum yang ditunjuk secara sah oleh Kementerian Ketenagakerjaan Republik Indonesia.</p>

<h3>Tugas Pokok dan Wewenang Ahli K3 Umum</h3>
<ul>
  <li><strong>Membantu Manajemen Merumuskan Kebijakan K3:</strong> Menyusun program kerja K3 tahunan, pedoman keselamatan kerja, dan rencana tanggap darurat perusahaan.</li>
  <li><strong>Pengawasan Implementasi SMK3:</strong> Melakukan inspeksi berkala di seluruh area kerja, memastikan seluruh mesin, peralatan, dan instalasi memenuhi standar kelaikan K3.</li>
  <li><strong>Penyelidikan Insiden & Analisis Akar Masalah:</strong> Memimpin investigasi kecelakaan kerja dan penyakit akibat kerja (PAK) serta memberikan rekomendasi tindakan korektif dan preventif (CAPA).</li>
  <li><strong>Sekretaris P2K3:</strong> Mengoordinasikan pertemuan rutin Panitia Pembina Keselamatan dan Kesehatan Kerja (P2K3) serta menyusun laporan triwulan ke Dinas Tenaga Kerja setempat.</li>
</ul>

<h3>Syarat Mengikuti Pembinaan Ahli K3 Umum</h3>
<p>Peserta wajib memenuhi persyaratan administratif antara lain:</p>
<ol>
  <li>Pendidikan minimal Diploma 3 (D3) segala jurusan (untuk penunjukan resmi Kemnaker RI).</li>
  <li>Salinan Ijazah terakhir dan KTP yang masih berlaku.</li>
  <li>Surat Rekomendasi atau Surat Keterangan Bekerja dari perusahaan pengutus.</li>
  <li>Pas foto formal dengan latar belakang merah.</li>
</ol>
""")
    elif 'bnsp' in title.lower() or 'kemnaker' in title.lower() or 'sertifikasi' in title.lower():
        enriched_sections.append("""
<h3>Perbandingan Skema Sertifikasi Kemnaker RI dan BNSP</h3>
<p>Dalam dunia industri keselamatan kerja Indonesia, terdapat dua lembaga kredibel yang menerbitkan sertifikat kompetensi K3:</p>
<ul>
  <li><strong>KEMNAKER RI (Kementerian Ketenagakerjaan):</strong> Berfokus pada penegakan regulasi (compliance/legalitas). Lulusan mendapatkan Sertifikat Pembinaan, Surat Keputusan Penunjukan (SKP), dan Lisensi Kewenangan K3 resmi dari pemerintah. Sangat dibutuhkan untuk memenuhi syarat wajib perizinan industri dan audit SMK3 PP 50/2012.</li>
  <li><strong>BNSP (Badan Nasional Sertifikasi Profesi):</strong> Berfokus pada uji kompetensi profesi berbasis SKKNI (Standar Kompetensi Kerja Nasional Indonesia). Lulusan mendapatkan Sertifikat Kompetensi dengan lambang Garuda Emas yang diakui secara nasional maupun regional ASEAN. Sangat ideal untuk pengembangan portofolio profesional dan proyek-proyek multinasional.</li>
</ul>

<h3>Kapan Perusahaan Membutuhkan Sertifikasi Ini?</h3>
<p>Kebutuhan sertifikasi bergantung pada tujuan organisasi. Apabila perusahaan memerlukan penunjukan personil formal untuk memenuhi persyaratan Dinas Ketenagakerjaan atau audit CSMS migas, sertifikasi Kemnaker RI adalah syarat mutlak. Sementara untuk standar kualifikasi teknis personil dan lelang proyek, sertifikasi BNSP memberikan nilai tambah kompetensi yang tinggi.</p>
""")
    elif 'limbah' in title.lower() or 'b3' in title.lower() or 'lingkungan' in title.lower():
        enriched_sections.append("""
<h3>Prinsip Pengelolaan Limbah B3 Sesuai PP 22 Tahun 2021</h3>
<p>Pengelolaan Limbah Bahan Berbahaya dan Beracun (B3) merupakan salah satu pilar krusial dalam perlindungan lingkungan hidup dan pemenuhan regulasi industri. Perusahaan wajib menerapkan prinsip <em>Cradle to Grave</em> (dari sumber penghasil hingga pemusnahan akhir) atau <em>Cradle to Cradle</em> melalui upaya 3R (Reduce, Reuse, Recycle).</p>

<h3>Tata Cara Penyimpanan & Pengemasan Limbah B3</h3>
<ol>
  <li><strong>Bangunan TPS Limbah B3 Berizin:</strong> Memiliki lantai kedap air, atap pelindung dari cuaca, sistem ventilasi memadai, saluran penampung ceceran (spill kit), dan simbol bahaya yang sesuai.</li>
  <li><strong>Pelabelan & Pengemasan:</strong> Setiap drum atau wadah limbah B3 wajib diberi label identitas limbah, tanggal pengemasan, dan simbol piktogram bahaya (mudah menyala, korosif, beracun, dll.).</li>
  <li><strong>Pencatatan & Pelaporan Elektronik:</strong> Seluruh pergerakan keluar-masuk limbah wajib dicatat dalam Logbook TPS dan dilaporkan secara berkala melalui sistem FESTRONIK / SIMPEL Kementerian Lingkungan Hidup dan Kehutanan (KLHK).</li>
</ol>
""")
    elif 'forklift' in title.lower() or 'alat berat' in title.lower() or 'crane' in title.lower() or 'pesawat angkat' in title.lower():
        enriched_sections.append("""
<h3>Dasar Hukum Keselamatan Operasi Pesawat Angkat & Angkut</h3>
<p>Pengoperasian alat berat seperti forklift, mobile crane, overhead crane, dan excavator diatur secara ketat dalam <strong>Permenaker No. 8 Tahun 2020</strong> tentang Keselamatan dan Kesehatan Kerja Pesawat Angkat dan Pesawat Angkut. Operator wajib memiliki Surat Izin Alat (SIA) / Lisensi K3 resmi Kemnaker RI untuk menjamin keselamatan selama proses material handling.</p>

<h3>Prosedur Pemeriksaan Harian (Pre-Use Inspection)</h3>
<ul>
  <li>Pemeriksaan kebocoran fluida (oli hidrolik, oli mesin, cairan pendingin).</li>
  <li>Pengecekan fungsi rem utama, rem parkir, klakson, alarm mundur, dan lampu kerja.</li>
  <li>Pemeriksaan kondisi rantai mast, garpu (fork), selang hidrolik, dan tekanan ban.</li>
  <li>Uji fungsi perlengkapan keselamatan darurat dan sabuk pengaman (seatbelt).</li>
</ul>
""")
    else:
        enriched_sections.append("""
<h3>Strategi Implementasi K3 Efektif di Lingkungan Kerja</h3>
<p>Keberhasilan penerapan program K3 memerlukan komitmen nyata dari seluruh jajaran manajemen dan keterlibatan aktif setiap tenaga kerja. Berikut langkah-langkah strategis yang dapat diterapkan:</p>
<ol>
  <li><strong>Identifikasi Bahaya dan Penilaian Risiko (HIRADC / IBPR):</strong> Melakukan kajian komprehensif terhadap seluruh potensi bahaya mekanis, elektris, kimia, ergonomi, dan psikososial sebelum pekerjaan dimulai.</li>
  <li><strong>Penyusunan Prosedur Operasional Standar (SOP):</strong> Memastikan seluruh aktivitas kerja memiliki instruksi kerja aman yang jelas, mudah dipahami, dan disosialisasikan secara berkala.</li>
  <li><strong>Pelatihan dan Pembinaan Berkelanjutan:</strong> Mengikutsertakan karyawan dalam program sertifikasi dan pelatihan kompetensi K3 secara berkala untuk meningkatkan kesadaran keselamatan (safety awareness).</li>
  <li><strong>Inspeksi dan Audit Berkala:</strong> Melakukan tinjauan lapangan rutin serta audit internal SMK3 guna mendeteksi tindakan tidak aman (unsafe acts) dan kondisi tidak aman (unsafe conditions) sedini mungkin.</li>
</ol>
""")

    article['content'] = content + "\n\n" + "\n\n".join(enriched_sections)

    if not article.get('faqs') or len(article.get('faqs', [])) == 0:
        article['faqs'] = [
            {
                "question": f"Berapa lama masa berlaku sertifikat untuk program {title}?",
                "answer": "Masa berlaku sertifikat pembinaan Kemnaker RI dan lisensi K3 umumnya 3 tahun dan dapat diperpanjang (refreshing / perpanjangan SKP). Untuk sertifikasi kompetensi BNSP berlaku selama 3 tahun."
            },
            {
                "question": "Apakah pelatihan dapat diselenggarakan secara In-House di lokasi perusahaan?",
                "answer": "Ya, Wahana Totalita melayani pelatihan In-House Training yang disesuaikan secara khusus dengan waktu, lokasi, dan studi kasus operasional di perusahaan Anda."
            },
            {
                "question": "Bagaimana cara melakukan pendaftaran dan konsultasi program?",
                "answer": "Anda dapat langsung menghubungi tim konsultan Wahana Totalita melalui tombol WhatsApp resmi untuk mendapatkan jadwal terdekat, silabus lengkap, dan surat penawaran resmi."
            }
        ]

    return article, True

def main():
    print("Enriching thin articles with comprehensive safety knowledge and FAQs...")
    with open('src/data/articles/all.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)

    enriched_count = 0
    for a in articles:
        a, changed = enrich_article_content(a)
        if changed:
            enriched_count += 1

    with open('src/data/articles/all.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)
    with open('src/data/articles.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)

    print(f"[OK] Enriched {enriched_count} articles with rich technical sections and FAQs.")

if __name__ == '__main__':
    main()
