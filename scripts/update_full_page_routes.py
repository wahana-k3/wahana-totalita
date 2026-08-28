import json, glob, os
from urllib.parse import urlparse

# 1. Start with the 374 city page paths from sitemap-kota-pelatihan.xml
routes = {}

with open('src/data/city_pelatihan_pages.json', 'r', encoding='utf-8') as f:
    city_pelatihan = json.load(f)

for slug in city_pelatihan.keys():
    routes[f"/pelatihan/{slug}/"] = "vercel"
    routes[f"/pelatihan/{slug}"] = "vercel"

# 2. Add all 147 database trainings
with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

for t in trainings:
    routes[f"/pelatihan/{t['slug']}/"] = "vercel"
    routes[f"/pelatihan/{t['slug']}"] = "vercel"

# 3. Add all core static pages
core_pages = [
    "/",
    "/pelatihan",
    "/artikel",
    "/jadwal",
    "/csms",
    "/galeri",
    "/perusahaan",
    "/perpanjangan-skp",
    "/layanan-pemerintah",
    "/tools",
    "/tools/safety-talk",
    "/tools/kalkulator-k3",
    "/tools/risk-matrix",
    "/tools/jsa-builder",
    "/tools/ibpr-generator",
    "/tools/apd-selector",
    "/tools/kalkulator-kebisingan",
    "/tools/kalkulator-biaya-k3",
    "/tools/regulasi-k3",
    "/tools/laporan-insiden",
    "/tools/ai-analyzer",
    "/tools/social-generator",
    "/glosarium",
    "/insiden",
    "/resources",
    "/lowongan",
    "/verifikasi",
    "/forum"
]

for p in core_pages:
    routes[p] = "vercel"
    if p != "/":
        routes[f"{p}/"] = "vercel"

# 4. Add all articles
with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

for a in articles:
    routes[f"/artikel/{a['slug']}/"] = "vercel"
    routes[f"/artikel/{a['slug']}"] = "vercel"

# 5. Add all glossary terms
with open('src/data/glossary.json', 'r', encoding='utf-8') as f:
    glossary = json.load(f)

for g in glossary:
    routes[f"/glosarium/{g['slug']}/"] = "vercel"
    routes[f"/glosarium/{g['slug']}"] = "vercel"

# 6. Add all incident reports
with open('src/data/incidents.json', 'r', encoding='utf-8') as f:
    incidents = json.load(f)

for i in incidents:
    routes[f"/insiden/{i['slug']}/"] = "vercel"
    routes[f"/insiden/{i['slug']}"] = "vercel"

# 7. Add all service & city doorway pages
with open('src/data/service_pages.json', 'r', encoding='utf-8') as f:
    service_pages = json.load(f)

for s in service_pages.keys():
    routes[f"/{s}/"] = "vercel"
    routes[f"/{s}"] = "vercel"

with open('src/data/pages_registry.json', 'r', encoding='utf-8') as f:
    pages_registry = json.load(f)

for r in pages_registry.keys():
    routes[f"/{r}/"] = "vercel"
    routes[f"/{r}"] = "vercel"

with open('src/data/cities_detailed.json', 'r', encoding='utf-8') as f:
    cities_detailed = json.load(f)

for c in cities_detailed.keys():
    routes[f"/{c}/"] = "vercel"
    routes[f"/{c}"] = "vercel"

print(f"Total routes registered in page-routes.json: {len(routes)}")

page_routes_data = {
    "routes": routes,
    "default": "hostinger"
}

with open('page-routes.json', 'w', encoding='utf-8') as f:
    json.dump(page_routes_data, f, indent=2)

print("Updated page-routes.json successfully!")
