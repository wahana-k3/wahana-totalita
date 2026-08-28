import json, re

with open('src/data/service_pages.json', 'r', encoding='utf-8') as f:
    sp = json.load(f)

for k, v in sp.items():
    html = v.get('html', '')
    if '<svg' in html:
        print(f"Page '{k}' has <svg> tag!")
        svgs = re.findall(r'<svg[^>]*>.*?</svg>', html, re.DOTALL)
        for s in svgs[:3]:
            print("  SVG snippet:", s[:150])
