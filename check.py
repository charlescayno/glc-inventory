with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = re.search(r'// Auto-assign images.*?</td', js, re.DOTALL)
if matches:
    print(matches.group(0))
