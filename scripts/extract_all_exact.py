import os
import json
import re

base_dir = r"c:\Users\ASUS\Pictures\pena_platform"
db_path = os.path.join(base_dir, "u566907099_wahana_db.sql")

def parse_all_sql_table_rows(sql_text, target_table):
    """
    State-machine SQL parser to cleanly extract ALL tuples across ALL INSERT INTO chunks.
    """
    rows = []
    pattern = re.compile(rf'INSERT\s+INTO\s+`?{target_table}`?\s*(\([^)]+\))?\s*VALUES', re.IGNORECASE)
    
    for match in pattern.finditer(sql_text):
        cur = match.end()
        in_row = False
        in_string = False
        string_escape = False
        quote_char = None
        current_val = []
        current_row = []

        while cur < len(sql_text):
            ch = sql_text[cur]

            if in_string:
                if string_escape:
                    current_val.append(ch)
                    string_escape = False
                elif ch == '\\':
                    string_escape = True
                elif ch == quote_char:
                    # Check for double quote escape ''
                    if cur + 1 < len(sql_text) and sql_text[cur + 1] == quote_char:
                        current_val.append(quote_char)
                        cur += 1
                    else:
                        in_string = False
                else:
                    current_val.append(ch)
            else:
                if ch == "'" or ch == '"':
                    in_string = True
                    quote_char = ch
                elif ch == '(':
                    if not in_row:
                        in_row = True
                        current_row = []
                        current_val = []
                elif ch == ')':
                    if in_row:
                        val_str = "".join(current_val).strip()
                        current_row.append(None if val_str == "NULL" else val_str)
                        rows.append(current_row)
                        in_row = False
                        current_row = []
                        current_val = []
                elif ch == ',':
                    if in_row:
                        val_str = "".join(current_val).strip()
                        current_row.append(None if val_str == "NULL" else val_str)
                        current_val = []
                elif ch == ';':
                    if not in_row:
                        break
                else:
                    if in_row:
                        current_val.append(ch)
            cur += 1

    return rows

with open(db_path, "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

# -------------------------------------------------------------
# 1. PARSE TRAININGS
# -------------------------------------------------------------
training_rows = parse_all_sql_table_rows(sql, "trainings")
print(f"Total training rows extracted across all INSERT statements: {len(training_rows)}")

cat_map = {
    '1': 'k3',
    '2': 'lingkungan',
    '3': 'system-management',
    '4': 'mining'
}

trainings = []
seen_slugs = set()
for r in training_rows:
    if len(r) < 4:
        continue
    t_id = int(r[0])
    cat_id = str(r[1]) if r[1] is not None else '1'
    name = r[2] or ""
    slug = r[3] or ""
    
    if not slug or slug in seen_slugs:
        continue
    seen_slugs.add(slug)

    mode = r[4] or "blended" if len(r) > 4 else "blended"
    cert = r[5] or "KEMNAKER RI" if len(r) > 5 else "KEMNAKER RI"
    
    price = 0.0
    try:
        if len(r) > 6 and r[6] is not None:
            price = float(r[6])
    except Exception:
        price = 0.0
        
    price_label = r[7] or "" if len(r) > 7 else ""
    desc = r[8] or "" if len(r) > 8 else ""
    long_content = r[9] or "" if len(r) > 9 else ""
    curriculum_raw = r[10] or "" if len(r) > 10 else ""
    
    duration = 3
    try:
        if len(r) > 11 and r[11] is not None and str(r[11]).isdigit():
            duration = int(r[11])
    except Exception:
        duration = 3
        
    meta_title = r[13] if len(r) > 13 and r[13] else f"{name} | Wahana Totalita"
    meta_desc = r[14] if len(r) > 14 and r[14] else desc
    wa_text = r[15] if len(r) > 15 and r[15] else f"Halo Wahana Totalita, saya ingin mendaftar pelatihan {name}"
    is_active = int(r[17]) if len(r) > 17 and r[17] is not None and str(r[17]).isdigit() else 1
    validity = int(r[22]) if len(r) > 22 and r[22] is not None and str(r[22]).isdigit() else 36

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
        "wa_text": wa_text
    })

print(f"Successfully processed {len(trainings)} unique trainings")
with open(os.path.join(base_dir, "src", "data", "trainings.json"), "w", encoding="utf-8") as f:
    json.dump(trainings, f, indent=2, ensure_ascii=False)


# -------------------------------------------------------------
# 2. PARSE ARTICLES
# -------------------------------------------------------------
article_rows = parse_all_sql_table_rows(sql, "articles")
print(f"Total article rows extracted across all INSERT statements: {len(article_rows)}")

articles = []
seen_art_slugs = set()
for r in article_rows:
    if len(r) < 3:
        continue
    a_id = int(r[0])
    title = r[1] or ""
    slug = r[2] or ""
    
    if not slug or slug in seen_art_slugs:
        continue
    seen_art_slugs.add(slug)

    meta_title = r[3] if len(r) > 3 and r[3] else f"{title} | Wahana Totalita"
    meta_desc = r[4] if len(r) > 4 and r[4] else ""
    keywords = r[5] or "" if len(r) > 5 else ""
    cat = r[6] or "K3" if len(r) > 6 else "K3"
    content = r[8] or "" if len(r) > 8 else ""
    faq_raw = r[9] or "" if len(r) > 9 else ""
    author = r[10] or "Wahana Totalita Konsultan" if len(r) > 10 else "Wahana Totalita Konsultan"
    status = r[11] or "published" if len(r) > 11 else "published"
    published_at = r[12] or "2026-01-01" if len(r) > 12 else "2026-01-01"

    faqs = []
    if faq_raw:
        try:
            faqs = json.loads(faq_raw)
        except Exception:
            faqs = []

    articles.append({
        "id": a_id,
        "title": title,
        "slug": slug,
        "content": content,
        "category": cat,
        "author": author,
        "published_at": str(published_at),
        "meta_title": meta_title,
        "meta_desc": meta_desc,
        "keywords": keywords,
        "status": status,
        "faqs": faqs
    })

print(f"Successfully processed {len(articles)} unique articles")
with open(os.path.join(base_dir, "src", "data", "articles.json"), "w", encoding="utf-8") as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)
