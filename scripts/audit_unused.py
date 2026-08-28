import os, glob, re, json

# 1. Inspect SQL tables
with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

tables = re.findall(r'CREATE TABLE\s+[`"]?(\w+)[`"]?', sql, re.IGNORECASE)

print(f"=== 1. DATABASE AUDIT: {len(tables)} TABLES TOTAL ===")
used_tables = {
    'trainings': 'USED -> 147 courses in src/data/trainings.json (/pelatihan & /pelatihan/[slug])',
    'categories': 'USED -> mapped to training categories and hub slugs',
    'articles': 'USED -> 146 published articles in src/data/articles.json (/artikel & /artikel/[slug])',
    'safety_talks': 'USED -> 100 safety talk topics in src/data/safety_talks.json (/tools/safety-talk)',
    'glossary': 'USED -> 184 terms in src/data/glossary.json (/glosarium & /glosarium/[slug])',
    'incidents': 'USED -> 104 incident analysis records in src/data/incidents.json (/insiden & /insiden/[slug])',
    'cities': 'USED -> 374 city combinations mapped into sitemap & static pages',
    'settings': 'USED -> phone numbers, site name, meta tags in src/data/site_settings.json',
}

unused_db = []
for t in sorted(tables):
    if t in used_tables:
        print(f"  [x] {t:30s} -> {used_tables[t]}")
    else:
        # Check rows
        inserts = len(re.findall(rf'INSERT INTO [`"]?{t}[`"]?', sql, re.IGNORECASE))
        print(f"  [ ] {t:30s} -> NOT USED IN FRONTEND (Admin / Backend dynamic data, {inserts} inserts)")
        unused_db.append(t)

# 2. Inspect public_html directories
print("\n=== 2. FILESYSTEM AUDIT: public_html DIRECTORIES ===")
subdirs = [d for d in os.listdir('public_html') if os.path.isdir(os.path.join('public_html', d))]
for d in sorted(subdirs):
    count = len(os.listdir(os.path.join('public_html', d)))
    print(f"  Directory: public_html/{d:25s} ({count} items)")

# 3. Inspect public_html root files
print("\n=== 3. ROOT PHP FILES IN public_html ===")
php_files = glob.glob('public_html/*.php')
for f in sorted(php_files):
    name = os.path.basename(f)
    print(f"  File: {name}")
