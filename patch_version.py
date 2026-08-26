import re

def process(filename, encoding):
    with open(filename, 'r', encoding=encoding) as f:
        content = f.read()
    content = re.sub(r'Resource Inventory( v\d+)?', 'Resource Inventory v3', content, count=1)
    with open(filename, 'w', encoding=encoding) as f:
        f.write(content)

process('index.html', 'utf-8')
process('index_firebase.html', 'utf-16')

with open('sw.js', 'r', encoding='utf-8') as f:
    sw = f.read()
sw = re.sub(r'glc-inventory-v2', 'glc-inventory-v4', sw)
with open('sw.js', 'w', encoding='utf-8') as f:
    f.write(sw)
