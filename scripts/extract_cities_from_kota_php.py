import re, json

with open('public_html/kota.php', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all city keys in $cities array
cities_block = re.search(r'\$cities\s*=\s*\[(.*?)\];\s*// Helper functions', content, re.DOTALL)
if not cities_block:
    cities_block = re.search(r'\$cities\s*=\s*\[(.*?)\];\s*function', content, re.DOTALL)
if not cities_block:
    cities_block = re.search(r'\$cities\s*=\s*\[(.*?)\];', content, re.DOTALL)

if cities_block:
    cities_text = cities_block.group(1)
    keys = re.findall(r"['\"]([a-zA-Z0-9_-]+)['\"]\s*=>\s*\[", cities_text)
    print(f"Found {len(keys)} cities defined in kota.php:")
    print(keys)
else:
    print("Could not isolate cities block")
