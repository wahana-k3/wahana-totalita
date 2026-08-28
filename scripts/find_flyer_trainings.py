import os, json

with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

with_flyers = [t for t in trainings if t.get('image_path') and os.path.exists(os.path.join('public', t['image_path'].lstrip('/')))]
print(f"Total trainings with existing flyer files: {len(with_flyers)}")

for t in with_flyers[:15]:
    print(f"ID {t['id']}: {t['name']} | flyer: {t['image_path']}")
