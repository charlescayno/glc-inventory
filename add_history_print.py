with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re

# Find renderHistoryModal
js = re.sub(r'(const div = document\.createElement\(\'div\'\);\s*div\.className = \'history-item\';\s*)if \(item\.type === \'transfer\'\) \{', 
r"""\1if (item.type === 'sale') {
            div.innerHTML = `
                <div class="history-content">
                    <div class="history-title">${item.title}</div>
                    <div class="history-details" style="display:block;">
                        ${(item.items || []).map(i => `<div>${i}</div>`).join('')}
                    </div>
                    <div class="history-meta" style="margin-top: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span class="history-time"><i class="ri-time-line"></i> ${timeFormatted}</span>
                            <span class="history-qty" style="color:var(--color-primary); font-weight:600; margin-left: 10px;">Total: ₱${(item.totalAmount || 0).toLocaleString()}</span>
                        </div>
                        <button class="btn btn-secondary print-past-receipt-btn" data-id="${item.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;"><i class="ri-printer-line"></i> Print Receipt</button>
                    </div>
                </div>
            `;
            
            const printBtn = div.querySelector('.print-past-receipt-btn');
            if (printBtn) {
                printBtn.onclick = () => {
                    const receiptObj = {
                        id: 'TXN-' + new Date(item.timestamp).getTime().toString().substring(5),
                        date: item.timestamp,
                        location: item.title.replace(' Sale Completed', ''),
                        items: (item.items || []).map(desc => {
                            const qtyMatch = desc.match(/^(\d+)x\s+(.*)/);
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
                };
            }
        } else if (item.type === 'transfer') {""", js)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated history render")
