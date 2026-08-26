with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = re.search(r'// Auto-assign images.*?</td', js, re.DOTALL)
if matches:
    old_html = matches.group(0)
    new_html = old_html.replace('</td', '</div></td>')
    js = js.replace(old_html, new_html)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Fixed closing div tag")
