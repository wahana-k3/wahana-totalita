import urllib.request
import xml.etree.ElementTree as ET
import json
from urllib.parse import urlparse

url = 'https://origen.wahanatotalita.com/sitemap-kota-pelatihan.xml'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as res:
    xml_data = res.read().decode('utf-8')

root = ET.fromstring(xml_data)
routes = {}

for loc in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
    raw_url = loc.text.strip()
    parsed = urlparse(raw_url)
    path = parsed.path
    if not path.endswith('/'):
        path += '/'
    routes[path] = "vercel"

print(f"Total city page routes extracted: {len(routes)}")

page_routes_data = {
    "routes": routes,
    "default": "hostinger"
}

with open('page-routes.json', 'w', encoding='utf-8') as f:
    json.dump(page_routes_data, f, indent=2)

print("Created page-routes.json successfully!")
