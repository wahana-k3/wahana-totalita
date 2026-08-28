import os, glob, re, json

valid_routes = set([
    '/',
    '/pelatihan',
    '/jadwal',
    '/perusahaan',
    '/csms',
    '/galeri',
    '/artikel',
    '/tools',
    '/tools/safety-talk',
    '/tools/jsa-builder',
    '/tools/ibpr-generator',
    '/tools/apd-selector',
    '/tools/ai-analyzer',
    '/tools/kalkulator-k3',
    '/tools/kalkulator-kebisingan',
    '/tools/kalkulator-biaya-k3',
    '/tools/laporan-insiden',
    '/tools/regulasi-k3',
    '/tools/risk-matrix',
    '/tools/social-generator',
    '/glosarium',
    '/insiden',
    '/verifikasi',
    '/kebijakan-privasi',
    '/forum',
    '/lowongan',
    '/resources',
    '/sitemap.xml',
    '/robots.txt'
])

def load_json(path):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

sp = load_json('src/data/service_pages.json')
for k in sp.keys():
    valid_routes.add(f"/{k}")

pr = load_json('src/data/pages_registry.json')
for k in pr.keys():
    valid_routes.add(f"/{k}")

tr = load_json('src/data/trainings.json')
for t in tr:
    valid_routes.add(f"/pelatihan/{t['slug']}")

ar = load_json('src/data/articles.json')
for a in ar:
    valid_routes.add(f"/artikel/{a['slug']}")

gl = load_json('src/data/glossary.json')
for g in gl:
    valid_routes.add(f"/glosarium/{g['slug']}")

inc = load_json('src/data/incidents.json')
for i in inc:
    valid_routes.add(f"/insiden/{i['slug']}")

# Scan all TSX and TS files in src/
tsx_files = glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True)

broken_links = []
for tf in tsx_files:
    with open(tf, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all href="..."
    hrefs = re.findall(r'href=["\'](/[^"\']*)["\']', content)
    for h in hrefs:
        clean = h.split('?')[0].split('#')[0].rstrip('/')
        if not clean:
            clean = '/'
        if clean.startswith('/images') or clean.startswith('/assets') or clean.startswith('/favicon') or clean.startswith('/api'):
            continue
        if clean not in valid_routes:
            broken_links.append({'file': tf, 'raw': h, 'clean': clean})

print(f"Total broken links found in TSX files: {len(broken_links)}")
for b in broken_links:
    print(f"  File: {b['file']} -> {b['raw']}")
