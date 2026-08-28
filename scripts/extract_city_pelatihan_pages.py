import glob, os, json, re

files = glob.glob('public_html/pelatihan/*.html')
print(f"Found {len(files)} html files in public_html/pelatihan")

city_pages = {}

for fpath in files:
    slug = os.path.splitext(os.path.basename(fpath))[0]
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    
    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else slug
    
    # Extract meta description
    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
    desc = desc_match.group(1).strip() if desc_match else title
    
    # Extract body content or full html
    # Since these are standalone landing pages with complete HTML styling, we can store the full html or body
    city_pages[slug] = {
        "slug": slug,
        "title": title,
        "meta_desc": desc,
        "html": html
    }

print(f"Extracted {len(city_pages)} city pelatihan pages into src/data/city_pelatihan_pages.json")

with open('src/data/city_pelatihan_pages.json', 'w', encoding='utf-8') as f:
    json.dump(city_pages, f, ensure_ascii=False)

print("Saved successfully!")
