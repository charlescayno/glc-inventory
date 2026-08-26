import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

void_logic_replacement = """
    // Mark history entry as voided
    historyData[historyIndex].isVoided = true;

    // Mark receipt as voided
    const receiptIndex = receiptsData.findIndex(r => r.date === entry.timestamp);
    if (receiptIndex !== -1) {
        receiptsData[receiptIndex].isVoided = true;
        saveReceipts();
    }

    // Log the void activity
"""

js = js.replace('// Mark history entry as voided\n    historyData[historyIndex].isVoided = true;\n\n    // Log the void activity', void_logic_replacement)

# Also update showReceiptModal to show a VOID watermark or text if receipt.isVoided
show_receipt_replacement = """function showReceiptModal(receipt) {
    let d = new Date(receipt.date);
    let voidStatus = receipt.isVoided ? '<div style="color:red; font-weight:bold; text-align:center; font-size:18px; border:2px dashed red; margin-bottom:10px;">VOIDED</div>' : '';
    let html = `
        <h3>GLC Inventory</h3>
        ${voidStatus}
        <p>Location: ${receipt.location}</p>"""

js = re.sub(r'function showReceiptModal\(receipt\)\s*\{\s*let d = new Date\(receipt\.date\);\s*let html = `\s*<h3>GLC Inventory</h3>\s*<p>Location: \$\{receipt\.location\}</p>', show_receipt_replacement, js, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated receipt void logic")
