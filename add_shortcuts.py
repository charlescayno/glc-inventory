import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

shortcuts_code = """
// ==========================================
// Global Keyboard Shortcuts
// ==========================================
document.addEventListener('keydown', (e) => {
    // Escape key
    if (e.key === 'Escape') {
        // If receipt modal is open, close it
        const receiptModal = document.getElementById('receiptModal');
        if (receiptModal && !receiptModal.classList.contains('hidden')) {
            receiptModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
            return;
        }
        // If history modal is open, close it
        const historyModal = document.getElementById('historyModal');
        if (historyModal && !historyModal.classList.contains('hidden')) {
            historyModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
            return;
        }
        // If cart modal is open, close it
        const cartModal = document.getElementById('cartModal');
        if (cartModal && !cartModal.classList.contains('hidden')) {
            cartModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
            return;
        }
        // If dashboard modal is open, close it
        const dashboardModal = document.getElementById('dashboardModal');
        if (dashboardModal && !dashboardModal.classList.contains('hidden')) {
            dashboardModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
            return;
        }
        // Focus search bar if nothing else is open
        const searchInput = document.getElementById('searchInput');
        if (searchInput && document.activeElement !== searchInput) {
            searchInput.focus();
        }
    }

    // Enter key
    if (e.key === 'Enter') {
        // If inside cart modal and cash input is focused, finalize
        const cartModal = document.getElementById('cartModal');
        if (cartModal && !cartModal.classList.contains('hidden') && document.activeElement === document.getElementById('cashReceivedInput')) {
            checkoutCartDeduct();
        }
    }

    // Ctrl + / Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault(); // prevent native browser search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
});
"""

if 'Global Keyboard Shortcuts' not in js:
    js += '\n' + shortcuts_code

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Added keyboard shortcuts")
