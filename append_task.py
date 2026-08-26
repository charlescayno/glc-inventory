with open(r'C:\Users\ccayno\.gemini\antigravity\brain\96f212f0-bcf0-4f47-a072-bcc0c7872826\task.md', 'a', encoding='utf-8') as f:
    f.write("""
# Task 4: Void Transactions
- `[x]` Fix the bug where complimentary transactions logged "x " instead of the correct quantity and item name.
- `[x]` Implement `voidSale(historyId)` function in `app.js` to parse past sales and re-add stock to the correct location.
- `[x]` Update the Activity History modal to show a "Void" button for sales, and display a "Voided" badge (along with struck-through text) if a sale has been voided.
- `[x]` Update `receiptsData` and the `showReceiptModal` to boldly label reprinted receipts as "VOIDED" if the transaction was reversed.
- `[x]` Create a new `adjust` activity log automatically whenever a sale is voided, for full traceability.
""")
