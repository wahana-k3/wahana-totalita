import os
import json

base_dir = r"c:\Users\ASUS\Pictures\pena_platform"
db_path = os.path.join(base_dir, "u566907099_wahana_db.sql")

def parse_sql_inserts(sql_text, target_table):
    """
    Foolproof SQL INSERT VALUES parser that properly handles quotes, escape characters,
    multiline text, NULLs, numbers, etc.
    """
    rows = []
    insert_prefix = f"INSERT INTO `{target_table}`"
    pos = 0
    
    while True:
        idx = sql_text.find(insert_prefix, pos)
        if idx == -1:
            break
        
        # Find 'VALUES' keyword
        values_idx = sql_text.find("VALUES", idx)
        if values_idx == -1:
            break
        
        cur = values_idx + len("VALUES")
        # Now parse tuples: (val1, val2, ...)
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
                        # End of row
                        val_str = "".join(current_val).strip()
                        if val_str == "NULL":
                            current_row.append(None)
                        else:
                            current_row.append(val_str)
                        rows.append(current_row)
                        in_row = False
                        current_row = []
                        current_val = []
                elif ch == ',':
                    if in_row:
                        val_str = "".join(current_val).strip()
                        if val_str == "NULL":
                            current_row.append(None)
                        else:
                            current_row.append(val_str)
                        current_val = []
                elif ch == ';':
                    if not in_row:
                        break
                else:
                    if in_row:
                        current_val.append(ch)
            cur += 1
        pos = cur
        
    return rows

print("Reading database SQL...")
with open(db_path, "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

# 1. PARSE TRAININGS
training_rows = parse_sql_inserts(sql, "trainings")
print(f"Parsed {len(training_rows)} training rows from table `trainings`")

cat_map = {
    '1': 'k3',
    '2': 'lingkungan',
    '3': 'system-management',
    '4': 'mining'
}

trainings = []
for r in training_rows:
    # id, category_id, name, slug, description, long_content, image, certification_type, mode, duration_days, price, price_label, validity_months, curriculum, requirements, facilities, target_audience, meta_title, meta_description, keywords, is_featured, is_active, sort_order, created_at, updated_at
    if len(r) >= 4:
        t_id = int(r[0])
        cat_id = str(r[1]) if r[1] is not None else '1'
        name = r[2] or ""
        slug = r[3] or ""
        desc = r[4] or "" if len(r) > 4 else ""
        long_content = r[5] or "" if len(r) > 5 else ""
        cert = r[7] or "KEMNAKER RI" if len(r) > 7 else "KEMNAKER RI"
        mode = r[8] or "blended" if len(r) > 8 else "blended"
        duration = int(r[9]) if len(r) > 9 and r[9] is not None and str(r[9]).isdigit() else 3
        price = float(r[10]) if len(r) > 10 and r[10] is not None else 0.0
        price_label = r[11] or "" if len(r) > 11 else ""
        validity = int(r[12]) if len(r) > 12 and r[12] is not None and str(r[12]).isdigit() else 36
        curriculum_raw = r[13] if len(r) > 13 else ""
        meta_title = r[17] if len(r) > 17 and r[17] else f"{name} | Wahana Totalita"
        meta_desc = r[18] if len(r) > 18 and r[18] else desc
        is_active = int(r[21]) if len(r) > 21 and r[21] is not None and str(r[21]).isdigit() else 1

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

print(f"Total structured trainings: {len(trainings)}")
with open(os.path.join(base_dir, "src", "data", "trainings.json"), "w", encoding="utf-8") as f:
    json.dump(trainings, f, indent=2, ensure_ascii=False)


# 2. PARSE ARTICLES
article_rows = parse_sql_inserts(sql, "articles")
print(f"Parsed {len(article_rows)} article rows from table `articles`")

articles = []
for r in article_rows:
    # id, title, slug, excerpt, content, featured_image, category, tags, author, published_at, meta_title, meta_description, keywords, is_published, views_count, created_at, updated_at
    if len(r) >= 5:
        a_id = int(r[0])
        title = r[1] or ""
        slug = r[2] or ""
        excerpt = r[3] or "" if len(r) > 3 else ""
        content = r[4] or "" if len(r) > 4 else ""
        cat = r[6] or "K3" if len(r) > 6 else "K3"
        author = r[8] or "Wahana Totalita Konsultan" if len(r) > 8 else "Wahana Totalita Konsultan"
        published_at = r[9] or "2026-01-01" if len(r) > 9 else "2026-01-01"
        meta_title = r[10] if len(r) > 10 and r[10] else f"{title} | Wahana Totalita"
        meta_desc = r[11] if len(r) > 11 and r[11] else excerpt
        keywords = r[12] or "" if len(r) > 12 else ""
        is_published = int(r[13]) if len(r) > 13 and r[13] is not None and str(r[13]).isdigit() else 1

        articles.append({
            "id": a_id,
            "title": title,
            "slug": slug,
            "excerpt": excerpt,
            "content": content,
            "category": cat,
            "author": author,
            "published_at": str(published_at),
            "meta_title": meta_title,
            "meta_desc": meta_desc,
            "keywords": keywords,
            "is_published": is_published
        })

print(f"Total structured articles: {len(articles)}")
with open(os.path.join(base_dir, "src", "data", "articles.json"), "w", encoding="utf-8") as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)
