import re

with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make the mobile view button layout a stacked column instead of grid
css = re.sub(
    r'\.cart-footer-actions\s*\{\s*width:\s*100%;\s*gap:\s*0\.25rem;\s*order:\s*1;\s*display:\s*grid;\s*grid-template-columns:\s*1fr\s*1\.5fr\s*2fr;\s*\}',
    r'.cart-footer-actions {\n        width: 100%;\n        gap: 0.5rem;\n        order: 1;\n        display: flex;\n        flex-direction: column;\n    }',
    css
)

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Fixed CSS mobile view')
