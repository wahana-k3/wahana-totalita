import re, os, json, shutil

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Match tuples that contain the upload hash
# Example: (id, cat_id, 'name', 'slug', 'mode', 'certification', price, 'price_label', 'description', 'long_content', 'curriculum', duration_days, 'hash.png', ...)

# Let's find all hash positions and extract the slug before it
matches = re.findall(r"\(([0-9]+),\s*([0-9]+),\s*'((?:[^'\\]|\\.)*)',\s*'([a-z0-9-]+)'.*?,\s*([0-9]+),\s*'([0-9a-f]{16}\.png)'", sql, re.DOTALL)
print(f"Matched {len(matches)} courses with hash directly")

# Alternatively, search backwards from each hash to find the nearest slug
hash_matches = list(re.finditer(r"'([0-9a-f]{16}\.png)'", sql))
print(f"Total hash matches: {len(hash_matches)}")

course_images = {}
for m in hash_matches:
    pos = m.start()
    # search backwards 3000 chars for the slug
    pre = sql[max(0, pos-4000):pos]
    # find INSERT pattern: (id, cat_id, 'name', 'slug'
    slug_m = re.findall(r"\(([0-9]+),\s*([0-9]+),\s*'((?:[^'\\]|\\.)*)',\s*'([a-z0-9-]+)'", pre)
    if slug_m:
        last_course = slug_m[-1]
        cid = last_course[0]
        name = last_course[2].replace("\\'", "'")
        slug = last_course[3]
        img_name = m.group(1)
        course_images[slug] = f"/assets/uploads/{img_name}"

print(f"Mapped {len(course_images)} courses to their exact upload flyer image:")
for slug, img in list(course_images.items())[:15]:
    print(f"  {slug:50s} -> {img}")

# Copy all uploads to public/assets/uploads/
src_uploads = 'public_html/assets/uploads'
dst_uploads = 'public/assets/uploads'
if os.path.exists(src_uploads):
    os.makedirs(dst_uploads, exist_ok=True)
    for f in os.listdir(src_uploads):
        if f.endswith('.png'):
            shutil.copy2(os.path.join(src_uploads, f), os.path.join(dst_uploads, f))
    print(f"Copied {len(os.listdir(dst_uploads))} PNG files to {dst_uploads}")

# Update src/data/trainings.json
with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

updated = 0
for t in trainings:
    slug = t['slug']
    if slug in course_images:
        t['image_path'] = course_images[slug]
        updated += 1

print(f"Updated {updated} / {len(trainings)} courses in src/data/trainings.json with exact edited flyer banner images!")

with open('src/data/trainings.json', 'w', encoding='utf-8') as f:
    json.dump(trainings, f, indent=2, ensure_ascii=False)
