with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re

js = js.replace('https://glc.ccf.org.ph/wp-content/uploads/2020/2026/Book-1.png', 'https://glc.ccf.org.ph/wp-content/uploads/2020/07/GLC-logo.png')
js = js.replace('https://glc.ccf.org.ph/wp-content/uploads/2020/2026/Book-2.png', 'https://glc.ccf.org.ph/wp-content/uploads/2020/07/GLC-logo.png')
js = js.replace('https://glc.ccf.org.ph/wp-content/uploads/2020/2026/Book-3.png', 'https://glc.ccf.org.ph/wp-content/uploads/2020/07/GLC-logo.png')
js = js.replace('https://glc.ccf.org.ph/wp-content/uploads/2020/2026/BOOK4.png', 'https://glc.ccf.org.ph/wp-content/uploads/2020/07/GLC-logo.png')
js = js.replace('https://glc.ccf.org.ph/wp-content/uploads/2020/08/GLC-LOGO-01-1-150x150.png', 'https://glc.ccf.org.ph/wp-content/uploads/2020/07/GLC-logo.png')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Fixed image URLs!")
