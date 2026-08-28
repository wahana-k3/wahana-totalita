import re, os, json

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Match each row in trainings table
# INSERT INTO `trainings` (`id`, `category_id`, `name`, `slug`, `mode`, `certification`, `price`, `price_label`, `description`, `curriculum`, `requirements`, `facilities`, `long_content`, `created_at`, `updated_at`, `status`, `duration_days`, `target_audience`, `faq`, `image_path`)

rows = re.findall(r"\(([0-9]+),\s*([0-9]+),\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*([0-9\.]+),\s*'([^']*)',\s*'([^']*)',\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*([0-9]+),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL)\)", sql)

print(f"Total parsed training rows: {len(rows)}")
for r in rows[:15]:
    course_id = r[0]
    name = r[2]
    slug = r[3]
    image_path = r[19] # last field
    print(f"ID {course_id:3s} | Slug: {slug:45s} | Image: {image_path}")
