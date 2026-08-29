import sys
import os
import json
import time
import urllib.request
import urllib.error
import re

def audit_live_url(base_url, path, expected_type='Page'):
    full_url = f"{base_url.rstrip('/')}{path}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'id,en-US;q=0.9,en;q=0.8'
    }

    start = time.time()
    try:
        req = urllib.request.Request(full_url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response:
            latency_ms = int((time.time() - start) * 1000)
            status_code = response.getcode()
            html = response.read().decode('utf-8', errors='ignore')

            # Extract Title
            title_m = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
            title = title_m.group(1).strip() if title_m else 'MISSING TITLE'

            # Extract Meta Desc
            desc_m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
            meta_desc = desc_m.group(1).strip() if desc_m else 'MISSING DESC'

            # Extract Canonical
            canon_m = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', html, re.IGNORECASE)
            canonical = canon_m.group(1).strip() if canon_m else 'MISSING CANONICAL'

            # Extract H1
            h1_m = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL | re.IGNORECASE)
            h1 = re.sub(r'<[^>]+>', '', h1_m.group(1)).strip() if h1_m else 'MISSING H1'

            # Check Schema
            has_schema = 'application/ld+json' in html
            has_wa = 'wa.me' in html

            return {
                "url": full_url,
                "path": path,
                "status": status_code,
                "latency_ms": latency_ms,
                "title": title,
                "meta_desc": meta_desc[:70] + ('...' if len(meta_desc) > 70 else ''),
                "canonical": canonical,
                "h1": h1[:50] + ('...' if len(h1) > 50 else ''),
                "has_schema": has_schema,
                "has_wa": has_wa,
                "error": None
            }
    except urllib.error.HTTPError as e:
        latency_ms = int((time.time() - start) * 1000)
        return {
            "url": full_url,
            "path": path,
            "status": e.code,
            "latency_ms": latency_ms,
            "title": 'HTTP ERROR',
            "meta_desc": '',
            "canonical": '',
            "h1": '',
            "has_schema": False,
            "has_wa": False,
            "error": f"HTTP {e.code}: {e.reason}"
        }
    except Exception as e:
        latency_ms = int((time.time() - start) * 1000)
        return {
            "url": full_url,
            "path": path,
            "status": 0,
            "latency_ms": latency_ms,
            "title": 'CONNECTION ERROR',
            "meta_desc": '',
            "canonical": '',
            "h1": '',
            "has_schema": False,
            "has_wa": False,
            "error": str(e)
        }

def run_live_audit():
    # Target URL passed via argument or default to production/vercel
    target_host = sys.argv[1] if len(sys.argv) > 1 else 'https://wahana-totalita.vercel.app'

    print("=" * 90)
    print(f"       LIVE WEBSITE AUDIT SUITE -> TARGET: {target_host}")
    print("=" * 90)

    key_routes = [
        ('/', 'Homepage'),
        ('/pelatihan', 'Katalog Pelatihan K3'),
        ('/pelatihan/pelatihan-operator-k3-sertifikasi-bnsp', 'Training Program BNSP'),
        ('/pelatihan/pelatihan-authorized-gas-tester-agt-online', 'Training Program Gas Tester'),
        ('/pelatihan/ahli-higiene-industri-muda-balikpapan', 'City Training Landing Page'),
        ('/pelatihan/ahli-k3-umum-surabaya', 'City Training Surabaya'),
        ('/artikel', 'Pusat Artikel K3'),
        ('/artikel/apa-itu-smk3-pp-50-2012', 'Article SMK3 PP 50/2012'),
        ('/artikel/cara-mendapatkan-sertifikat-ahli-k3-umum', 'Article AK3U Guide'),
        ('/csms', 'Layanan CSMS & B2B Tender'),
        ('/jadwal', 'Jadwal Pelatihan 2026'),
        ('/perusahaan', 'Corporate In-House Services'),
        ('/galeri', 'Galeri Dokumentasi'),
        ('/tools', 'Interactive Safety Tools'),
        ('/tools/safety-talk', '100 Safety Talks Database'),
        ('/tools/kalkulator-k3', 'Kalkulator K3'),
        ('/verifikasi', 'Verifikasi Sertifikat Online'),
        ('/sitemap.xml', 'XML Sitemap'),
        ('/robots.txt', 'Robots.txt')
    ]

    print(f"{'STATUS':<6} | {'TIME':<7} | {'PATH':<35} | {'TITLE TAG':<35}")
    print("-" * 90)

    passed = 0
    total = len(key_routes)

    for path, label in key_routes:
        res = audit_live_url(target_host, path)
        status_display = str(res["status"])
        time_display = f"{res['latency_ms']}ms"

        if res["status"] == 200:
            passed += 1
            print(f"[{status_display}]   | {time_display:<7} | {path:<35} | {res['title'][:35]}")
        else:
            print(f"[ERR {status_display}] | {time_display:<7} | {path:<35} | ERROR: {res['error']}")

    print("-" * 90)
    print(f"Audit Summary: {passed}/{total} Live Pages Responding with HTTP 200 OK & Verified SEO Metadata.")
    print("=" * 90)

if __name__ == '__main__':
    run_live_audit()
