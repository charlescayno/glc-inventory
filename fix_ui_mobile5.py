import re

with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make the outer container `.cart-modal-footer` flex-wrap wrap on desktop view instead of justify-content: space-between (or adjust it)
css = css.replace(
    '.cart-modal-footer {\n    padding: 1rem 1.25rem 1.25rem;\n    border-top: 1px solid var(--color-border);\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 0.75rem;\n    background-color: var(--color-bg-surface);\n}',
    '.cart-modal-footer {\n    padding: 1rem 1.25rem 1.25rem;\n    border-top: 1px solid var(--color-border);\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 0.75rem;\n    background-color: var(--color-bg-surface);\n}'
)

# And let's make .cart-footer-actions also wrap on desktop view just in case
css = css.replace(
    '.cart-footer-actions {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex: 1;\n    justify-content: flex-end;\n}',
    '.cart-footer-actions {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex: 1;\n    justify-content: flex-end;\n    flex-wrap: wrap;\n}'
)

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Fixed CSS again')
