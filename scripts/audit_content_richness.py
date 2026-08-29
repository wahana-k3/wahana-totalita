import os
import json
import re

def audit_all():
    print("=" * 70)
    print("        WAHANA TOTALITA - CONTENT QUALITY & RICHNESS AUDIT")
    print("=" * 70)

    report = {
        "summary": {},
        "trainings": [],
        "articles": [],
        "services": [],
        "cities": [],
        "thin_pages_alert": []
    }

    # 1. Audit Trainings
    with open('src/data/trainings/all.json', 'r', encoding='utf-8') as f:
        trainings = json.load(f)

    t_rich = 0
    t_adequate = 0
    t_thin = 0

    for t in trainings:
        curriculum = t.get('curriculum') or []
        desc = t.get('description') or ''
        text = f"{t.get('name', '')} {desc} {' '.join(curriculum)}"
        word_count = len(text.split())
        has_meta = bool(t.get('meta_title') and t.get('meta_desc'))
        has_curriculum = len(curriculum) >= 3

        if word_count >= 150 or has_curriculum:
            status = "5-STAR RICH"
            t_rich += 1
        elif word_count >= 80:
            status = "3-STAR ADEQUATE"
            t_adequate += 1
        else:
            status = "1-STAR THIN"
            t_thin += 1
            report["thin_pages_alert"].append({
                "type": "Training",
                "slug": t.get('slug'),
                "title": t.get('name'),
                "word_count": word_count
            })

        report["trainings"].append({
            "slug": t.get('slug'),
            "name": t.get('name'),
            "category": t.get('category'),
            "certification": t.get('certification'),
            "curriculum_modules": len(curriculum),
            "word_count": word_count,
            "has_meta": has_meta,
            "status": status
        })

    # 2. Audit Articles
    with open('src/data/articles/all.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)

    a_rich = 0
    a_adequate = 0
    a_thin = 0

    for a in articles:
        content = a.get('content') or ''
        clean_text = re.sub(r'<[^>]+>', ' ', content)
        word_count = len(clean_text.split())
        has_faqs = len(a.get('faqs') or []) > 0
        has_meta = bool(a.get('meta_title') and a.get('meta_desc'))

        if word_count >= 600:
            status = "5-STAR RICH"
            a_rich += 1
        elif word_count >= 300:
            status = "3-STAR ADEQUATE"
            a_adequate += 1
        else:
            status = "1-STAR THIN"
            a_thin += 1
            report["thin_pages_alert"].append({
                "type": "Article",
                "slug": a.get('slug'),
                "title": a.get('title'),
                "word_count": word_count
            })

        report["articles"].append({
            "slug": a.get('slug'),
            "title": a.get('title'),
            "category": a.get('category'),
            "word_count": word_count,
            "has_faqs": has_faqs,
            "has_meta": has_meta,
            "status": status
        })

    # 3. Audit Services
    with open('src/data/services/services.json', 'r', encoding='utf-8') as f:
        services = json.load(f)

    s_rich = 0
    s_adequate = 0
    s_thin = 0

    for slug, s in services.items():
        word_count = s.get('word_count', 0)
        has_meta = bool(s.get('meta_title') and s.get('meta_desc'))

        if word_count >= 500:
            status = "5-STAR RICH"
            s_rich += 1
        elif word_count >= 200:
            status = "3-STAR ADEQUATE"
            s_adequate += 1
        else:
            status = "1-STAR THIN"
            s_thin += 1
            report["thin_pages_alert"].append({
                "type": "Service",
                "slug": slug,
                "title": s.get('title'),
                "word_count": word_count
            })

        report["services"].append({
            "slug": slug,
            "title": s.get('title'),
            "word_count": word_count,
            "has_meta": has_meta,
            "status": status
        })

    # 4. Audit City Pages
    with open('src/data/cities/city_pelatihan_cleaned.json', 'r', encoding='utf-8') as f:
        cities = json.load(f)

    c_rich = 0
    c_adequate = 0
    c_thin = 0

    for slug, c in cities.items():
        word_count = c.get('word_count', 0)
        if word_count >= 600:
            c_rich += 1
        elif word_count >= 300:
            c_adequate += 1
        else:
            c_thin += 1
            report["thin_pages_alert"].append({
                "type": "City Page",
                "slug": slug,
                "title": c.get('title'),
                "word_count": word_count
            })

    # Summary
    report["summary"] = {
        "trainings_total": len(trainings),
        "trainings_rich": t_rich,
        "trainings_adequate": t_adequate,
        "trainings_thin": t_thin,
        "articles_total": len(articles),
        "articles_rich": a_rich,
        "articles_adequate": a_adequate,
        "articles_thin": a_thin,
        "services_total": len(services),
        "services_rich": s_rich,
        "services_adequate": s_adequate,
        "services_thin": s_thin,
        "cities_total": len(cities),
        "cities_rich": c_rich,
        "cities_adequate": c_adequate,
        "cities_thin": c_thin,
        "total_thin_alerts": len(report["thin_pages_alert"])
    }

    with open('audit_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"[*] TRAININGS ({len(trainings)} total): {t_rich} Rich (5*), {t_adequate} Adequate (3*), {t_thin} Thin (1*)")
    print(f"[*] ARTICLES ({len(articles)} total): {a_rich} Rich (5*), {a_adequate} Adequate (3*), {a_thin} Thin (1*)")
    print(f"[*] SERVICES ({len(services)} total): {s_rich} Rich (5*), {s_adequate} Adequate (3*), {s_thin} Thin (1*)")
    print(f"[*] CITY PAGES ({len(cities)} total): {c_rich} Rich (5*), {c_adequate} Adequate (3*), {c_thin} Thin (1*)")
    print("-" * 70)
    print(f"TOTAL THIN PAGES ALERT: {len(report['thin_pages_alert'])}")
    if report["thin_pages_alert"]:
        print("Sample thin pages:")
        for item in report["thin_pages_alert"][:5]:
            print(f" - [{item['type']}] {item['slug']} ({item['word_count']} words): {item['title']}")
    print("=" * 70)
    print("[SUCCESS] Audit saved to audit_report.json")

if __name__ == '__main__':
    audit_all()
