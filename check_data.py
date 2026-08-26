import re
with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

match = re.search(r'const initialData = (\[.*?\]);', code, re.DOTALL)
if match:
    data_str = match.group(1)
    print("Found initial data block.")
    print("Starts with: ", data_str[:100])
    print("Ends with: ", data_str[-100:])
