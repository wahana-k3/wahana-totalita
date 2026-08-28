import json
import os

base = r"c:\Users\ASUS\Pictures\pena_platform\src\data"

with open(os.path.join(base, "service_pages.json"), "r", encoding="utf-8") as f:
    services = json.load(f)

with open(os.path.join(base, "cities.json"), "r", encoding="utf-8") as f:
    cities = json.load(f)

registry = {}

# 1. Add all 47 service pages
for slug, s in services.items():
    registry[slug] = {
        "slug": slug,
        "type": "service",
        "title": s["title"],
        "meta_title": s["meta_title"],
        "meta_desc": s["meta_desc"],
        "heading": s["heading"],
        "sections": s["key_sections"]
    }

# 2. Add all 24 city landing pages
for c in cities:
    city_slug = f"pelatihan-k3-{c['slug']}"
    city_name = c['name']
    registry[city_slug] = {
        "slug": city_slug,
        "type": "city",
        "title": f"Pelatihan & Sertifikasi K3 {city_name} — BNSP & KEMNAKER RI",
        "meta_title": f"Pelatihan K3 {city_name} | Sertifikasi BNSP & Kemnaker 2026",
        "meta_desc": f"Daftar pelatihan dan sertifikasi K3 resmi di {city_name} ({c.get('province', '')}). Tersedia Ahli K3 Umum, TOT BNSP, K3 Konstruksi, Listrik online & in-house.",
        "heading": f"Pelatihan K3 & Sertifikasi BNSP {city_name}",
        "sections": [
          f"Jadwal Pelatihan K3 di {city_name}",
          f"Program Populer K3 {city_name}",
          f"Keunggulan Sertifikasi Wahana Totalita di {city_name}",
          f"Konsultasi & Pendaftaran In-House {city_name}"
        ],
        "city_name": city_name,
        "province": c.get('province', '')
    }

print(f"Total entries in pages_registry: {len(registry)}")
with open(os.path.join(base, "pages_registry.json"), "w", encoding="utf-8") as f:
    json.dump(registry, f, indent=2, ensure_ascii=False)
