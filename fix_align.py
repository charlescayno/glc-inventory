import re

with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We need to make the outer container .cart-modal-footer align items to the top or stretch, not center.
# Actually, when flex items wrap, align-items: center will center them on the cross axis, which pushes single items down.
# Let's change .cart-modal-footer's align-items to flex-start.
css = css.replace(
    'align-items: center;\n    flex-wrap: wrap;',
    'align-items: flex-start;\n    flex-wrap: wrap;'
)

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Fixed align')
