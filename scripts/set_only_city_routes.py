import urllib.request
import xml.etree.ElementTree as ET
from urllib.parse import urlparse
import json

# Fetch sitemap from origen
url = 'https://origen.wahanatotalita.com/sitemap-kota-pelatihan.xml'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as res:
    xml_data = res.read()

root = ET.fromstring(xml_data)
routes = {}

for elem in root.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
    full_url = elem.text.strip()
    path = urlparse(full_url).path
    if not path.endswith('/'):
        path += '/'
    routes[path] = 'vercel'

print(f"Total city routes extracted: {len(routes)}")

page_routes = {
    "routes": routes,
    "default": "hostinger"
}

# Write to root page-routes.json
with open('page-routes.json', 'w', encoding='utf-8') as f:
    json.dump(page_routes, f, indent=2)

# Also write to src/data/page_routes.json for edge bundle
with open('src/data/page_routes.json', 'w', encoding='utf-8') as f:
    json.dump(page_routes, f, indent=2)

print("page-routes.json successfully written with ONLY the 374 city routes!")
