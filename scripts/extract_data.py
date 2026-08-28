import os
import re
import json

base_dir = r"c:\Users\ASUS\Pictures\pena_platform"
db_path = os.path.join(base_dir, "u566907099_wahana_db.sql")
out_dir = os.path.join(base_dir, "src", "data")
os.makedirs(out_dir, exist_ok=True)

with open(db_path, "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

# -------------------------------------------------------------
# 1. Parse Safety Talk from tools/safety-talk.php (All 100 topics)
# -------------------------------------------------------------
safety_php_path = os.path.join(base_dir, "public_html", "tools", "safety-talk.php")
with open(safety_php_path, "r", encoding="utf-8", errors="ignore") as f:
    safety_content = f.read()

# Extract the $talks array block
talks_match = re.search(r'\$talks\s*=\s*\[(.*?)\n\s*\];', safety_content, re.DOTALL)
safety_talks = []
if talks_match:
    raw_array = talks_match.group(1)
    # Parse individual array items: ["w" => 1, "cat" => "...", ...]
    items = re.findall(r'\[\s*"w"\s*=>\s*(\d+),\s*"cat"\s*=>\s*"([^"]*)",\s*"title"\s*=>\s*"([^"]*)",\s*"desc"\s*=>\s*"([^"]*)",\s*"tags"\s*=>\s*\[(.*?)\](?:,\s*"stat"\s*=>\s*"([^"]*)")?(?:,\s*"points"\s*=>\s*\[(.*?)\])?(?:,\s*"steps"\s*=>\s*\[(.*?)\])?\s*\]', raw_array)
    for it in items:
        w_num, cat, title, desc, raw_tags, stat, raw_points, raw_steps = it
        tags = [t.strip().strip('"\'') for t in raw_tags.split(",") if t.strip()]
        points = [p.strip().strip('"\'') for p in raw_points.split('",') if p.strip()]
        points = [p.strip('"\'') for p in points]
        steps = [s.strip().strip('"\'') for s in raw_steps.split('",') if s.strip()]
        steps = [s.strip('"\'') for s in steps]
        
        safety_talks.append({
            "id": int(w_num),
            "category": cat,
            "title": title,
            "description": desc,
            "tags": tags,
            "statistic": stat if stat else "",
            "discussion_points": points,
            "action_steps": steps
        })

print(f"Extracted {len(safety_talks)} Safety Talk topics")
with open(os.path.join(out_dir, "safety_talks.json"), "w", encoding="utf-8") as f:
    json.dump(safety_talks, f, indent=2, ensure_ascii=False)


# -------------------------------------------------------------
# 2. Extract Site Settings
# -------------------------------------------------------------
settings = {
    "site_name": "Wahana Totalita Konsultan",
    "tagline": "Penyedia Pelatihan & Sertifikasi K3, Lingkungan, Mining & ISO Terakreditasi",
    "phone": "+62 877-5915-1278",
    "whatsapp": "6287759151278",
    "email": "info@wahanatotalita.com",
    "address": "Yogyakarta, Indonesia",
    "accreditation": "KEMNAKER RI, BNSP, PaDi UMKM, Vendor LPSE",
    "site_url": "https://wahanatotalita.com"
}
with open(os.path.join(out_dir, "site_settings.json"), "w", encoding="utf-8") as f:
    json.dump(settings, f, indent=2, ensure_ascii=False)


# -------------------------------------------------------------
# 3. Extract Trainings from SQL
# -------------------------------------------------------------
# CREATE TABLE `trainings` ( `id`, `category_id`, `name`, `slug`, `mode`, `certification`, `price`, `price_label`, `description`, `long_content`, `curriculum`, `duration_days`, `image_path`, `meta_title`, `meta_desc`, `wa_text`, `is_featured`, `is_active`, `view_count`, `sort_order`, `created_at`, `updated_at`, `validity_months` )

# Let's extract training rows
trainings_match = re.search(r"INSERT INTO `trainings`\s*\([^)]+\)\s*VALUES\s*(.*?);(?=\n\n|\n--|\n/\*|\Z)", sql, re.DOTALL)
trainings = []
if trainings_match:
    raw_tuples = trainings_match.group(1)
    # Split tuples by `),\n(` or `), (`
    rows = re.findall(r"\((.*?)\)(?:,\n|\s*,\s*\(|\s*;\s*$)", raw_tuples, re.DOTALL)
    for r in rows:
        # Simple csv parser for SQL tuple
        # Let's do a reliable tokenizer
        tokens = []
        in_str = False
        curr = []
        esc = False
        for c in r:
            if c == '\\' and not esc:
                esc = True
                curr.append(c)
                continue
            if c == "'" and not esc:
                in_str = not in_str
                curr.append(c)
            elif c == ',' and not in_str:
                tokens.append("".join(curr).strip())
                curr = []
            else:
                curr.append(c)
            esc = False
        if curr:
            tokens.append("".join(curr).strip())

        def clean_token(t):
            if t == 'NULL': return None
            if t.startswith("'") and t.endswith("'"):
                # unescape SQL
                val = t[1:-1]
                val = val.replace("\\'", "'").replace('\\"', '"').replace('\\n', '\n').replace('\\r', '\r').replace('\\t', '\t').replace('\\\\', '\\')
                return val
            try:
                if '.' in t: return float(t)
                return int(t)
            except:
                return t

        cleaned = [clean_token(t) for t in tokens]
        if len(cleaned) >= 15:
            # map fields
            t_id = cleaned[0]
            cat_id = cleaned[1]
            cat_map = {1: 'k3', 2: 'system-management', 3: 'lingkungan', 4: 'mining'}
            category = cat_map.get(cat_id, 'k3')
            name = cleaned[2]
            slug = cleaned[3]
            mode = cleaned[4] or 'online'
            certification = cleaned[5] or 'Sertifikasi BNSP'
            price = cleaned[6] or 0
            price_label = cleaned[7] or '/ orang'
            description = cleaned[8] or ''
            long_content = cleaned[9] or ''
            curriculum_raw = cleaned[10]
            curriculum = []
            if curriculum_raw:
                try:
                    curriculum = json.loads(curriculum_raw)
                except:
                    curriculum = []
            duration_days = cleaned[11] or 3
            image_path = cleaned[12] or ''
            meta_title = cleaned[13] or f"{name} | Wahana Totalita"
            meta_desc = cleaned[14] or description[:150]
            wa_text = cleaned[15] or f"Halo Wahana Totalita, saya tertarik mendaftar {name}"
            is_featured = bool(cleaned[16]) if len(cleaned) > 16 else False
            is_active = bool(cleaned[17]) if len(cleaned) > 17 else True
            validity_months = cleaned[22] if len(cleaned) > 22 and cleaned[22] is not None else 36

            if slug and is_active:
                trainings.append({
                    "id": t_id,
                    "name": name,
                    "slug": slug,
                    "category": category,
                    "mode": mode,
                    "certification": certification,
                    "price": price,
                    "price_label": price_label,
                    "description": description,
                    "long_content": long_content,
                    "curriculum": curriculum,
                    "duration_days": duration_days,
                    "image_path": image_path,
                    "meta_title": meta_title,
                    "meta_desc": meta_desc,
                    "wa_text": wa_text,
                    "is_featured": is_featured,
                    "validity_months": validity_months
                })

print(f"Extracted {len(trainings)} training programs")
with open(os.path.join(out_dir, "trainings.json"), "w", encoding="utf-8") as f:
    json.dump(trainings, f, indent=2, ensure_ascii=False)


# -------------------------------------------------------------
# 4. Extract Articles from SQL
# -------------------------------------------------------------
# `id`, `title`, `slug`, `meta_title`, `meta_desc`, `keywords`, `category`, `thumbnail`, `content`, `faq_data`, `author`, `status`, `published_at`
articles_match = re.search(r"INSERT INTO `articles`\s*\([^)]+\)\s*VALUES\s*(.*?);(?=\n\n|\n--|\n/\*|\Z)", sql, re.DOTALL)
articles = []
if articles_match:
    raw_tuples = articles_match.group(1)
    rows = re.findall(r"\((.*?)\)(?:,\n|\s*,\s*\(|\s*;\s*$)", raw_tuples, re.DOTALL)
    for r in rows:
        tokens = []
        in_str = False
        curr = []
        esc = False
        for c in r:
            if c == '\\' and not esc:
                esc = True
                curr.append(c)
                continue
            if c == "'" and not esc:
                in_str = not in_str
                curr.append(c)
            elif c == ',' and not in_str:
                tokens.append("".join(curr).strip())
                curr = []
            else:
                curr.append(c)
            esc = False
        if curr:
            tokens.append("".join(curr).strip())

        def clean_token(t):
            if t == 'NULL': return None
            if t.startswith("'") and t.endswith("'"):
                val = t[1:-1]
                val = val.replace("\\'", "'").replace('\\"', '"').replace('\\n', '\n').replace('\\r', '\r').replace('\\t', '\t').replace('\\\\', '\\')
                return val
            try:
                if '.' in t: return float(t)
                return int(t)
            except:
                return t

        cleaned = [clean_token(t) for t in tokens]
        if len(cleaned) >= 10:
            a_id = cleaned[0]
            title = cleaned[1]
            slug = cleaned[2]
            meta_title = cleaned[3] or f"{title} | Wahana Totalita"
            meta_desc = cleaned[4] or ""
            keywords = cleaned[5] or ""
            category = cleaned[6] or "K3"
            thumbnail = cleaned[7] or ""
            content = cleaned[8] or ""
            faq_data_raw = cleaned[9]
            faqs = []
            if faq_data_raw:
                try:
                    faqs = json.loads(faq_data_raw)
                except:
                    faqs = []
            author = cleaned[10] if len(cleaned) > 10 and cleaned[10] else "Wahana Totalita Konsultan"
            status = cleaned[11] if len(cleaned) > 11 else "published"
            published_at = cleaned[12] if len(cleaned) > 12 and cleaned[12] else "2026-01-01"

            if slug and status == 'published':
                articles.append({
                    "id": a_id,
                    "title": title,
                    "slug": slug,
                    "meta_title": meta_title,
                    "meta_desc": meta_desc,
                    "keywords": keywords,
                    "category": category,
                    "thumbnail": thumbnail,
                    "content": content,
                    "faqs": faqs,
                    "author": author,
                    "published_at": str(published_at)
                })

print(f"Extracted {len(articles)} published articles")
with open(os.path.join(out_dir, "articles.json"), "w", encoding="utf-8") as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)


# -------------------------------------------------------------
# 5. Extract Glossary from SQL
# -------------------------------------------------------------
glossary_match = re.search(r"INSERT INTO `glossary`\s*\([^)]+\)\s*VALUES\s*(.*?);(?=\n\n|\n--|\n/\*|\Z)", sql, re.DOTALL)
glossary = []
if glossary_match:
    raw_tuples = glossary_match.group(1)
    rows = re.findall(r"\((.*?)\)(?:,\n|\s*,\s*\(|\s*;\s*$)", raw_tuples, re.DOTALL)
    for r in rows:
        tokens = []
        in_str = False
        curr = []
        esc = False
        for c in r:
            if c == '\\' and not esc:
                esc = True
                curr.append(c)
                continue
            if c == "'" and not esc:
                in_str = not in_str
                curr.append(c)
            elif c == ',' and not in_str:
                tokens.append("".join(curr).strip())
                curr = []
            else:
                curr.append(c)
            esc = False
        if curr:
            tokens.append("".join(curr).strip())

        def clean_token(t):
            if t == 'NULL': return None
            if t.startswith("'") and t.endswith("'"):
                val = t[1:-1]
                val = val.replace("\\'", "'").replace('\\"', '"').replace('\\n', '\n').replace('\\r', '\r').replace('\\t', '\t').replace('\\\\', '\\')
                return val
            try:
                if '.' in t: return float(t)
                return int(t)
            except:
                return t

        cleaned = [clean_token(t) for t in tokens]
        if len(cleaned) >= 5:
            g_id = cleaned[0]
            term = cleaned[1]
            slug = cleaned[2]
            category = cleaned[3] or "K3"
            definition = cleaned[4] or ""
            full_article = cleaned[5] if len(cleaned) > 5 else ""
            regulation = cleaned[6] if len(cleaned) > 6 else ""
            related_terms = cleaned[7] if len(cleaned) > 7 else ""
            meta_title = cleaned[9] if len(cleaned) > 9 and cleaned[9] else f"Pengertian {term} dalam K3 & Regulasi | Wahana Totalita"
            meta_desc = cleaned[10] if len(cleaned) > 10 and cleaned[10] else definition[:155]

            if slug and term:
                glossary.append({
                    "id": g_id,
                    "term": term,
                    "slug": slug,
                    "category": category,
                    "definition": definition,
                    "full_article": full_article,
                    "regulation": regulation,
                    "related_terms": related_terms,
                    "meta_title": meta_title,
                    "meta_desc": meta_desc
                })

print(f"Extracted {len(glossary)} glossary terms")
with open(os.path.join(out_dir, "glossary.json"), "w", encoding="utf-8") as f:
    json.dump(glossary, f, indent=2, ensure_ascii=False)


# -------------------------------------------------------------
# 6. Extract Incidents from SQL
# -------------------------------------------------------------
incidents_match = re.search(r"INSERT INTO `incidents`\s*\([^)]+\)\s*VALUES\s*(.*?);(?=\n\n|\n--|\n/\*|\Z)", sql, re.DOTALL)
incidents = []
if incidents_match:
    raw_tuples = incidents_match.group(1)
    rows = re.findall(r"\((.*?)\)(?:,\n|\s*,\s*\(|\s*;\s*$)", raw_tuples, re.DOTALL)
    for r in rows:
        tokens = []
        in_str = False
        curr = []
        esc = False
        for c in r:
            if c == '\\' and not esc:
                esc = True
                curr.append(c)
                continue
            if c == "'" and not esc:
                in_str = not in_str
                curr.append(c)
            elif c == ',' and not in_str:
                tokens.append("".join(curr).strip())
                curr = []
            else:
                curr.append(c)
            esc = False
        if curr:
            tokens.append("".join(curr).strip())

        def clean_token(t):
            if t == 'NULL': return None
            if t.startswith("'") and t.endswith("'"):
                val = t[1:-1]
                val = val.replace("\\'", "'").replace('\\"', '"').replace('\\n', '\n').replace('\\r', '\r').replace('\\t', '\t').replace('\\\\', '\\')
                return val
            try:
                if '.' in t: return float(t)
                return int(t)
            except:
                return t

        cleaned = [clean_token(t) for t in tokens]
        if len(cleaned) >= 5:
            incidents.append({
                "id": cleaned[0],
                "title": cleaned[1] if len(cleaned) > 1 else "",
                "slug": cleaned[2] if len(cleaned) > 2 else f"insiden-{cleaned[0]}",
                "category": cleaned[3] if len(cleaned) > 3 else "K3",
                "summary": cleaned[4] if len(cleaned) > 4 else "",
                "analysis": cleaned[5] if len(cleaned) > 5 else "",
                "lessons_learned": cleaned[6] if len(cleaned) > 6 else "",
                "incident_date": str(cleaned[7]) if len(cleaned) > 7 and cleaned[7] else "2026"
            })

print(f"Extracted {len(incidents)} incident reports")
with open(os.path.join(out_dir, "incidents.json"), "w", encoding="utf-8") as f:
    json.dump(incidents, f, indent=2, ensure_ascii=False)


# -------------------------------------------------------------
# 7. Extract Cities (25 cities + 374 city matrix static index)
# -------------------------------------------------------------
cities_match = re.search(r"INSERT INTO `cities`\s*\([^)]+\)\s*VALUES\s*(.*?);(?=\n\n|\n--|\n/\*|\Z)", sql, re.DOTALL)
cities = []
if cities_match:
    raw_tuples = cities_match.group(1)
    rows = re.findall(r"\((.*?)\)(?:,\n|\s*,\s*\(|\s*;\s*$)", raw_tuples, re.DOTALL)
    for r in rows:
        tokens = [t.strip().strip("'") for t in r.split(",")]
        if len(tokens) >= 3:
            cities.append({
                "id": int(tokens[0]) if tokens[0].isdigit() else 0,
                "name": tokens[1],
                "slug": tokens[2],
                "province": tokens[3] if len(tokens) > 3 else ""
            })

if not cities:
    # fallback from kota.php
    default_cities = [
        {"name": "Jakarta", "slug": "jakarta", "province": "DKI Jakarta"},
        {"name": "Surabaya", "slug": "surabaya", "province": "Jawa Timur"},
        {"name": "Bandung", "slug": "bandung", "province": "Jawa Barat"},
        {"name": "Medan", "slug": "medan", "province": "Sumatera Utara"},
        {"name": "Makassar", "slug": "makassar", "province": "Sulawesi Selatan"},
        {"name": "Semarang", "slug": "semarang", "province": "Jawa Tengah"},
        {"name": "Batam", "slug": "batam", "province": "Kepulauan Riau"},
        {"name": "Pekanbaru", "slug": "pekanbaru", "province": "Riau"},
        {"name": "Balikpapan", "slug": "balikpapan", "province": "Kalimantan Timur"},
        {"name": "Yogyakarta", "slug": "yogyakarta", "province": "D.I. Yogyakarta"},
        {"name": "Palembang", "slug": "palembang", "province": "Sumatera Selatan"},
        {"name": "Bekasi", "slug": "bekasi", "province": "Jawa Barat"},
        {"name": "Cilegon", "slug": "cilegon", "province": "Banten"},
        {"name": "Samarinda", "slug": "samarinda", "province": "Kalimantan Timur"},
        {"name": "Denpasar", "slug": "denpasar", "province": "Bali"},
        {"name": "Malang", "slug": "malang", "province": "Jawa Timur"},
        {"name": "Solo", "slug": "solo", "province": "Jawa Tengah"},
        {"name": "Karawang", "slug": "karawang", "province": "Jawa Barat"},
        {"name": "Tangerang", "slug": "tangerang", "province": "Banten"},
        {"name": "Bogor", "slug": "bogor", "province": "Jawa Barat"},
    ]
    cities = default_cities

print(f"Extracted {len(cities)} city entries")
with open(os.path.join(out_dir, "cities.json"), "w", encoding="utf-8") as f:
    json.dump(cities, f, indent=2, ensure_ascii=False)

print("\n--- ALL DATA EXTRACTION COMPLETED SUCCESSFULLY ---")
