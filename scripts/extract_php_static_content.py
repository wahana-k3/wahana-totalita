import os, glob, re, json

php_files = glob.glob('public_html/*.php')
service_pages = {}

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
    
    # Extract all HTML sections from the file
    # Remove PHP logic blocks at the top
    # Find start of HTML (e.g. <!DOCTYPE, <header, <section, <div class=)
    html_start = re.search(r'(<header|<section|<div|<main)', raw)
    if html_start:
        content = raw[html_start.start():]
        # remove closing footer / scripts if any
        content = re.sub(r'<footer.*?</footer>', '', content, flags=re.DOTALL | re.IGNORECASE)
        content = re.sub(r'<\?php\s+require.*?navbar\.php.*?\?>', '', content, flags=re.DOTALL | re.IGNORECASE)
        content = re.sub(r'<\?php\s+require.*?footer\.php.*?\?>', '', content, flags=re.DOTALL | re.IGNORECASE)
        content = re.sub(r'<\?php\s+require.*?head\.php.*?\?>', '', content, flags=re.DOTALL | re.IGNORECASE)
        content = re.sub(r'<header class="site-header".*?</header>', '', content, flags=re.DOTALL | re.IGNORECASE)
        content = re.sub(r'<div id="scroll-progress".*?</div>', '', content, flags=re.DOTALL | re.IGNORECASE)
        content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
        
        # Replace inline PHP echoes like <?= $wa_url ?> with default WA url
        content = re.sub(r'<\?=\s*\$wa_url\s*\?>', 'https://wa.me/6287759151278', content)
        content = re.sub(r'<\?=\s*\$wa_number\s*\?>', '6287759151278', content)
        content = re.sub(r'<\?=\s*\$year\s*\?>', '2026', content)
        content = re.sub(r'<\?php.*?\?>', '', content, flags=re.DOTALL)
        content = re.sub(r'<\?=.*?\?>', '', content)
        
        service_pages[slug] = {
            'slug': slug,
            'title': title,
            'meta_title': f"{title} | Wahana Totalita",
            'meta_desc': meta_desc,
            'html': content.strip(),
            'has_html': len(content.strip()) > 100
        }

print(f"Extracted static HTML for {len(service_pages)} pages.")
for slug, d in sorted(service_pages.items()):
    print(f"  /{slug} -> HTML length: {len(d['html'])} chars")

with open('src/data/service_pages.json', 'w', encoding='utf-8') as out:
    json.dump(service_pages, out, indent=2, ensure_ascii=False)
