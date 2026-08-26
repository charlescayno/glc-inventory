import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

bad_pattern = r'''<td data-label="Description">\s*<div style="display: flex; align-items: center; gap: 0\.75rem;">\s*<button class="lock-toggle-btn"[^>]*>\s*<i class="\$\{lockIcon\}"[^>]*></i>\s*</button>\s*<i class="\$\{iconClass\}"[^>]*></i>\s*<span class="desc-text" style="line-height: 1\.2;">\s*<button class="lock-toggle-btn"[^>]*>\s*<i class="\$\{lockIcon\}"[^>]*></i>\s*</button>\s*<i class="\$\{iconClass\}"[^>]*></i>\$\{item\.desc\}\s*\$\{badgeHtml\}\s*</span>\s*</div></td>>\s*<td class="col-price hidden-column" data-label="Price">'''

good_replacement = '''<td data-label="Description">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <button class="lock-toggle-btn" data-id="${item.id}" title="Toggle Lock">
                        <i class="${lockIcon}" style="color: ${lockColor};"></i>
                    </button>
                    <i class="${iconClass}" style="color: var(--color-primary); font-size: 1.25rem;"></i>
                    <span class="desc-text" style="line-height: 1.2; display: flex; flex-direction: column; gap: 0.25rem;">
                        <span>${item.desc}</span>
                        ${badgeHtml}
                    </span>
                </div>
            </td>
            <td class="col-price hidden-column" data-label="Price">'''

new_js, count = re.subn(bad_pattern, good_replacement, js, flags=re.DOTALL)
print(f"Replaced {count} occurrences")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_js)
