import re
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

matches = re.search(r'function renderHistoryModal\(\) \{.*?\}\s*\}', js, re.DOTALL)
if matches:
    with open('dump.txt', 'w', encoding='utf-8') as f2:
        f2.write(matches.group(0))
