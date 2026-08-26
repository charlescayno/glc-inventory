import re
with open('index.html', 'r', encoding='utf-8') as f: content = f.read()

receipt_html = '''
    <!-- Receipt Modal -->
    <div id="receiptModal" class="modal hidden">
        <div class="modal-content receipt-modal-content">
            <div class="modal-header hide-on-print">
                <h2><i class="ri-receipt-line" style="color: var(--color-primary); margin-right: 0.5rem;"></i>Receipt</h2>
                <button class="close-modal" id="closeReceiptModalBtn"><i class="ri-close-line"></i></button>
            </div>
            <div class="modal-body receipt-body" id="receiptPrintArea">
                <!-- Receipt content injected here -->
            </div>
            <div class="modal-footer hide-on-print">
                <button class="btn btn-secondary" id="closeReceiptBtn">Done</button>
                <button class="btn btn-primary" id="printReceiptBtn">
                    <i class="ri-printer-line"></i> Print
                </button>
            </div>
        </div>
    </div>
'''

content = content.replace('    <!-- Quick Total / Cart Calculator Modal -->', receipt_html + '\n    <!-- Quick Total / Cart Calculator Modal -->')

with open('index.html', 'w', encoding='utf-8') as f: f.write(content)
