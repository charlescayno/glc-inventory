with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
matches = re.search(r'<div id="receiptModal".*?</button>\s*</div>\s*</div>\s*</div>', html, re.DOTALL)
if matches:
    print(matches.group(0))
