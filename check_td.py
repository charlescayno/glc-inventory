import re
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

count = len(re.findall(r'<td data-label="Description">', js))
print(f"app.js has {count} matches")

with open('app_firebase.js', 'r', encoding='utf-16') as f2:
    js2 = f2.read()
    
count2 = len(re.findall(r'<td data-label="Description">', js2))
print(f"app_firebase.js has {count2} matches")
