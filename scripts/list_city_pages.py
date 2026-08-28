import json

with open('src/data/pages_registry.json', 'r', encoding='utf-8') as f:
    pr = json.load(f)

city_pages = [v for k, v in pr.items() if v.get('type') == 'city']
service_pages = [v for k, v in pr.items() if v.get('type') != 'city']

print(f"Total city doorway pages in pages_registry.json: {len(city_pages)}")
for c in city_pages:
    print(f"  Slug: /{c['slug']} -> {c['title']} ({c.get('city_name')}, {c.get('province')})")

print(f"\nTotal other pages in pages_registry.json: {len(service_pages)}")
