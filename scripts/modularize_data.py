import os
import json
import re

def clean_html(html_str):
    if not html_str:
        return ''
    # Extract body content if whole document
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html_str, re.DOTALL | re.IGNORECASE)
    content = body_match.group(1) if body_match else html_str

    # Remove nav, header, footer, script, style tags
    content = re.sub(r'<nav\b[^>]*>.*?</nav>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<header\b[^>]*>.*?</header>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<footer\b[^>]*>.*?</footer>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<script\b[^>]*>.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<style\b[^>]*>.*?</style>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<a\b[^>]*class=["\'][^"\']*wa-float[^"\']*["\'][^>]*>.*?</a>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<a\b[^>]*href=["\']https?://wa\.me[^"\']*["\'][^>]*class=["\'][^"\']*float[^"\']*["\'][^>]*>.*?</a>', '', content, flags=re.DOTALL | re.IGNORECASE)

    # Normalize double linebreaks
    content = re.sub(r'\n\s*\n+', '\n\n', content).strip()
    return content

def modularize_trainings():
    print("Modularizing trainings...")
    os.makedirs('src/data/trainings', exist_ok=True)
    with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
        trainings = json.load(f)

    kemnaker = [t for t in trainings if 'kemnaker' in t.get('certification', '').lower()]
    bnsp = [t for t in trainings if 'bnsp' in t.get('certification', '').lower()]
    inhouse = [t for t in trainings if t.get('mode') in ['both', 'offline'] or 'reguler' in t.get('certification', '').lower()]
    softskills = [t for t in trainings if t.get('category') in ['system-management', 'lingkungan']]

    with open('src/data/trainings/all.json', 'w', encoding='utf-8') as f:
        json.dump(trainings, f, indent=2, ensure_ascii=False)
    with open('src/data/trainings/kemnaker.json', 'w', encoding='utf-8') as f:
        json.dump(kemnaker, f, indent=2, ensure_ascii=False)
    with open('src/data/trainings/bnsp.json', 'w', encoding='utf-8') as f:
        json.dump(bnsp, f, indent=2, ensure_ascii=False)
    with open('src/data/trainings/inhouse.json', 'w', encoding='utf-8') as f:
        json.dump(inhouse, f, indent=2, ensure_ascii=False)
    with open('src/data/trainings/softskills.json', 'w', encoding='utf-8') as f:
        json.dump(softskills, f, indent=2, ensure_ascii=False)

    print(f"[OK] Saved {len(trainings)} total trainings: {len(kemnaker)} Kemnaker, {len(bnsp)} BNSP, {len(inhouse)} In-house, {len(softskills)} Softskills/ISO.")

def modularize_articles():
    print("Modularizing articles...")
    os.makedirs('src/data/articles', exist_ok=True)
    with open('src/data/articles.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)

    # Categories: K3, Sertifikasi, Regulasi, Lingkungan, Mining, QHSE
    by_cat = {}
    for a in articles:
        cat = a.get('category', 'K3').lower()
        by_cat.setdefault(cat, []).append(a)

    with open('src/data/articles/all.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)

    for cat, items in by_cat.items():
        filename = f"src/data/articles/{cat.replace(' ', '_')}.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(items, f, indent=2, ensure_ascii=False)

    print(f"[OK] Saved {len(articles)} articles categorized into {list(by_cat.keys())}.")

def modularize_cities():
    print("Modularizing cities & cleaning 374 city pelatihan pages...")
    os.makedirs('src/data/cities', exist_ok=True)

    with open('src/data/city_pelatihan_pages.json', 'r', encoding='utf-8') as f:
        city_pages = json.load(f)

    cleaned_city_pages = {}
    total_orig_len = 0
    total_clean_len = 0

    for slug, data in city_pages.items():
        raw_html = data.get('html', '')
        total_orig_len += len(raw_html)
        clean = clean_html(raw_html)
        total_clean_len += len(clean)

        text_only = re.sub(r'<[^>]+>', ' ', clean)
        word_count = len(text_only.split())

        cleaned_city_pages[slug] = {
            'slug': slug,
            'title': data.get('title', ''),
            'meta_desc': data.get('meta_desc', ''),
            'html': clean,
            'word_count': word_count
        }

    with open('src/data/cities/city_pelatihan_cleaned.json', 'w', encoding='utf-8') as f:
        json.dump(cleaned_city_pages, f, indent=2, ensure_ascii=False)

    if os.path.exists('src/data/cities_detailed.json'):
        with open('src/data/cities_detailed.json', 'r', encoding='utf-8') as f:
            cities_det = json.load(f)
        with open('src/data/cities/hubs.json', 'w', encoding='utf-8') as f:
            json.dump(cities_det, f, indent=2, ensure_ascii=False)

    print(f"[OK] Cleaned 374 city pages: Shrunk from {total_orig_len / (1024*1024):.2f}MB to {total_clean_len / (1024*1024):.2f}MB!")

def modularize_services():
    print("Modularizing services...")
    os.makedirs('src/data/services', exist_ok=True)
    if os.path.exists('src/data/service_pages.json'):
        with open('src/data/service_pages.json', 'r', encoding='utf-8') as f:
            services = json.load(f)
        cleaned_services = {}
        for slug, data in services.items():
            raw_html = data.get('html', '')
            clean = clean_html(raw_html)
            text_only = re.sub(r'<[^>]+>', ' ', clean)
            cleaned_services[slug] = {
                'slug': slug,
                'title': data.get('title', ''),
                'meta_title': data.get('meta_title', ''),
                'meta_desc': data.get('meta_desc', ''),
                'html': clean,
                'has_html': data.get('has_html', False),
                'word_count': len(text_only.split())
            }
        with open('src/data/services/services.json', 'w', encoding='utf-8') as f:
            json.dump(cleaned_services, f, indent=2, ensure_ascii=False)
        print(f"[OK] Cleaned and saved {len(cleaned_services)} service pages.")

def modularize_tools():
    print("Modularizing tools...")
    os.makedirs('src/data/tools', exist_ok=True)
    if os.path.exists('src/data/safety_talks.json'):
        with open('src/data/safety_talks.json', 'r', encoding='utf-8') as f:
            safety_talks = json.load(f)
        with open('src/data/tools/safety_talks.json', 'w', encoding='utf-8') as f:
            json.dump(safety_talks, f, indent=2, ensure_ascii=False)
        print(f"[OK] Saved {len(safety_talks)} safety talks into src/data/tools/.")

if __name__ == '__main__':
    modularize_trainings()
    modularize_articles()
    modularize_cities()
    modularize_services()
    modularize_tools()
    print("\n[SUCCESS] All data modularization completed successfully!")
