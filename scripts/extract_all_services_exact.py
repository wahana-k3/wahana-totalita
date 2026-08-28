import os, glob, re, json

php_files = glob.glob('public_html/*.php')
service_data = {}

# Skip non-service utilities
skip_files = {'config.php', 'setup.php', 'indexnow-ping.php', '404.php', 'sitemap.php', 
              'artikel-functions.php', 'artikel-detail.php', 'artikel.php', 'artikel-kategori.php', 
              'pelatihan.php', 'pelatihan-catalog.php', 'pelatihan-kategori.php', 'city-page.php', 'kota.php', 'index.php'}

for f in php_files:
    fname = os.path.basename(f)
    if fname in skip_files:
        continue
    
    slug = fname.replace('.php', '')
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        raw = fp.read()
    
    # Extract page title
    title_m = re.search(r"\$page_title\s*=\s*['\"](.*?)['\"];", raw)
    title = title_m.group(1) if title_m else slug.replace('-', ' ').title()
    
    # Extract meta desc
    desc_m = re.search(r"\$meta_desc\s*=\s*['\"](.*?)['\"];", raw)
    meta_desc = desc_m.group(1) if desc_m else ''
    
    # Extract body content between </header> or <section class="hero"> and <footer or </body>
    body_m = re.search(r'(<section class="hero".*?)<footer', raw, re.DOTALL | re.IGNORECASE)
    if not body_m:
        body_m = re.search(r'(<section.*?)</footer', raw, re.DOTALL | re.IGNORECASE)
    if not body_m:
        body_m = re.search(r'(<main.*?)</main>', raw, re.DOTALL | re.IGNORECASE)
    
    body_html = body_m.group(1) if body_m else ''
    
    # Clean up PHP tags inside body_html
    body_html = re.sub(r'<\?php.*?\?>', '', body_html, flags=re.DOTALL)
    body_html = re.sub(r'<\?=.*?\?>', '', body_html, flags=re.DOTALL)
    
    service_data[slug] = {
        'slug': slug,
        'title': title,
        'meta_title': f"{title} | Wahana Totalita",
        'meta_desc': meta_desc,
        'html': body_html,
        'has_custom_html': len(body_html) > 200
    }

print(f"Extracted {len(service_data)} service landing pages.")
for slug, d in sorted(service_data.items()):
    print(f"  /{slug} -> HTML length: {len(d['html'])} bytes, Custom: {d['has_custom_html']}")

with open('src/data/service_pages.json', 'w', encoding='utf-8') as out:
    json.dump(service_data, out, indent=2, ensure_ascii=False)
