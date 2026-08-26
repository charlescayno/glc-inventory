import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()
    
with open('app_firebase.js', 'r', encoding='utf-8') as f:
    app_fb = f.read()

app_tr = re.search(r'tr\.innerHTML = `(.*?)`;', app_js, re.DOTALL).group(1)
fb_tr = re.search(r'tr\.innerHTML = `(.*?)`;', app_fb, re.DOTALL).group(1)

with open('app_tr.txt', 'w', encoding='utf-8') as f:
    f.write(app_tr)
with open('fb_tr.txt', 'w', encoding='utf-8') as f:
    f.write(fb_tr)
