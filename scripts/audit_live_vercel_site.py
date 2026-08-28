import urllib.request
import urllib.error
import time
import json

BASE_URL = 'https://wahana-totalita.vercel.app'

urls_to_test = [
    ('/', 'Homepage'),
    ('/pelatihan', 'Katalog Pelatihan (147 Program)'),
    ('/pelatihan/pelatihan-ahli-k3-umum-sertifikasi-kemnaker-ri', 'Single Training (AK3U Kemnaker)'),
    ('/pelatihan/pelatihan-petugas-peran-kebakaran-kelas-d-kemnaker-ri', 'Single Training (Damkar)'),
    ('/perpanjangan-skp', 'Layanan Perpanjangan SKP'),
    ('/csms', 'Layanan CSMS'),
    ('/perusahaan', 'In-House Training Perusahaan'),
    ('/layanan-pemerintah', 'Layanan Instansi Pemerintah'),
    ('/jadwal', 'Jadwal Pelatihan 2026'),
    ('/galeri', 'Galeri Dokumentasi (67 Foto)'),
    ('/artikel', 'Katalog Artikel & Berita'),
    ('/artikel/apa-itu-smk3-pp-50-2012', 'Single Artikel SMK3'),
    ('/glosarium', 'Glosarium K3 (184 Istilah)'),
    ('/glosarium/smk3', 'Single Glosarium'),
    ('/insiden', 'Database Insiden K3 (104 Kasus)'),
    ('/tools', '10 Interactive Tools K3'),
    ('/tools/safety-talk', '100 Safety Talks Siap Cetak'),
    ('/tools/kalkulator-k3', 'Kalkulator K3 (FR & SR)'),
    ('/verifikasi', 'Verifikasi Sertifikat Online'),
    ('/sitemap.xml', 'XML Sitemap'),
    ('/robots.txt', 'Robots.txt'),
]

assets_to_test = [
    '/assets/img/logo.png',
    '/assets/img/logo-dark.png',
    '/images/clients/78a55-pertamina.png',
    '/images/clients/58303-pln-persero.png',
    '/images/galeri/PELATIHAN DAMKAR.JPG',
    '/images/galeri/IMG_1945.JPG',
    '/assets/uploads/707c28932a541edb.png', # AK3U Flyer
    '/assets/uploads/8f9efbe2dbae6a93.png', # Fasyankes Flyer
    '/assets/uploads/ea19e324432f3f1d.png', # Petugas K3 Flyer
    '/assets/uploads/d072df2e88364f1c.png', # Petugas P3K Flyer
]

results = []

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

print(f"Auditing live Vercel site: {BASE_URL}\n")
print(f"{'TYPE':<8} | {'STATUS':<6} | {'TIME (ms)':<9} | {'PAGE / ASSET':<50}")
print("-" * 80)

for path, label in urls_to_test:
    full_url = f"{BASE_URL}{path}"
    start = time.time()
    try:
        req = urllib.request.Request(full_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            status = response.getcode()
            elapsed = int((time.time() - start) * 1000)
            print(f"{'PAGE':<8} | {status:<6} | {elapsed:<9} | {label} ({path})")
            results.append({'url': full_url, 'status': status, 'time_ms': elapsed, 'type': 'page'})
    except urllib.error.HTTPError as e:
        elapsed = int((time.time() - start) * 1000)
        print(f"{'PAGE':<8} | {e.code:<6} | {elapsed:<9} | [FAILED] {label} ({path})")
        results.append({'url': full_url, 'status': e.code, 'time_ms': elapsed, 'type': 'page', 'error': str(e)})
    except Exception as e:
        elapsed = int((time.time() - start) * 1000)
        print(f"{'PAGE':<8} | {'ERR':<6} | {elapsed:<9} | [ERROR] {label} ({path}): {e}")
        results.append({'url': full_url, 'status': 0, 'time_ms': elapsed, 'type': 'page', 'error': str(e)})

print("\nAuditing Media & Flyer Assets:\n" + "-" * 80)
for asset in assets_to_test:
    full_url = f"{BASE_URL}{asset}"
    start = time.time()
    try:
        req = urllib.request.Request(full_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            status = response.getcode()
            elapsed = int((time.time() - start) * 1000)
            print(f"{'ASSET':<8} | {status:<6} | {elapsed:<9} | {asset}")
            results.append({'url': full_url, 'status': status, 'time_ms': elapsed, 'type': 'asset'})
    except urllib.error.HTTPError as e:
        elapsed = int((time.time() - start) * 1000)
        print(f"{'ASSET':<8} | {e.code:<6} | {elapsed:<9} | [FAILED] {asset}")
        results.append({'url': full_url, 'status': e.code, 'time_ms': elapsed, 'type': 'asset', 'error': str(e)})
    except Exception as e:
        elapsed = int((time.time() - start) * 1000)
        print(f"{'ASSET':<8} | {'ERR':<6} | {elapsed:<9} | [ERROR] {asset}: {e}")

passed = len([r for r in results if r.get('status') == 200])
failed = len(results) - passed
print(f"\nAUDIT SUMMARY: {passed}/{len(results)} URLs Passed (200 OK), {failed} Failed.")
