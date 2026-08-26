import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# remove checkoutLocationSelect event listener
js = re.sub(
    r"const checkoutLocationSelect = document\.getElementById\('checkoutLocationSelect'\);\s*if \(checkoutLocationSelect\) \{\s*checkoutLocationSelect\.addEventListener\('change', \(\) => \{\s*renderCartModal\(\);\s*\}\);\s*\}",
    "",
    js, flags=re.DOTALL
)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
