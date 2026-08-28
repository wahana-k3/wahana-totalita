import json

with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

popular_ids = [74, 82, 126, 34, 137, 25] # AK3U Kemnaker, Damkar, TKBT, P3K, Forklift, Pengawas Fasyankes
for t in trainings:
    if t.get('id') in popular_ids or 'ahli-k3-umum' in t.get('slug', ''):
        print(f"ID {t.get('id')}: {t.get('name')} | image: {t.get('image_path')}")
