import re

with open('app_firebase.js', 'r', encoding='utf-16') as f:
    js = f.read()

# 1. Fix HTML duplicate tags in Description cell
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

js, count = re.subn(bad_pattern, good_replacement, js, flags=re.DOTALL)
print(f"Fixed Description tags in app_firebase.js: {count} times")

with open('app_firebase.js', 'w', encoding='utf-16') as f:
    f.write(js)
