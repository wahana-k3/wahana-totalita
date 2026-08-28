import os, json

uploads = set(os.listdir('public/assets/uploads'))
print(f"Total uploaded files in public/assets/uploads: {len(uploads)}")

with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

for t in trainings:
    img = t.get('image_path')
    if img:
        filename = os.path.basename(img)
        if filename not in uploads:
            print(f"Removing invalid image_path for ID {t['id']} ({t['name']}): {img}")
            t['image_path'] = None

with open('src/data/trainings.json', 'w', encoding='utf-8') as f:
    json.dump(trainings, f, indent=2, ensure_ascii=False)

print("Updated trainings.json successfully!")
