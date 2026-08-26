with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
# The backtick for tr.innerHTML is placed BEFORE the javascript variables!
# Let's fix it by pulling the template literal backtick down where it belongs.

js = re.sub(r'tr\.innerHTML = `\s*// Auto-assign images for GLC Books if missing', r'// Auto-assign images for GLC Books if missing', js)
js = re.sub(r'}\s*<td data-label="Description">', r'}\n\n        tr.innerHTML = `\n            <td data-label="Description">', js)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Fixed app.js backticks!")
