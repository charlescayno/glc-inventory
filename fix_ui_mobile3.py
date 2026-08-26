import re

with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace(
    '.cart-footer-actions {\n        width: 100%;\n        gap: 0.5rem;\n        order: 1;\n        display: flex;\n        flex-direction: column;\n    }',
    '.cart-footer-actions {\n        width: 100%;\n        gap: 0.5rem;\n        order: 1;\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: center;\n    }\n    .cart-footer-actions .btn {\n        flex: 1;\n        min-width: calc(50% - 0.25rem);\n    }'
)

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Fixed CSS flex-wrap')
