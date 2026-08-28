import json, re

with open('src/data/service_pages.json', 'r', encoding='utf-8') as f:
    sp = json.load(f)

for k, v in sp.items():
    html = v.get('html', '')
    if '<svg' in html:
        # If svg has no width, add width="18" height="18"
        def fix_svg(match):
            tag = match.group(0)
            if 'width=' not in tag and 'height=' not in tag:
                return tag.replace('<svg', '<svg width="18" height="18" class="inline-block shrink-0 align-middle text-emerald-600"')
            return tag
        
        new_html = re.sub(r'<svg[^>]*>', fix_svg, html)
        v['html'] = new_html

with open('src/data/service_pages.json', 'w', encoding='utf-8') as f:
    json.dump(sp, f, indent=2, ensure_ascii=False)

print("Fixed all unconstrained SVGs in service_pages.json successfully!")
