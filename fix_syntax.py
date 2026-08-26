with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("getElementById(\\'cartModal\\')", "getElementById('cartModal')")
content = content.replace("addEventListener(\\'click\\', checkoutCartDeduct)", "addEventListener('click', checkoutCartDeduct)")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
