function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            inventoryData = JSON.parse(saved);
            // Verify structure
            if (!Array.isArray(inventoryData) || inventoryData.length === 0) {
                inventoryData = [...initialData];
            }
        } catch (e) {
            console.error('Error parsing saved data, falling back to default', e);
            inventoryData = JSON.parse(JSON.stringify(initialData));
        }

        // Migrate existing GLC Books categories dynamically
        inventoryData.forEach(item => {
            // Capitalize (new) and (old) tags and rename True Life/PCS/DJ/Reliability
            if (item.desc) {
                item.desc = item.desc.replace(/\(new\)/gi, '(NEW)').replace(/\(old\)/gi, '(OLD)');
                if (item.desc === "True Life Participant Workbook") {
                    item.desc = "TLR Workbook (Participant)";
                } else if (item.desc === "True Life Facilitator Workbook") {
                    item.desc = "TLR Workbook (Facilitator)";
                } else if (item.desc === "Pcs Bookmark") {
                    item.desc = "PCS Bookmark";
                } else if (item.desc === "Dj Passport") {
                    item.desc = "DJ Passport";
                } else if (item.desc === "GLC Book 10: Realiability of the Bible") {
                    item.desc = "GLC Book 10: Reliability of the Bible";
                } else if (item.desc === "70X7 Work Books") {
                    item.desc = "70X7 Workbook";
                } else if (item.desc === "Motivate English") {
                    item.desc = "Motivate Book (English)";
                } else if (item.desc === "Motivate Chinese") {
                    item.desc = "Motivate Book (Chinese)";
                } else if (item.desc === "GLC Book 5 (English): Starting Point for small group(NEW)") {
                    item.desc = "GLC Book 5 (English): Starting Point for small group (NEW)";
                } else if (item.desc === "GLC Book 7 (English): The Family Life") {
                    item.desc = "GLC Book 7 (English): The Family Life (OLD)";
                } else if (item.desc === "IDC Bag Blue") {
                    item.desc = "IDC Bag (Color: Blue)";
                } else if (item.desc === "IDC bag Red") {
                    item.desc = "IDC Bag (Color: Red)";
                } else if (item.desc === "Dgroup kit") {
                    item.desc = "Dgroup Kit";
                } else if (item.desc === "2be1 Workbook") {
                    item.desc = "2Be1 Workbook";
                } else if (item.desc === "GLC Shirt") {
                    item.desc = "GLC T-Shirt";
                } else if (item.desc === "Superbook Work Book") {
                    item.desc = "Superbook Workbook";
                } else if (item.desc === "Memory Verse Volume 2") {
                    item.desc = "Memory Verse Booklet (Volume 2)";
                } else if (item.desc === "Discipleship Covenant") {
                    item.desc = "Discipleship Covenant Card";
                } else if (item.desc === "Gospel Tracts English (NEW)" || item.desc === "Gospel Tracts English") {
                    item.desc = "Gospel Tract English";
                } else if (item.desc === "Gospel Tracts Tagalog (NEW)" || item.desc === "Gospel Tracts Tagalog") {
                    item.desc = "Gospel Tract Tagalog";
                } else if (item.desc === "Gospel Tracts Elevate") {
                    item.desc = "Gospel Tract (Elevate/LMMR)";
                }
                
                // Normalize old formats first
                item.desc = item.desc.replace(/GLC Book (\d+)(?:\s*\((English|Filipino)\)|:\s+(English|Filipino))\s*:?\s*(.+)/g, 'GLC Book $1: $4');
                
                // Add (Filipino) back if it belongs to Filipino category
                if (item.category === "GLC 1 Books (Filipino)" || item.desc.toLowerCase().includes("filipino")) {
                    item.desc = item.desc.replace(/GLC Book (\d+):\s*(?!Filipino)(.+)/i, 'GLC Book $1 (Filipino): $2');
                }
            }
            
            if (item.category === "GLC Books" || item.category === "GLC 1 Books" || item.category === "GLC 2 Books" || item.category === "GLC 3 Books" || item.category === "Other GLC Books") {
                const desc = item.desc;
                if (desc.match(/GLC Book [1-4]\b/)) {
                    if (desc.toLowerCase().includes("filipino")) {
                        item.category = "GLC 1 Books (Filipino)";
                    } else {
                        item.category = "GLC 1 Books (English)";
                    }
                } else if (desc.match(/GLC Book [5-8]\b/)) {
                    item.category = "GLC 2 Books";
                } else if (desc.match(/GLC Book (9|10|11|12)\b/)) {
                    item.category = "GLC 3 Books";
                } else {
                    item.category = "Other GLC Books";
                }
            }
            
            // Backfill price from initial data if missing or 0
            const initialItem = initialData.find(i => i.id === item.id);
            if (initialItem) {
                item.price = initialItem.price;
            }
        });

    } else {
        // Deep copy initial data
        inventoryData = JSON.parse(JSON.stringify(initialData));
    }
}