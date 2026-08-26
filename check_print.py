with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.search(r'@media print\s*\{.*?\}', css, re.DOTALL)
# Wait, this regex will stop at the first closing bracket.
# Need to match the whole block. Let's just print the end of the file.
print(css[-800:])
