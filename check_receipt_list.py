with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = re.search(r'function renderReceiptsList\(\).*?\n}', js, re.DOTALL)
if matches:
    print("Found renderReceiptsList:")
    print(matches.group(0)[:500])
