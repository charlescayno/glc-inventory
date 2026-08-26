import re

with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We need to make the outer container .cart-modal-footer align items to the top or stretch, not center.
css = css.replace(
    '.cart-modal-footer {\n    padding: 1rem 1.25rem 1.25rem;\n    border-top: 1px solid var(--color-border);\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 0.75rem;\n    background-color: var(--color-bg-surface);\n}',
    '.cart-modal-footer {\n    padding: 1rem 1.25rem 1.25rem;\n    border-top: 1px solid var(--color-border);\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    flex-wrap: wrap;\n    gap: 0.75rem;\n    background-color: var(--color-bg-surface);\n}'
)

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Fixed align exactly')
