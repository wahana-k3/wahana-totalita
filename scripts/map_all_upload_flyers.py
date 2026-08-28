import re, os, json, shutil

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Find all blocks of INSERT INTO `trainings`
# We can find where `INSERT INTO `trainings`` starts and where the closing `;` is
matches = [m.start() for m in re.finditer(r'INSERT INTO `trainings`', sql)]
print(f"Found {len(matches)} INSERT INTO `trainings` occurrences")

all_tuples = []
for start_idx in matches:
    # find ending semicolon
    # scan character by character
    in_quote = False
    escape = False
    end_idx = -1
    for i in range(start_idx, len(sql)):
        c = sql[i]
        if escape:
            escape = False
            continue
        if c == '\\':
            escape = True
            continue
        if c == "'":
            in_quote = not in_quote
            continue
        if c == ';' and not in_quote:
            end_idx = i
            break
    
    if end_idx != -1:
        block = sql[start_idx:end_idx]
        val_start = block.find('VALUES')
        if val_start != -1:
            all_tuples.append(block[val_start+6:])

print(f"Extracted {len(all_tuples)} insert value sections")

# Parse individual courses
courses_map = {}
for val_str in all_tuples:
    # Look for patterns like: (id, cat_id, 'name', 'slug', ... 'image_path' ...)
    # Let's find each upload hash in the string and its slug!
    for m in re.finditer(r"\(([0-9]+),\s*([0-9]+),\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)'", val_str):
        # find the end of this tuple
        t_start = m.start()
        in_quote = False
        escape = False
        t_end = -1
        for j in range(t_start + 1, len(val_str)):
            c = val_str[j]
            if escape:
                escape = False
                continue
            if c == '\\':
                escape = True
                continue
            if c == "'":
                in_quote = not in_quote
                continue
            if c == ')' and not in_quote:
                t_end = j
                break
        
        if t_end != -1:
            t_content = val_str[t_start+1:t_end]
            slug = m.group(4)
            # check if there is assets/uploads/[hash].png in t_content
            img_m = re.search(r'assets/uploads/([0-9a-f]{16}\.png)', t_content)
            if img_m:
                courses_map[slug] = f"/assets/uploads/{img_m.group(1)}"

print(f"Total courses mapped with their uploaded edited flyer: {len(courses_map)}")
for s, img in list(courses_map.items())[:10]:
    print(f"  {s:45s} -> {img}")

# Let's copy public_html/assets/uploads to public/assets/uploads
src_uploads = 'public_html/assets/uploads'
dst_uploads = 'public/assets/uploads'
if os.path.exists(src_uploads):
    os.makedirs(dst_uploads, exist_ok=True)
    for f in os.listdir(src_uploads):
        if f.endswith('.png'):
            shutil.copy2(os.path.join(src_uploads, f), os.path.join(dst_uploads, f))
    print(f"Copied {len(os.listdir(dst_uploads))} upload banner PNG files to {dst_uploads}")

# Let's update trainings.json with these exact uploaded image paths!
with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

updated_count = 0
for t in trainings:
    slug = t['slug']
    if slug in courses_map:
        t['image_path'] = courses_map[slug]
        updated_count += 1

print(f"Updated {updated_count} courses in src/data/trainings.json with exact edited flyer banners!")

with open('src/data/trainings.json', 'w', encoding='utf-8') as f:
    json.dump(trainings, f, indent=2, ensure_ascii=False)
