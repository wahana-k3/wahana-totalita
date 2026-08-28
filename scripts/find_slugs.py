import json

with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

for t in trainings:
    slug = t.get('slug', '')
    if 'ahli-k3' in slug or 'ak3u' in slug or 'k3-umum' in slug:
        print(f"ID {t.get('id')}: {slug} | Name: {t.get('name')}")
