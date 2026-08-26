import re

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

new_export = r"""
async function exportToExcel() {
    // Current date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dateString = new Date().toLocaleDateString(undefined, dateOptions);

    const workbook = new ExcelJS.Workbook();
    
    // --- Sheet 1: Inventory ---
    const worksheet = workbook.addWorksheet('Inventory');

    // Title Row (Row 1)
    const titleRow = worksheet.addRow([`GLC Resource Inventory Report`]);
    titleRow.font = { bold: true, size: 14 };

    // Date separate at B1 as requested
    worksheet.getCell('B1').value = dateString;
    worksheet.getCell('B1').font = { italic: true };
    
    // Empty row
    worksheet.addRow([]); 

    // Header Row (Row 3)
    const headerRow = worksheet.addRow(["Category", "Description", "5th Floor", "7th Floor", "GLC Booth", "Total"]);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Sort data for better readability (Category, then Name)
    const sortedData = [...inventoryData].sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.desc.localeCompare(b.desc);
    });

    // Data rows
    sortedData.forEach(item => {
        const total = (item.floor5 || 0) + (item.floor7 || 0) + (item.booth || 0);
        const row = worksheet.addRow([
            item.category,
            item.desc,
            item.floor5 || 0,
            item.floor7 || 0,
            item.booth || 0,
            total
        ]);
        
        // Center align C to F (5th Floor to Total)
        row.getCell(3).alignment = { horizontal: 'center' };
        row.getCell(4).alignment = { horizontal: 'center' };
        row.getCell(5).alignment = { horizontal: 'center' };
        row.getCell(6).alignment = { horizontal: 'center' };
    });

    // Add Summation Row
    const sumRowData = ["", "Grand Total", 0, 0, 0, 0];
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 3) {
            sumRowData[2] += (row.getCell(3).value || 0);
            sumRowData[3] += (row.getCell(4).value || 0);
            sumRowData[4] += (row.getCell(5).value || 0);
            sumRowData[5] += (row.getCell(6).value || 0);
        }
    });

    const sumRow = worksheet.addRow(sumRowData);
    sumRow.font = { bold: true };
    sumRow.eachCell((cell, colNumber) => {
        if (colNumber >= 3) {
            cell.alignment = { horizontal: 'center' };
        }
        cell.border = { top: { style: 'double' } };
    });

    worksheet.getColumn(1).width = 30; // Category
    worksheet.getColumn(2).width = 45; // Description
    worksheet.getColumn(3).width = 15; // 5th
    worksheet.getColumn(4).width = 15; // 7th
    worksheet.getColumn(5).width = 15; // Booth
    worksheet.getColumn(6).width = 15; // Total
    
    // --- Sheet 2: Transactions / Cashier History ---
    const receiptSheet = workbook.addWorksheet('Transactions History');
    
    const rTitleRow = receiptSheet.addRow(['Cashier Transactions Log']);
    rTitleRow.font = { bold: true, size: 14 };
    
    receiptSheet.getCell('B1').value = dateString;
    receiptSheet.getCell('B1').font = { italic: true };
    
    receiptSheet.addRow([]);
    
    const rHeaderRow = receiptSheet.addRow(['Date', 'Transaction ID', 'Location', 'Items Bought', 'Total Bill', 'Cash Received', 'Change Due']);
    rHeaderRow.font = { bold: true };
    rHeaderRow.alignment = { horizontal: 'center' };
    
    let grandTotalSales = 0;
    
    // receiptsData is an array of objects saved in localStorage from the Cashier Mode
    if (typeof receiptsData !== 'undefined' && receiptsData.length > 0) {
        receiptsData.forEach(tx => {
            const itemsStr = tx.items.map(i => `${i.qty}x ${i.desc} (P${i.subtotal})`).join('\\n');
            const row = receiptSheet.addRow([
                new Date(tx.date).toLocaleString(),
                tx.id,
                tx.location,
                itemsStr,
                tx.total,
                tx.cash,
                tx.change
            ]);
            
            row.getCell(4).alignment = { wrapText: true };
            row.getCell(5).numFmt = 'P#,##0.00';
            row.getCell(6).numFmt = 'P#,##0.00';
            row.getCell(7).numFmt = 'P#,##0.00';
            
            grandTotalSales += (tx.total || 0);
        });
    } else {
        receiptSheet.addRow(['', 'No transaction history found', '', '', '', '', '']);
    }
    
    receiptSheet.addRow([]);
    const summaryRRow = receiptSheet.addRow(['', '', '', 'GRAND TOTAL SALES:', grandTotalSales, '', '']);
    summaryRRow.font = { bold: true, color: { arg: 'FF008000' } };
    summaryRRow.getCell(5).numFmt = 'P#,##0.00';
    
    receiptSheet.getColumn(1).width = 22; // Date
    receiptSheet.getColumn(2).width = 18; // TXN ID
    receiptSheet.getColumn(3).width = 15; // Location
    receiptSheet.getColumn(4).width = 60; // Items
    receiptSheet.getColumn(5).width = 15; // Total
    receiptSheet.getColumn(6).width = 15; // Cash
    receiptSheet.getColumn(7).width = 15; // Change

    // Download the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    // Make filename url-safe date
    const safeDateStr = new Date().toLocaleDateString('en-CA').replace(/\//g, '-');
    a.href = url;
    a.download = `GLC_Inventory_${safeDateStr}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
}
"""

new_code = re.sub(r'async function exportToExcel\(\)\s*\{.*?URL\.revokeObjectURL\(url\);\n\}', new_export, code, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_code)
