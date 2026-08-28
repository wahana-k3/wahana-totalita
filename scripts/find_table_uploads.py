import re

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Split into table insert blocks
blocks = re.findall(r'INSERT INTO `(\w+)`.*?;', sql, re.DOTALL)
print(f"Total INSERT blocks: {len(blocks)}")

# Let's find which table has [0-9a-f]{16}\.png
lines = sql.split('\n')
current_table = None
table_matches = {}

for line in lines:
    m_table = re.search(r'INSERT INTO `(\w+)`', line)
    if m_table:
        current_table = m_table.group(1)
    
    pngs = re.findall(r'([0-9a-f]{16}\.png)', line)
    if pngs:
        table_matches[current_table] = table_matches.get(current_table, 0) + len(pngs)

print("Tables containing the upload PNG hashes:")
for t, count in table_matches.items():
    print(f"  Table `{t}`: {count} image references")
