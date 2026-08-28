import re

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Let's inspect the INSERT INTO `trainings` statement
match = re.search(r'INSERT INTO `trainings` \((.*?)\) VALUES', sql)
if match:
    cols = [c.strip(' `') for c in match.group(1).split(',')]
    print('trainings cols:', cols)

# Let's inspect where images are in public_html
import glob
print('Files in public_html/assets/img:')
for p in glob.glob('public_html/assets/img/*')[:25]:
    print(' ', p)

print('Files in public_html/assets/images:')
for p in glob.glob('public_html/assets/images/*')[:25]:
    print(' ', p)

print('Files in public_html/images:')
for p in glob.glob('public_html/images/*')[:25]:
    print(' ', p)
