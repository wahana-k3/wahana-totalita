import os
import re
import json

base_dir = r"c:\Users\ASUS\Pictures\pena_platform"
db_path = os.path.join(base_dir, "u566907099_wahana_db.sql")

with open(db_path, "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

# -------------------------------------------------------------
# 1. ROBUST EXTRACT ALL TRAININGS
# -------------------------------------------------------------
trainings_block_match = re.search(r"INSERT INTO `trainings`.*?;", sql, re.DOTALL)
trainings = []

if trainings_block_match:
    block = trainings_block_match.group(0)
    # Split by rows: each row starts with '(' and ends with ')' before ',' or ';'
    # Let's extract values cleanly
    # Columns in `trainings`:
    # id, category_id, name, slug, description, long_content, image, certification_type, mode, duration_days, price, price_label, validity_months, curriculum, requirements, facilities, target_audience, meta_title, meta_description, keywords, is_featured, is_active, sort_order, created_at, updated_at
    
    # We can use regex to find each row tuple: (id, category_id, 'name', 'slug', ...)
    pattern = r"\(\s*(\d+),\s*(\d+),\s*'((?:''|[^'])*)',\s*'((?:''|[^'])*)',\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|(\d+)),\s*(?:NULL|([0-9.]+)),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|(\d+)),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(\d+),\s*(\d+)"
    matches = list(re.finditer(pattern, block))
    print(f"Found {len(matches)} complete training records in SQL table `trainings`")
    
    cat_map = {
        '1': 'k3',
        '2': 'lingkungan',
        '3': 'system-management',
        '4': 'mining'
    }

    for m in matches:
        g = m.groups()
        t_id = int(g[0])
        cat_id = g[1]
        name = g[2].replace("''", "'")
        slug = g[3].replace("''", "'")
        desc = (g[4] or "").replace("''", "'")
        long_content = (g[5] or "").replace("''", "'")
        img = g[6] or ""
        cert = (g[7] or "KEMNAKER RI").replace("''", "'")
        mode = (g[8] or "blended").replace("''", "'")
        duration = int(g[9]) if g[9] else 3
        price = float(g[10]) if g[10] else 0.0
        price_label = (g[11] or "").replace("''", "'")
        validity = int(g[12]) if g[12] else 36
        curriculum_raw = (g[13] or "").replace("''", "'")
        meta_title = (g[17] or f"{name} | Wahana Totalita").replace("''", "'")
        meta_desc = (g[18] or desc).replace("''", "'")
        is_active = int(g[21]) if g[21] else 1

        curriculum = []
        if curriculum_raw:
            try:
                curriculum = json.loads(curriculum_raw)
            except Exception:
                curriculum = [c.strip() for c in curriculum_raw.split("\n") if c.strip()]

        trainings.append({
            "id": t_id,
            "category": cat_map.get(cat_id, "k3"),
            "category_id": int(cat_id),
            "name": name,
            "slug": slug,
            "description": desc,
            "long_content": long_content,
            "certification": cert,
            "mode": mode,
            "duration_days": duration,
            "price": price,
            "price_label": price_label,
            "validity_months": validity,
            "curriculum": curriculum,
            "meta_title": meta_title,
            "meta_desc": meta_desc,
            "is_active": is_active,
            "wa_text": f"Halo Wahana Totalita, saya ingin mendaftar pelatihan {name}"
        })

print(f"Total structured trainings extracted: {len(trainings)}")
with open(os.path.join(base_dir, "src", "data", "trainings.json"), "w", encoding="utf-8") as f:
    json.dump(trainings, f, indent=2, ensure_ascii=False)


# -------------------------------------------------------------
# 2. ROBUST EXTRACT ALL ARTICLES
# -------------------------------------------------------------
articles_block_match = re.search(r"INSERT INTO `articles`.*?;", sql, re.DOTALL)
articles = []

if articles_block_match:
    block = articles_block_match.group(0)
    # Columns in `articles`:
    # id, title, slug, excerpt, content, featured_image, category, tags, author, published_at, meta_title, meta_description, keywords, is_published, views_count, created_at, updated_at
    # Let's use a regex that matches row tuples in `articles`
    pattern = r"\(\s*(\d+),\s*'((?:''|[^'])*)',\s*'((?:''|[^'])*)',\s*(?:NULL|'((?:''|[^'])*)'),\s*'((?:''|[^'])*)',\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(?:NULL|'((?:''|[^'])*)'),\s*(\d+)"
    
    matches = list(re.finditer(pattern, block))
    print(f"Found {len(matches)} complete article records in SQL table `articles`")

    for m in matches:
        g = m.groups()
        a_id = int(g[0])
        title = g[1].replace("''", "'")
        slug = g[2].replace("''", "'")
        excerpt = (g[3] or "").replace("''", "'")
        content = g[4].replace("''", "'")
        cat = (g[6] or "K3").replace("''", "'")
        author = (g[8] or "Wahana Totalita Konsultan").replace("''", "'")
        published_at = g[9] or "2026-01-01"
        meta_title = (g[10] or f"{title} | Wahana Totalita").replace("''", "'")
        meta_desc = (g[11] or excerpt).replace("''", "'")
        keywords = (g[12] or "").replace("''", "'")
        is_published = int(g[13]) if g[13] else 1

        articles.append({
            "id": a_id,
            "title": title,
            "slug": slug,
            "excerpt": excerpt,
            "content": content,
            "category": cat,
            "author": author,
            "published_at": published_at,
            "meta_title": meta_title,
            "meta_desc": meta_desc,
            "keywords": keywords,
            "is_published": is_published
        })

print(f"Total structured articles extracted: {len(articles)}")
with open(os.path.join(base_dir, "src", "data", "articles.json"), "w", encoding="utf-8") as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)
