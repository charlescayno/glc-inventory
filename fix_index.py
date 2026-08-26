import re
with open('index.html', 'r', encoding='utf-8') as f:
    code = f.read()

fix = r'''<select id="checkoutLocationSelect" style="padding: 0.35rem 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-bg-surface); color: var(--color-text-main); font-weight: 600; font-family: inherit; font-size: 0.85rem; outline: none;">
                              <option value="booth">GLC Booth</option>
                          </select>'''

code = re.sub(r'<select id="checkoutLocationSelect".*?</select>', fix, code, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(code)
