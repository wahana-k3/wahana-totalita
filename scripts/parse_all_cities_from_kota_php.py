import re, json

with open('public_html/kota.php', 'r', encoding='utf-8') as f:
    php_code = f.read()

# Let's write a python script to parse the $cities array from kota.php
# We can use php command line or regex parser
# Let's use php cli if available or regex
