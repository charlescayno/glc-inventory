import re
with open('index.css', 'r', encoding='utf-8') as f: content = f.read()

receipt_css = '''
/* --- Receipt Modal & Printing --- */
.receipt-modal-content {
    max-width: 400px;
}
.receipt-body {
    padding: 1.5rem;
    background: #fff;
    color: #000;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
}
.receipt-header {
    text-align: center;
    margin-bottom: 1.5rem;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 1rem;
}
.receipt-header h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
}
.receipt-header p {
    margin: 0;
    font-size: 0.8rem;
    color: #555;
}
.receipt-item-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}
.receipt-item-name {
    flex: 1;
    padding-right: 1rem;
}
.receipt-item-price {
    text-align: right;
}
.receipt-totals {
    margin-top: 1rem;
    border-top: 1px dashed #ccc;
    padding-top: 1rem;
}
.receipt-total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
}
.receipt-total-row.grand-total {
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 0.5rem;
    border-top: 1px solid #000;
    padding-top: 0.5rem;
}
.receipt-footer {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.8rem;
    color: #555;
    border-top: 1px dashed #ccc;
    padding-top: 1rem;
}

@media print {
    body * {
        visibility: hidden;
    }
    #receiptPrintArea, #receiptPrintArea * {
        visibility: visible;
    }
    #receiptPrintArea {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    .hide-on-print {
        display: none !important;
    }
}
'''

content += '\n' + receipt_css

with open('index.css', 'w', encoding='utf-8') as f: f.write(content)
