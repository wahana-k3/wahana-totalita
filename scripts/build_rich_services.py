import os, glob, re, json, subprocess

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
    
    # We can execute PHP CLI to render the exact HTML output of each file!
    # Let's run `php <f>` in a sub-process to get 100% exact rendered HTML
    try:
        res = subprocess.run(['php', f], cwd='public_html', stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='ignore')
        html_out = res.stdout
        
        # Extract title and meta_desc
        title_m = re.search(r'<title>(.*?)</title>', html_out, re.IGNORECASE)
        title = title_m.group(1).replace(' | Wahana Totalita', '').replace(' — Wahana Totalita', '').strip() if title_m else slug.replace('-', ' ').title()
        
        desc_m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html_out, re.IGNORECASE)
        meta_desc = desc_m.group(1) if desc_m else ''
        
        # Extract body between navbar and footer
        body_m = re.search(r'</header>(.*?)<footer', html_out, re.DOTALL | re.IGNORECASE)
        if not body_m:
            body_m = re.search(r'(<section class="hero".*?)<footer', html_out, re.DOTALL | re.IGNORECASE)
        if not body_m:
            body_m = re.search(r'(<section.*?)</footer', html_out, re.DOTALL | re.IGNORECASE)
        if not body_m:
            body_m = re.search(r'<body[^>]*>(.*?)</body>', html_out, re.DOTALL | re.IGNORECASE)
        
        body_html = body_m.group(1).strip() if body_m else ''
        
        # Strip internal navbar and footer markup if captured
        body_html = re.sub(r'<header.*?</header>', '', body_html, flags=re.DOTALL)
        body_html = re.sub(r'<footer.*?</footer>', '', body_html, flags=re.DOTALL)
        body_html = re.sub(r'<nav.*?</nav>', '', body_html, flags=re.DOTALL)
        body_html = re.sub(r'<div class="breadcrumb-bar".*?</div>\s*</div>', '', body_html, flags=re.DOTALL)
        
        service_pages[slug] = {
            'slug': slug,
            'title': title,
            'meta_title': f"{title} | Wahana Totalita",
            'meta_desc': meta_desc,
            'html': body_html,
            'has_html': len(body_html) > 100
        }
    except Exception as e:
        print(f"Error rendering {f}: {e}")

print(f"Rendered {len(service_pages)} pages via PHP CLI.")
for slug, d in sorted(service_pages.items()):
    print(f"  /{slug} -> HTML: {len(d['html'])} chars")

with open('src/data/service_pages.json', 'w', encoding='utf-8') as out:
    json.dump(service_pages, out, indent=2, ensure_ascii=False)
