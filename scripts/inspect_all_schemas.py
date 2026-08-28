import re

with open('u566907099_wahana_db.sql', 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

tables = re.findall(r'CREATE TABLE\s+[`"]?(\w+)[`"]?\s*\((.*?)\)\s*ENGINE', sql, re.DOTALL | re.IGNORECASE)
for table_name, schema in tables:
    print(f"=== Table: {table_name} ===")
    cols = [line.strip() for line in schema.strip().split('\n') if line.strip() and not line.strip().startswith(('KEY', 'PRIMARY', 'UNIQUE', 'CONSTRAINT'))]
    for c in cols[:15]:
        print("  ", c)
