with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
matches = re.finditer(r'<div[^>]*id="[^"]*modal[^"]*"[^>]*>', html, re.IGNORECASE)
for m in matches:
    print(m.group(0))

print("----")
matches2 = re.finditer(r'id="edit[^"]*"', html, re.IGNORECASE)
for m in matches2:
    print(m.group(0))
