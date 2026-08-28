import re, os, json

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Let's inspect the `trainings` table schema and rows
trainings_match = re.search(r'INSERT INTO `trainings`.*?;', sql, re.DOTALL)
if trainings_match:
    block = trainings_match.group(0)
    print(f"Trainings block length: {len(block)} chars")
    
    # Check for image references
    images = re.findall(r'[0-9a-f]{16}\.png', block)
    print(f"Total upload image references in trainings block: {len(images)}")
    
    # Check files in public_html/assets/uploads/
    upload_dir = 'public_html/assets/uploads'
    existing = set(os.listdir(upload_dir)) if os.path.exists(upload_dir) else set()
    found = [img for img in images if img in existing]
    print(f"Found {len(found)} / {len(images)} existing on disk in {upload_dir}")

