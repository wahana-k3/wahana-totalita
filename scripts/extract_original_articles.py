import os
import glob
import json
import re

def extract_from_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # Extract Title
    title_m = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    title = title_m.group(1).split('|')[0].strip() if title_m else ''

    # Extract Meta Desc
    desc_m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
    meta_desc = desc_m.group(1).strip() if desc_m else ''

    # Extract Keywords
    kw_m = re.search(r'<meta\s+name=["\']keywords["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
    keywords = kw_m.group(1).strip() if kw_m else ''

    # Extract FAQs from JSON-LD
    faqs = []
    faq_match = re.search(r'\{[^{]*"@type"\s*:\s*"FAQPage"[^}]*"mainEntity"\s*:\s*\[(.*?)\]\s*\}', html, re.DOTALL)
    if faq_match:
        q_blocks = re.findall(r'\{\s*"@type"\s*:\s*"Question",\s*"name"\s*:\s*"(.*?)",\s*"acceptedAnswer"\s*:\s*\{\s*"@type"\s*:\s*"Answer",\s*"text"\s*:\s*"(.*?)"\s*\}\s*\}', faq_match.group(1), re.DOTALL)
        for q, a in q_blocks:
            faqs.append({"question": q.strip(), "answer": a.strip()})

    # Extract main article body
    article_m = re.search(r'<article[^>]*>(.*?)</article>', html, re.DOTALL | re.IGNORECASE)
    if article_m:
        body = article_m.group(1)
    else:
        main_m = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL | re.IGNORECASE)
        body = main_m.group(1) if main_m else html

    # Clean body: strip nav, header, footer, script, style
    clean = re.sub(r'<nav\b[^>]*>.*?</nav>', '', body, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r'<header\b[^>]*>.*?</header>', '', clean, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r'<footer\b[^>]*>.*?</footer>', '', clean, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r'<script\b[^>]*>.*?</script>', '', clean, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r'<style\b[^>]*>.*?</style>', '', clean, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r'<a\b[^>]*class=["\'][^"\']*wa-float[^"\']*["\'][^>]*>.*?</a>', '', clean, flags=re.DOTALL | re.IGNORECASE)

    # Normalize newlines
    clean = re.sub(r'\n\s*\n+', '\n\n', clean).strip()

    return {
        "title": title,
        "meta_desc": meta_desc,
        "keywords": keywords,
        "content": clean,
        "faqs": faqs
    }

def main():
    print("Extracting original full article contents from public_html/artikel...")
    with open('src/data/articles/all.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)

    art_by_slug = {a['slug']: a for a in articles}
    updated = 0

    for folder in glob.glob('public_html/artikel/*'):
        if not os.path.isdir(folder):
            continue
        slug = os.path.basename(folder)
        html_file = os.path.join(folder, 'index.html')
        if not os.path.exists(html_file):
            continue

        extracted = extract_from_html_file(html_file)
        if slug in art_by_slug:
            a = art_by_slug[slug]
            # Replace placeholder if existing is thin
            if len(a.get('content', '').split()) < 100 or 'dimigrasikan dari versi statis' in a.get('content', ''):
                a['content'] = extracted['content']
                if extracted['faqs']:
                    a['faqs'] = extracted['faqs']
                if extracted['meta_desc']:
                    a['meta_desc'] = extracted['meta_desc']
                if extracted['keywords']:
                    a['keywords'] = extracted['keywords']
                updated += 1
        else:
            # Add new article
            new_art = {
                "id": len(articles) + 1,
                "title": extracted['title'] or slug.replace('-', ' ').title(),
                "slug": slug,
                "content": extracted['content'],
                "category": "K3",
                "author": "Wahana Totalita Konsultan",
                "published_at": "2025-01-01",
                "meta_title": f"{extracted['title']} | Wahana Totalita",
                "meta_desc": extracted['meta_desc'],
                "keywords": extracted['keywords'],
                "status": "published",
                "faqs": extracted['faqs']
            }
            articles.append(new_art)
            art_by_slug[slug] = new_art
            updated += 1

    # Also clean literal '\n' escaping inside article contents across the board
    for a in articles:
        content = a.get('content', '')
        if r'\n' in content:
            a['content'] = content.replace(r'\n', '\n')

    with open('src/data/articles/all.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)
    with open('src/data/articles.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)

    print(f"[OK] Extracted and enriched {updated} articles from static HTML source files.")

if __name__ == '__main__':
    main()
