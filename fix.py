import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

replacement = '<span style="padding: 0.35rem 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-bg-surface); color: var(--color-text-main); font-weight: 600; font-family: inherit; font-size: 0.85rem;">GLC Booth</span>'

html = re.sub(r'<select id="checkoutLocationSelect".*?</select>', replacement, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
