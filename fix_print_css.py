with open('index.css', 'a', encoding='utf-8') as f:
    f.write("""

@media print {
    /* Style receipt paper to act like a thermal receipt */
    .receipt-modal-content {
        margin: 0 !important;
        padding: 0 !important;
        width: 300px !important; /* Standard 80mm thermal receipt approx */
        border: none !important;
    }
    #receiptPrintArea {
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
    }
    .receipt-paper {
        background: white !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        width: 100% !important;
        font-family: 'Courier New', Courier, monospace !important;
        font-size: 12px !important;
        color: black !important;
    }
    .receipt-paper h3 {
        font-size: 16px !important;
        margin-bottom: 5px !important;
        text-align: center !important;
    }
    .receipt-divider {
        border-top: 1px dashed black !important;
        margin: 8px 0 !important;
    }
    .receipt-item {
        display: flex !important;
        justify-content: space-between !important;
        margin-bottom: 4px !important;
        font-size: 12px !important;
    }
}
""")
print("Added POS print CSS")
