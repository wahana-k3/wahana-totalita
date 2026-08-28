import os, json

with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

missing = []
valid = []

for t in trainings:
    img = t.get('image_path')
    if img:
        rel = img.lstrip('/')
        if not os.path.exists(os.path.join('public', rel)):
            missing.append((t['id'], t['name'], img))
        else:
            valid.append((t['id'], t['name'], img))

print(f"Total trainings with image_path: {len(trainings)}")
print(f"Valid image files on disk: {len(valid)}")
print(f"Missing image files: {len(missing)}")
for m in missing[:15]:
    print("  MISSING:", m)
