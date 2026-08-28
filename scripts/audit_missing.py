import os
import re
import json

base_dir = r"c:\Users\ASUS\Pictures\pena_platform"
db_path = os.path.join(base_dir, "u566907099_wahana_db.sql")

with open(db_path, "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

with open(os.path.join(base_dir, "src", "data", "trainings.json"), "r", encoding="utf-8") as f:
    current_trainings = json.load(f)
current_training_slugs = {t["slug"]: t for t in current_trainings}

with open(os.path.join(base_dir, "src", "data", "articles.json"), "r", encoding="utf-8") as f:
    current_articles = json.load(f)
current_article_slugs = {a["slug"]: a for a in current_articles}

# Find all training slugs in SQL
# Look for all INSERT INTO `trainings`
training_matches = re.findall(r"\(\s*(\d+),\s*(\d+),\s*'([^']+)',\s*'([^']+)'", sql)
print(f"Total training tuples in SQL dump: {len(training_matches)}")

missing_trainings = []
for t in training_matches:
    t_id, cat_id, name, slug = t
    if slug not in current_training_slugs:
        missing_trainings.append({"id": t_id, "name": name, "slug": slug, "cat_id": cat_id})

print(f"Missing trainings count: {len(missing_trainings)}")
for m in missing_trainings:
    print("  Missing Training:", m)

# Find all articles in SQL (including draft or any status)
article_matches = re.findall(r"\(\s*(\d+),\s*'([^']*)',\s*'([^']+)',\s*'(?:[^']*)',\s*'(?:[^']*)',\s*(?:NULL|'[^']*'),\s*'([^']*)',\s*(?:NULL|'[^']*'),\s*'([^']*)',\s*(?:NULL|'[^']*'),\s*'([^']*)',\s*'([^']*)'", sql)
print(f"\nTotal article tuples in SQL dump: {len(article_matches)}")

missing_articles = []
for a in article_matches:
    a_id, title, slug, cat, content, author, status = a
    if slug not in current_article_slugs:
        missing_articles.append({"id": a_id, "title": title, "slug": slug, "status": status, "cat": cat})

print(f"Missing articles count: {len(missing_articles)}")
for m in missing_articles:
    print("  Missing Article:", m)

# Also check other SQL files
for extra_sql in ["u566907099_traininghub.sql", "u566907099_tags.sql"]:
    extra_path = os.path.join(base_dir, extra_sql)
    if os.path.exists(extra_path):
        with open(extra_path, "r", encoding="utf-8", errors="ignore") as f:
            extra_content = f.read()
        extra_t = re.findall(r"\(\s*(\d+),\s*(\d+),\s*'([^']+)',\s*'([^']+)'", extra_content)
        extra_a = re.findall(r"\(\s*(\d+),\s*'([^']*)',\s*'([^']+)'", extra_content)
        print(f"\nIn {extra_sql}: found {len(extra_t)} training patterns, {len(extra_a)} article patterns")
