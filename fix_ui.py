import re

with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '--color-warning' not in css:
    css = css.replace('--color-danger: #ef4444;', '--color-danger: #ef4444;\n    --color-warning: #f59e0b;\n    --color-success: #10b981;')

# Replace grid-template-columns: 1fr 2fr; with grid-template-columns: 1fr 1fr 2fr; in cart-footer-actions
# Wait, "1fr 1.5fr 2fr" is better for "Close", "Complimentary", "Finalize & Deduct"
# Or maybe I should check what is exactly there first.
css = re.sub(
    r'grid-template-columns:\s*1fr\s*2fr;',
    r'grid-template-columns: 1fr 1.5fr 2fr;',
    css
)

# In case it is on desktop as well and overflowing, maybe reduce gap?
# Let's adjust padding of buttons in mobile footer.
css = css.replace(
    '.cart-footer-actions {\n        width: 100%;',
    '.cart-footer-actions {\n        width: 100%;\n        gap: 0.25rem;'
)

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Fixed CSS')
