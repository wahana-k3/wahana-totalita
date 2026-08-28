import os
import re
import json

base_dir = r"c:\Users\ASUS\Pictures\pena_platform"
pub_dir = os.path.join(base_dir, "public_html")
out_dir = os.path.join(base_dir, "src", "data")

service_files = [
    'csms.php', 'perusahaan.php', 'layanan-pemerintah.php', 'perpanjangan-skp.php',
    'kebijakan-privasi.php', 'sertifikasi-bnsp.php', 'keselamatan-kerja.php', 'klien.php',
    'instruktur.php', 'ak3u-fresh-graduate.php', 'ak3u-gratis.php', 'k3-konstruksi.php',
    'k3-listrik.php', 'k3-kimia.php', 'k3-ketinggian.php', 'k3-pertambangan.php',
    'k3-migas.php', 'smk3.php', 'k3-lingkungan.php', 'k3-pesawat-angkat-angkut.php',
    'penanggulangan-kebakaran.php', 'p3k.php', 'k3-pesawat-uap.php', 'operator-alat-berat.php',
    'juru-las.php', 'higiene-industri.php', 'pelatihan-iso.php', 'k3-perkantoran.php',
    'selam.php', 'outbound.php', 'wisata-karyawan.php', 'event-organizer.php',
    'k3-rumah-sakit.php', 'pelatihan-manajemen-sdm.php', 'pelatihan-satpam.php', 'catering.php',
    'pelatihan-kelautan.php', 'k3-laboratorium.php', 'k3-transportasi.php', 'akomodasi.php',
    'pelatihan-keuangan-daerah.php', 'pelatihan-pengadaan-barang-jasa.php', 'k3-manufaktur.php',
    'k3-psikososial.php', 'k3-pangan.php', 'pelatihan-teknologi-informasi.php', 'k3.php'
]

services_data = {}

for sf in service_files:
    path = os.path.join(pub_dir, sf)
    if not os.path.exists(path):
        continue
    slug = sf.replace('.php', '')
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        code = f.read()

    # Extract page_title
    title_match = re.search(r'\$page_title\s*=\s*[\'"]([^\'"]+)[\'"]', code)
    if not title_match:
        title_match = re.search(r'<title>(.*?)</title>', code)
    title = title_match.group(1) if title_match else slug.replace('-', ' ').title()

    # Extract meta_desc
    desc_match = re.search(r'\$meta_desc\s*=\s*[\'"]([^\'"]+)[\'"]', code)
    if not desc_match:
        desc_match = re.search(r'name=[\'"]description[\'"]\s+content=[\'"]([^\'"]+)[\'"]', code)
    meta_desc = desc_match.group(1) if desc_match else f"Layanan {title} resmi dari Wahana Totalita Konsultan."

    # Extract hero heading (h1)
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', code, re.DOTALL)
    h1 = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip() if h1_match else title

    # Extract sections / paragraphs (clean textual content)
    # Extract all h2s and paragraphs
    sections = []
    h2_matches = re.findall(r'<h2[^>]*>(.*?)</h2>', code, re.DOTALL)
    for h in h2_matches:
        clean_h = re.sub(r'<[^>]+>', '', h).strip()
        if clean_h and len(clean_h) < 100:
            sections.append(clean_h)

    services_data[slug] = {
        "slug": slug,
        "title": title,
        "meta_title": f"{title} | Wahana Totalita",
        "meta_desc": meta_desc,
        "heading": h1,
        "key_sections": sections
    }

print(f"Extracted metadata for {len(services_data)} dedicated service pages")
with open(os.path.join(out_dir, "service_pages.json"), "w", encoding="utf-8") as f:
    json.dump(services_data, f, indent=2, ensure_ascii=False)
