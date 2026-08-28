import re

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Print CREATE TABLE `trainings`
create_m = re.search(r'CREATE TABLE\s+`trainings`\s*\((.*?)\)\s*ENGINE', sql, re.DOTALL | re.IGNORECASE)
if create_m:
    print("CREATE TABLE `trainings`:")
    print(create_m.group(1))

# Print first 2 INSERT INTO `trainings` lines
insert_lines = [l for l in sql.split('\n') if 'INSERT INTO `trainings`' in l]
print(f"\nFound {len(insert_lines)} lines with INSERT INTO `trainings`")
for l in insert_lines[:2]:
    print(l[:300])
