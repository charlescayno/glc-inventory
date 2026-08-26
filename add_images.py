import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Modify renderTable to output the image
tr_html_old = """        tr.innerHTML = `
            <td data-label="Description">
                <span class="desc-text">
                    <button class="lock-toggle-btn" data-id="${item.id}" title="Toggle Lock">
                        <i class="${lockIcon}" style="color: ${lockColor};"></i>
                    </button>
                    <i class="${iconClass}" style="color: var(--color-primary); margin-right: 0.5rem; vertical-align: middle;"></i>
                    ${item.desc}
                </span>
            </td>"""

tr_html_new = """
        // Auto-assign images for GLC Books if missing
        let imgUrl = item.image;
        if (!imgUrl) {
            if (item.desc.includes('Book 1:')) imgUrl = 'https://glc.ccf.org.ph/wp-content/uploads/2020/2026/Book-1.png';
            else if (item.desc.includes('Book 2:')) imgUrl = 'https://glc.ccf.org.ph/wp-content/uploads/2020/2026/Book-2.png';
            else if (item.desc.includes('Book 3:')) imgUrl = 'https://glc.ccf.org.ph/wp-content/uploads/2020/2026/Book-3.png';
            else if (item.desc.includes('Book 4:')) imgUrl = 'https://glc.ccf.org.ph/wp-content/uploads/2020/2026/BOOK4.png';
            else if (item.desc.toLowerCase().includes('real talk')) imgUrl = 'https://glc.ccf.org.ph/wp-content/uploads/2020/09/REALTALK-SUB-COVER.jpg';
            else if (item.category.includes('GLC') || item.category.includes('Book')) imgUrl = 'https://glc.ccf.org.ph/wp-content/uploads/2020/10/GLC-books.jpg';
            else imgUrl = 'https://glc.ccf.org.ph/wp-content/uploads/2020/08/GLC-LOGO-01-1-150x150.png'; // Fallback generic logo
        }

        tr.innerHTML = `
            <td data-label="Description">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <button class="lock-toggle-btn" data-id="${item.id}" title="Toggle Lock" style="margin-right: -0.25rem;">
                        <i class="${lockIcon}" style="color: ${lockColor};"></i>
                    </button>
                    <img src="${imgUrl}" alt="Cover" style="width: 32px; height: 42px; object-fit: cover; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); flex-shrink: 0; background: #fff;" onerror="this.src='https://glc.ccf.org.ph/wp-content/uploads/2020/08/GLC-LOGO-01-1-150x150.png'" />
                    <span class="desc-text" style="line-height: 1.2;">
                        ${item.desc}
                    </span>
                </div>
            </td>"""

if 'alt="Cover"' not in js:
    js = js.replace(tr_html_old, tr_html_new)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Added images to renderTable!")
else:
    print("Images already added.")
