import re
for filename in ['index.html', 'index_firebase.html']:
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    html = re.sub(r'Resource Inventory', 'Resource Inventory v3', html, count=1)
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

with open('sw.js', 'r', encoding='utf-8') as f:
    sw = f.read()
sw = re.sub(r'glc-inventory-v2', 'glc-inventory-v3', sw)
with open('sw.js', 'w', encoding='utf-8') as f:
    f.write(sw)
