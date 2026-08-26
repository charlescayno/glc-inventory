import re

with open('app_firebase.js', 'r', encoding='utf-16') as f:
    js = f.read()

match = re.search(r'<td data-label="Description">.*?(<td class="col-price)', js, re.DOTALL)
if match:
    with open('dump_firebase_td.txt', 'w', encoding='utf-8') as out:
        out.write(match.group(0))
else:
    print("Not found")
