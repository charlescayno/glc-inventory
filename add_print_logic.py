import re
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

def replacer(m):
    return """} else if (item.type === 'sale') {
            const saleItems = Array.isArray(item.items) ? item.items.join(', ') : (item.desc || '');
            div.innerHTML = `
                <div class="history-icon-badge history-icon-sale">
                    <i class="ri-shopping-cart-2-line"></i>
                </div>
                <div class="history-content">
                    <div class="history-header">
                        <span class="history-title">${item.title || 'Booth Sale'}</span>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <button class="btn btn-secondary print-past-receipt-btn" data-id="${item.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;"><i class="ri-printer-line"></i> Print</button>
                            <span class="history-time">${timeFormatted}</span>
                        </div>
                    </div>
                    <div class="history-route" style="margin-bottom: 0.35rem;">
                        <span class="history-qty-pill sale">₱ ${(item.totalAmount || 0).toLocaleString()}</span>
                        <span class="history-loc-badge dest"><i class="ri-store-2-line"></i> GLC Booth</span>
                    </div>
                    <div class="history-sale-items">${saleItems}</div>
                </div>
            `;
            
            // Wait, we need to bind the print button later, outside of the HTML string assignment!
"""

js = re.sub(r'\}\s*else if\s*\(\s*item\.type\s*===\s*\'sale\'\s*\)\s*\{.*?(?=\}\s*else\s*\{)', replacer, js, flags=re.DOTALL)

# Add the listener binding near the end of renderHistoryModal
listener_replacer = """
        // Bind Print Receipt buttons
        div.querySelectorAll('.print-past-receipt-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const receiptObj = {
                    id: 'TXN-' + new Date(item.timestamp).getTime().toString().substring(5),
                    date: item.timestamp,
                    location: item.title.replace(' Sale Completed', ''),
                    items: (item.items || []).map(desc => {
                        const qtyMatch = typeof desc === 'string' ? desc.match(/^(\d+)x\s+(.*)/) : null;
                        if (qtyMatch) {
                            return { qty: parseInt(qtyMatch[1]), desc: qtyMatch[2], subtotal: 0 };
                        }
                        return { qty: 1, desc: desc, subtotal: 0 };
                    }),
                    total: item.totalAmount || 0,
                    cash: item.totalAmount || 0,
                    change: 0
                };
                showReceiptModal(receiptObj);
            });
        });

        historyListContainer.appendChild(div);
"""

js = re.sub(r'historyListContainer\.appendChild\(div\);', listener_replacer, js)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated history log with Print button")
