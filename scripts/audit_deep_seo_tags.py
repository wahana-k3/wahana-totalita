import os
import glob
import re
import json

def audit_html_file(file_path, route_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # 1. Title Tag
    title_m = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    title = title_m.group(1).strip() if title_m else None
    title_valid = bool(title and len(title) >= 15)

    # 2. Meta Description
    desc_m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
    meta_desc = desc_m.group(1).strip() if desc_m else None
    desc_valid = bool(meta_desc and len(meta_desc) >= 30)

    # 3. Canonical URL
    canon_m = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', html, re.IGNORECASE)
    canonical = canon_m.group(1).strip() if canon_m else None
    canon_valid = bool(canonical and canonical.startswith('https://www.wahanatotalita.com'))

    # 4. H1 Headings
    h1_matches = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL | re.IGNORECASE)
    h1_count = len(h1_matches)
    h1_text = re.sub(r'<[^>]+>', '', h1_matches[0]).strip() if h1_matches else ''
    h1_valid = h1_count >= 1

    # 5. OpenGraph Tags
    og_title = bool(re.search(r'<meta\s+property=["\']og:title["\']', html, re.IGNORECASE))
    og_desc = bool(re.search(r'<meta\s+property=["\']og:description["\']', html, re.IGNORECASE))
    og_valid = og_title and og_desc

    # 6. Schema.org JSON-LD
    json_ld_matches = re.findall(r'<script\s+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
    schema_types = []
    schema_valid = False
    if json_ld_matches:
        for script_content in json_ld_matches:
            try:
                parsed = json.loads(script_content.strip())
                stype = parsed.get('@type', 'Unknown')
                schema_types.append(stype)
                schema_valid = True
            except Exception:
                pass

    # 7. WhatsApp Lead Conversion CTA
    has_wa_cta = 'wa.me/6287759151278' in html or 'wa.me' in html

    # 8. Content Length / Word Count
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
    body_text = re.sub(r'<[^>]+>', ' ', body_match.group(1) if body_match else html)
    word_count = len(body_text.split())
    content_valid = word_count >= 100

    score = sum([
        1 if title_valid else 0,
        1 if desc_valid else 0,
        1 if canon_valid else 0,
        1 if h1_valid else 0,
        1 if og_valid else 0,
        1 if schema_valid else 0,
        1 if has_wa_cta else 0,
        1 if content_valid else 0
    ])

    return {
        "route": route_path,
        "file": os.path.basename(file_path),
        "score": f"{score}/8",
        "title": title,
        "title_valid": title_valid,
        "meta_desc": meta_desc,
        "desc_valid": desc_valid,
        "canonical": canonical,
        "canon_valid": canon_valid,
        "h1_count": h1_count,
        "h1_text": h1_text,
        "og_valid": og_valid,
        "schema_types": schema_types,
        "has_wa_cta": has_wa_cta,
        "word_count": word_count,
        "content_valid": content_valid
    }

def main():
    print("=" * 80)
    print("      WAHANA TOTALITA - DEEP SEO TAGS, CONTENT & CTA AUDIT SUITE")
    print("=" * 80)

    html_files = glob.glob('.next/server/app/**/*.html', recursive=True)
    if not html_files:
        print("[!] No built HTML files found in .next/server/app. Run `npm run build` first.")
        return

    print(f"[*] Found {len(html_files)} pre-rendered static HTML pages in .next/server/app.")
    print("Scanning all tags, metadata, titles, canonicals, schema & CTAs...\n")

    audit_results = []
    perfect_count = 0
    title_ok = 0
    desc_ok = 0
    canon_ok = 0
    h1_ok = 0
    wa_ok = 0
    schema_ok = 0

    for fpath in html_files:
        rel_path = os.path.relpath(fpath, '.next/server/app')
        # Derive route from relative path
        route = '/' + rel_path.replace('\\', '/').replace('.html', '').replace('/index', '')
        if route == '/index':
            route = '/'

        res = audit_html_file(fpath, route)
        audit_results.append(res)

        if res["score"] == "8/8":
            perfect_count += 1
        if res["title_valid"]:
            title_ok += 1
        if res["desc_valid"]:
            desc_ok += 1
        if res["canon_valid"]:
            canon_ok += 1
        if res["h1_text"]:
            h1_ok += 1
        if res["has_wa_cta"]:
            wa_ok += 1
        if res["schema_types"]:
            schema_ok += 1

    total = len(audit_results)

    print("-" * 80)
    print(f"{'AUDIT METRIC':<40} | {'PASSED':<10} | {'TOTAL':<10} | {'COMPLIANCE'}")
    print("-" * 80)
    print(f"{'Page Title Tag (<title>)':<40} | {title_ok:<10} | {total:<10} | {title_ok/total*100:.1f}%")
    print(f"{'Meta Description Tag':<40} | {desc_ok:<10} | {total:<10} | {desc_ok/total*100:.1f}%")
    print(f"{'Canonical URL (https://www.wahanatotalita...)':<40} | {canon_ok:<10} | {total:<10} | {canon_ok/total*100:.1f}%")
    print(f"{'Main Heading (<h1>)':<40} | {h1_ok:<10} | {total:<10} | {h1_ok/total*100:.1f}%")
    print(f"{'WhatsApp Direct Lead Conversion CTA':<40} | {wa_ok:<10} | {total:<10} | {wa_ok/total*100:.1f}%")
    print(f"{'Schema.org JSON-LD Structured Data':<40} | {schema_ok:<10} | {total:<10} | {schema_ok/total*100:.1f}%")
    print("-" * 80)
    print(f"{'100% PERFECT SCORE PAGES (8/8)':<40} | {perfect_count:<10} | {total:<10} | {perfect_count/total*100:.1f}%")
    print("=" * 80)

    # Save detailed JSON report
    with open('seo_tags_audit_report.json', 'w', encoding='utf-8') as f:
        json.dump({
            "total_pages": total,
            "metrics": {
                "title_passed": title_ok,
                "meta_desc_passed": desc_ok,
                "canonical_passed": canon_ok,
                "h1_passed": h1_ok,
                "whatsapp_cta_passed": wa_ok,
                "schema_passed": schema_ok,
                "perfect_pages": perfect_count
            },
            "pages": audit_results
        }, f, indent=2, ensure_ascii=False)

    print("\n[SUCCESS] Full audit report saved to seo_tags_audit_report.json")
    print("Sample verified pages from audit:")
    for sample in audit_results[:5]:
        print(f" - [{sample['score']}] {sample['route']}")
        print(f"     Title: {sample['title']}")
        print(f"     Canonical: {sample['canonical']}")
        print(f"     H1: {sample['h1_text'][:60]}...")
        print(f"     Schema: {sample['schema_types']} | WA CTA: {'YES' if sample['has_wa_cta'] else 'NO'}")

if __name__ == '__main__':
    main()
