import re
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_html = """
        // No external images to prevent broken icons
        tr.innerHTML = `
            <td data-label="Description">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <button class="lock-toggle-btn" data-id="${item.id}" title="Toggle Lock">
                        <i class="${lockIcon}" style="color: ${lockColor};"></i>
                    </button>
                    <i class="${iconClass}" style="color: var(--color-primary); margin-right: 0.5rem; font-size: 1.25rem;"></i>
                    <span class="desc-text" style="line-height: 1.2;">
"""
js = re.sub(r'// Auto-assign images for GLC Books if missing.*?<span class="desc-text" style="line-height: 1\.2;">\s*', new_html, js, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Removed external images!")
