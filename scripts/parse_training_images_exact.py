import re, os, json

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Parse all trainings with image_path
# INSERT INTO `trainings` (`id`, `category_id`, `name`, `slug`, `mode`, `certification`, `price`, `price_label`, `description`, `long_content`, `curriculum`, `duration_days`, `image_path`, ...)

# Let's find all (id, ... image_path) by splitting SQL statements
insert_lines = [l for l in sql.split('\n') if l.startswith('INSERT INTO `trainings`')]
print(f"Found {len(insert_lines)} INSERT statements for trainings")

# Let's parse each insert values
courses = []
for line in insert_lines:
    # Extract VALUES (...)
    val_str = line[line.find('VALUES') + 6:].strip().rstrip(';')
    
    # We can parse tuple-by-tuple
    # Simple state machine to parse SQL tuples
    pos = 0
    while pos < len(val_str):
        start = val_str.find('(', pos)
        if start == -1:
            break
        
        # find matching closing paren not inside single quotes
        in_quote = False
        escape = False
        end = -1
        for i in range(start + 1, len(val_str)):
            c = val_str[i]
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
                end = i
                break
        
        if end == -1:
            break
        
        tuple_content = val_str[start+1:end]
        pos = end + 1
        
        # Split tuple by comma ignoring quotes
        fields = []
        cur_field = []
        in_quote = False
        escape = False
        for c in tuple_content:
            if escape:
                cur_field.append(c)
                escape = False
                continue
            if c == '\\':
                escape = True
                cur_field.append(c)
                continue
            if c == "'":
                in_quote = not in_quote
                continue
            if c == ',' and not in_quote:
                fields.append(''.join(cur_field).strip())
                cur_field = []
                continue
            cur_field.append(c)
        fields.append(''.join(cur_field).strip())
        
        if len(fields) >= 13:
            cid = fields[0]
            name = fields[2].strip("'")
            slug = fields[3].strip("'")
            image_path = fields[12].strip("'")
            courses.append({
                'id': int(cid),
                'name': name,
                'slug': slug,
                'image_path': image_path if image_path != 'NULL' else None
            })

print(f"Successfully parsed {len(courses)} courses.")
with_img = [c for c in courses if c['image_path']]
print(f"Courses WITH custom image_path: {len(with_img)}")
for c in with_img[:10]:
    print(f"  {c['slug']:45s} -> {c['image_path']}")
