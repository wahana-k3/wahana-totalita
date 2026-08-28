import json

with open('src/data/trainings.json', 'r', encoding='utf-8') as f:
    trainings = json.load(f)

for i, t in enumerate(trainings[:12]):
    print(f"{i}: ID {t.get('id')} | Name: {t.get('name')} | image_path: {t.get('image_path')}")
