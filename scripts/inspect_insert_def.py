import os
import re

base_dir = r"c:\Users\ASUS\Pictures\pena_platform"
db_path = os.path.join(base_dir, "u566907099_wahana_db.sql")

with open(db_path, "r", encoding="utf-8", errors="ignore") as f:
    sql = f.read()

for tbl in ["trainings", "articles"]:
    pattern = re.compile(rf'INSERT\s+INTO\s+`?{tbl}`?\s*(\([^)]+\))?\s*VALUES', re.IGNORECASE)
    match = pattern.search(sql)
    if match:
        print(f"Table `{tbl}` match:", match.group(0))
        if match.group(1):
            print(f"Columns for `{tbl}`:", match.group(1))
        else:
            print(f"No explicit columns for `{tbl}`")
    else:
        print(f"No INSERT INTO found for `{tbl}`")
