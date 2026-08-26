import re
with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

func = r'''
function checkoutComplimentary() {
    const activeEntries = Object.entries(cartState).filter(([_, qty]) => qty > 0);
    if (activeEntries.length === 0) return;

    let itemsSummary = [];
    let receiptItems = [];
    let originalBill = 0;

    const locSelect = document.getElementById('checkoutLocationSelect');
    let checkoutLoc = locSelect ? locSelect.value : 'booth';
    let locName = '';
    const locNames = {'floor5': '5th Floor', 'floor7': '7th Floor', 'booth': 'GLC Booth'};
    
    if (isCashierMode) {
        checkoutLoc = 'booth';
        locName = 'GLC Booth';
    } else {
        locName = locNames[checkoutLoc] || 'GLC Booth';
    }

    activeEntries.forEach(([idStr, qty]) => {
        const id = parseInt(idStr);
        const itemIndex = inventoryData.findIndex(i => i.id === id);
        if (itemIndex !== -1) {
            const item = inventoryData[itemIndex];
            const currentStock = item[checkoutLoc] || 0;
            inventoryData[itemIndex][checkoutLoc] = Math.max(0, currentStock - qty);
            
            const itemSubtotal = qty * (item.price || 0);
            originalBill += itemSubtotal;
            itemsSummary.push(${qty}x );
            receiptItems.push({ desc: item.desc, qty: qty, subtotal: 0 }); // Free on receipt
        }
    });

    saveData();
    logActivity({
        type: 'sale',
        title: ${locName} Sale Completed (COMPLIMENTARY),
        items: itemsSummary,
        totalAmount: 0,
        totalQty: itemsSummary.length
    });

    // Generate receipt
    const receiptObj = {
        id: 'TXN-' + Math.floor(Date.now() / 1000) + '-COMP',
        date: new Date().toISOString(),
        location: locName,
        items: receiptItems,
        total: 0,
        cash: 0,
        change: 0,
        isComplimentary: true
    };
    receiptsData.push(receiptObj);
    localStorage.setItem('glcReceipts', JSON.stringify(receiptsData));

    cartState = {};
    if (cashReceivedInput) cashReceivedInput.value = '';
    updateCartUI();
    renderTable(searchInput.value);
    cartModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    showNotification('Complimentary checkout successful!', 'success');
    renderHistory();
    renderReceiptsList();
    showReceiptModal(receiptObj);
}

function checkoutCartDeduct'''

code = re.sub(r'function checkoutCartDeduct', func, code)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)
