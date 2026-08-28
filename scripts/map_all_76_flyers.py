import re, os, json, shutil

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Match all courses that have the upload hash
# Example row pattern in trainings:
# (id, cat_id, 'Name', 'slug', 'mode', 'cert', price, 'label', 'desc', 'long', 'curr', days, 'hash.png'
pattern = r"\(([0-9]+),\s*([0-9]+),\s*'((?:[^'\\]|\\.)*)',\s*'([a-z0-9-]+)'(?:(?!INSERT INTO).)*?,\s*([0-9]+),\s*'([0-9a-f]{16}\.png)'"

matches = re.findall(pattern, sql, re.DOTALL)
print(f"Total matched course flyer rows: {len(matches)}")

course_images = {}
for m in matches:
    cid = m[0]
    name = m[2].replace("\\'", "'")
    slug = m[3]
    days = m[4]
    img_name = m[5]
    course_images[slug] = f"/assets/uploads/{img_name}"
    print(f"  [{cid}] {slug:50s} -> /assets/uploads/{img_name}")

# Also check for any additional courses with images
# Update src/data/trainings.json
with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

updated = 0
for t in trainings:
    slug = t['slug']
    if slug in course_images:
        t['image_path'] = course_images[slug]
        updated += 1

print(f"\nSuccessfully updated {updated} / {len(trainings)} courses in src/data/trainings.json with exact edited flyer banners!")

with open('src/data/trainings.json', 'w', encoding='utf-8') as f:
    json.dump(trainings, f, indent=2, ensure_ascii=False)
