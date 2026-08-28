import json, os, glob

# Check pages_registry.json
with open('src/data/pages_registry.json', 'r', encoding='utf-8') as f:
    pr = json.load(f)

print(f"Total entries in pages_registry.json: {len(pr)}")
if 'pelatihan-k3-surabaya' in pr:
    print("Found 'pelatihan-k3-surabaya' in pages_registry.json:")
    print(json.dumps(pr['pelatihan-k3-surabaya'], indent=2))

# Search in public_html for any files matching surabaya
php_files = glob.glob('public_html/**/*.php', recursive=True)
matching_php = [f for f in php_files if 'surabaya' in f.lower()]
print(f"PHP files with surabaya in filename: {matching_php}")

# Search in public_html/.htaccess or routing
if os.path.exists('public_html/.htaccess'):
    with open('public_html/.htaccess', 'r', encoding='utf-8', errors='ignore') as f:
        ht = f.read()
        if 'surabaya' in ht.lower():
            print("Found surabaya in .htaccess")
        else:
            print("surabaya not mentioned in .htaccess")
