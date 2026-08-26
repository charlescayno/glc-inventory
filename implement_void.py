import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix checkoutComplimentary bug
js = js.replace("itemsSummary.push(`x `);", "itemsSummary.push(`${qty}x ${item.desc}`);")

# Replace renderHistoryModal sale block
def sale_replacer(m):
    return """} else if (item.type === 'sale') {
            const saleItems = Array.isArray(item.items) ? item.items.join(', ') : (item.desc || '');
            
            const voidButtonHtml = item.isVoided
                ? `<span class="history-undone-badge"><i class="ri-forbid-line"></i> Voided</span>`
                : `<button class="btn btn-secondary btn-void-sale" data-history-id="${item.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; color: var(--color-danger); border-color: var(--color-danger);"><i class="ri-arrow-go-back-line"></i> Void</button>`;
            
            div.innerHTML = `
                <div class="history-icon-badge history-icon-sale">
                    <i class="ri-shopping-cart-2-line"></i>
                </div>
                <div class="history-content">
                    <div class="history-header">
                        <span class="history-title">${item.title || 'Booth Sale'}</span>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            ${voidButtonHtml}
                            <button class="btn btn-secondary print-past-receipt-btn" data-id="${item.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;"><i class="ri-printer-line"></i> Print</button>
                            <span class="history-time">${timeFormatted}</span>
                        </div>
                    </div>
                    <div class="history-route" style="margin-bottom: 0.35rem;">
                        <span class="history-qty-pill sale" style="${item.isVoided ? 'text-decoration: line-through; opacity: 0.5;' : ''}">₱ ${(item.totalAmount || 0).toLocaleString()}</span>
                        <span class="history-loc-badge dest"><i class="ri-store-2-line"></i> GLC Booth</span>
                    </div>
                    <div class="history-sale-items" style="${item.isVoided ? 'text-decoration: line-through; opacity: 0.5;' : ''}">${saleItems}</div>
                </div>
            `;
"""

js = re.sub(r'\}\s*else if\s*\(\s*item\.type\s*===\s*\'sale\'\s*\)\s*\{.*?(?=\}\s*else\s*\{)', sale_replacer, js, flags=re.DOTALL)

# Add event listener for btn-void-sale near the print button listener
void_listener = """
        // Bind Void Sale buttons
        div.querySelectorAll('.btn-void-sale').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const hid = parseFloat(e.currentTarget.getAttribute('data-history-id')) || e.currentTarget.getAttribute('data-history-id');
                voidSale(hid);
            });
        });
"""

js = js.replace('// Bind Print Receipt buttons', void_listener + '\n        // Bind Print Receipt buttons')

# Now inject the voidSale function definition
void_function = """
function voidSale(historyId) {
    const historyIndex = historyData.findIndex(h => h.id == historyId);
    if (historyIndex === -1) return;

    const rawEntry = historyData[historyIndex];
    const entry = parseHistoryEntry(rawEntry);
    if (entry.type !== 'sale' || entry.isVoided) return;

    if (!confirm("Are you sure you want to void this sale? This will refund the money and return the items to stock.")) {
        return;
    }

    // Determine location from title
    let locKey = 'booth';
    let titleStr = (entry.title || '').toUpperCase();
    if (titleStr.includes('5TH FLOOR')) locKey = 'floor5';
    else if (titleStr.includes('7TH FLOOR')) locKey = 'floor7';
    
    const locNames = { floor5: '5th Floor', floor7: '7th Floor', booth: 'GLC Booth' };

    // Parse items to return stock
    const items = entry.items || [];
    let itemsReturned = [];
    
    items.forEach(desc => {
        const qtyMatch = typeof desc === 'string' ? desc.match(/^(\\d+)x\\s+(.*)/) : null;
        let qty = 1;
        let itemDesc = desc;
        if (qtyMatch) {
            qty = parseInt(qtyMatch[1]);
            itemDesc = qtyMatch[2];
        }
        
        const itemIndex = inventoryData.findIndex(i => i.desc.toLowerCase() === itemDesc.toLowerCase());
        if (itemIndex !== -1) {
            inventoryData[itemIndex][locKey] = (inventoryData[itemIndex][locKey] || 0) + qty;
            itemsReturned.push(`${qty}x ${itemDesc}`);
        }
    });

    // Mark history entry as voided
    historyData[historyIndex].isVoided = true;

    // Log the void activity
    logActivity({
        type: 'adjust', // Or 'sale-void' if we had one
        title: 'Sale Voided (Refund)',
        itemDesc: itemsReturned.join(', '),
        field: locNames[locKey],
        oldVal: 0,
        newVal: 0,
        qtyDiff: 0 // Optional
    });

    saveData();
    renderHistory();
    renderTable(document.getElementById('searchInput') ? document.getElementById('searchInput').value : '');
    
    alert("Sale successfully voided and stock returned.");
}
"""

js += '\n\n' + void_function

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated void logic")
