import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add DOM elements
dom_elements = """
const receiptModal = document.getElementById('receiptModal');
const receiptPaper = document.getElementById('receiptPaper');
const printReceiptBtn = document.getElementById('printReceiptBtn');
const closeReceiptModalBtn = document.getElementById('closeReceiptModalBtn');
const doneReceiptBtn = document.getElementById('doneReceiptBtn');

const RECEIPTS_STORAGE_KEY = 'glc_receipts_data';
let receiptsData = [];
try {
    const saved = localStorage.getItem(RECEIPTS_STORAGE_KEY);
    receiptsData = saved ? JSON.parse(saved) : [];
} catch(e) { receiptsData = []; }
function saveReceipts() {
    localStorage.setItem(RECEIPTS_STORAGE_KEY, JSON.stringify(receiptsData));
}
"""
content = re.sub(r'const cartModal = document.getElementById\(\'cartModal\'\);', r'const cartModal = document.getElementById(\'cartModal\');\n' + dom_elements, content)

# Setup listeners
listeners = """
    if(closeReceiptModalBtn) closeReceiptModalBtn.addEventListener('click', () => { receiptModal.classList.add('hidden'); document.body.classList.remove('modal-open'); });
    if(doneReceiptBtn) doneReceiptBtn.addEventListener('click', () => { receiptModal.classList.add('hidden'); document.body.classList.remove('modal-open'); });
    if(printReceiptBtn) printReceiptBtn.addEventListener('click', () => { window.print(); });
"""
content = re.sub(r'checkoutDeductBtn.addEventListener\(\'click\', checkoutCartDeduct\);', r'checkoutDeductBtn.addEventListener(\'click\', checkoutCartDeduct);\n' + listeners, content)

# Update checkoutCartDeduct
checkout_regex = r'function checkoutCartDeduct\(\).*?clearCart\(\);.*?alert\([^\)]+\);\n\}'
def checkout_repl(match):
    return '''function checkoutCartDeduct() {
    const activeEntries = Object.entries(cartState).filter(([_, qty]) => qty > 0);
    if (activeEntries.length === 0) return;

    let itemsSummary = [];
    let receiptItems = [];
    let totalBill = 0;

    const locSelect = document.getElementById('checkoutLocationSelect');
    const checkoutLoc = locSelect ? locSelect.value : 'booth';
    const locNames = {'floor5': '5th Floor', 'floor7': '7th Floor', 'booth': 'GLC Booth'};
    const locName = locNames[checkoutLoc] || 'GLC Booth';

    activeEntries.forEach(([idStr, qty]) => {
        const id = parseInt(idStr);
        const itemIndex = inventoryData.findIndex(i => i.id === id);
        if (itemIndex !== -1) {
            const item = inventoryData[itemIndex];
            const currentStock = item[checkoutLoc] || 0;
            inventoryData[itemIndex][checkoutLoc] = Math.max(0, currentStock - qty);
            
            const itemSubtotal = qty * (item.price || 0);
            totalBill += itemSubtotal;
            itemsSummary.push(`${qty}x ${item.desc}`);
            receiptItems.push({ desc: item.desc, qty: qty, subtotal: itemSubtotal });
        }
    });

    const cashInputVal = document.getElementById('cashReceivedInput').value;
    const cashReceived = parseFloat(cashInputVal) || 0;
    const changeDue = Math.max(0, cashReceived - totalBill);

    saveData();
    logActivity({
        type: 'sale',
        title: `${locName} Sale Completed`,
        items: itemsSummary,
        totalAmount: totalBill,
        totalQty: itemsSummary.length
    });

    // Generate receipt
    const receiptObj = {
        id: 'TXN-' + Math.floor(Date.now() / 1000),
        date: new Date().toISOString(),
        location: locName,
        items: receiptItems,
        total: totalBill,
        cash: cashReceived,
        change: changeDue
    };
    receiptsData.push(receiptObj);
    saveReceipts();

    clearCart();
    cartModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    renderTable(searchInput.value);
    
    showReceiptModal(receiptObj);
}

function showReceiptModal(receipt) {
    let d = new Date(receipt.date);
    let html = `
        <h3>GLC Inventory</h3>
        <p>Location: ${receipt.location}</p>
        <p>Date: ${d.toLocaleString()}</p>
        <p>TXN: ${receipt.id}</p>
        <div class="receipt-divider"></div>
    `;
    
    receipt.items.forEach(item => {
        html += `
            <div class="receipt-item">
                <div class="receipt-item-name">
                    <span class="receipt-item-qty">${item.qty}x</span>${item.desc}
                </div>
                <div>₱${item.subtotal.toLocaleString()}</div>
            </div>
        `;
    });
    
    html += `
        <div class="receipt-divider"></div>
        <div class="receipt-totals">
            <div class="receipt-total-row">
                <span>TOTAL DUE</span>
                <span>₱${receipt.total.toLocaleString()}</span>
            </div>
            <div class="receipt-total-row sub">
                <span>CASH</span>
                <span>₱${receipt.cash.toLocaleString()}</span>
            </div>
            <div class="receipt-total-row sub">
                <span>CHANGE</span>
                <span>₱${receipt.change.toLocaleString()}</span>
            </div>
        </div>
        <div class="receipt-divider"></div>
        <p>Thank you for your purchase!</p>
    `;
    
    if (receiptPaper) receiptPaper.innerHTML = html;
    if (receiptModal) {
        receiptModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    }
}
'''

content = re.sub(checkout_regex, checkout_repl, content, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
