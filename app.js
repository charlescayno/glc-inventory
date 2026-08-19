// Initial Data Extracted from Image
const initialData = [
    { id: 1, category: "GLC 1 Books (English)", desc: "GLC Book 1: English One by One (NEW)", floor5: 750, floor7: 55, booth: 202 },
    { id: 2, category: "GLC 1 Books (English)", desc: "GLC Book 1: English One by One (OLD)", floor5: 34, floor7: 0, booth: 0 },
    { id: 3, category: "GLC 1 Books (English)", desc: "GLC Book 2: English Spiritual Disciplines (NEW)", floor5: 600, floor7: 56, booth: 158 },
    { id: 4, category: "GLC 1 Books (English)", desc: "GLC Book 2: English Spiritual Disciplines (OLD)", floor5: 105, floor7: 0, booth: 0 },
    { id: 5, category: "GLC 1 Books (English)", desc: "GLC Book 3: English The Holy Spirit", floor5: 750, floor7: 52, booth: 341 },
    { id: 6, category: "GLC 1 Books (English)", desc: "GLC Book 4: English CCF DNA (OLD)", floor5: 470, floor7: 0, booth: 0 },
    { id: 7, category: "GLC 1 Books (English)", desc: "GLC Book 4: English CCF DNA (NEW)", floor5: 100, floor7: 80, booth: 192 },
    { id: 8, category: "GLC 2 Books", desc: "GLC Book 5: English Starting Point for small group(NEW)", floor5: 445, floor7: 50, booth: 45 },
    { id: 9, category: "GLC 2 Books", desc: "GLC Book 5: English Starting Point for small group (OLD)", floor5: 75, floor7: 39, booth: 93 },
    { id: 10, category: "GLC 2 Books", desc: "GLC Book 6: English Basic Doctrine", floor5: 250, floor7: 42, booth: 178 },
    { id: 11, category: "GLC 2 Books", desc: "GLC Book 7: English The Family Life (NEW)", floor5: 300, floor7: 15, booth: 147 },
    { id: 12, category: "GLC 2 Books", desc: "GLC Book 7: English The Family Life", floor5: 350, floor7: 21, booth: 33 },
    { id: 13, category: "GLC 2 Books", desc: "GLC Book 9: English The Multiplier", floor5: 282, floor7: 16, booth: 102 },
    { id: 14, category: "Other GLC Books", desc: "GLC Book 10: Reliability of the Bible", floor5: 250, floor7: 44, booth: 156 },
    { id: 15, category: "Other GLC Books", desc: "GLC Book 11: Spiritual Warfare", floor5: 400, floor7: 45, booth: 148 },
    { id: 16, category: "GLC 1 Books (Filipino)", desc: "GLC Book 1: Filipino One by One", floor5: 0, floor7: 18, booth: 40 },
    { id: 17, category: "GLC 1 Books (Filipino)", desc: "GLC Book 2: Filipino Spiritual Disciple", floor5: 0, floor7: 1, booth: 6 },
    { id: 18, category: "GLC 1 Books (Filipino)", desc: "GLC Book 4: Filipino CCF DNA", floor5: 370, floor7: 17, booth: 62 },
    { id: 19, category: "Booklets & Workbooks", desc: "Life Goals Magazine", floor5: 325, floor7: 21, booth: 60 },
    { id: 20, category: "Booklets & Workbooks", desc: "70X7 Workbook", floor5: 100, floor7: 19, booth: 50 },
    { id: 21, category: "Materials", desc: "70X7 USB", floor5: 0, floor7: 0, booth: 0 },
    { id: 22, category: "Booklets & Workbooks", desc: "Superbook Work Book", floor5: 0, floor7: 0, booth: 112 },
    { id: 23, category: "Booklets & Workbooks", desc: "Memory Verse Volume 2", floor5: 350, floor7: 31, booth: 78 },
    { id: 24, category: "Booklets & Workbooks", desc: "Holy Spirit Booklet", floor5: 200, floor7: 45, booth: 63 },
    { id: 25, category: "Booklets & Workbooks", desc: "Real Talk Booklet", floor5: 1000, floor7: 31, booth: 70 },
    { id: 26, category: "Materials", desc: "Motivate Book (English)", floor5: 280, floor7: 7, booth: 50 },
    { id: 27, category: "Materials", desc: "Motivate Book (Chinese)", floor5: 4, floor7: 0, booth: 0 },
    { id: 28, category: "Tracts", desc: "Dare 2 Share", floor5: 19, floor7: 0, booth: 9 },
    { id: 29, category: "Materials", desc: "Dgroup kit", floor5: 0, floor7: 0, booth: 0 },
    { id: 30, category: "Materials", desc: "IDC bag Red", floor5: 0, floor7: 0, booth: 0 },
    { id: 31, category: "Materials", desc: "IDC Bag Blue", floor5: 60, floor7: 0, booth: 7 },
    { id: 32, category: "Materials", desc: "DJ Passport", floor5: 200, floor7: 34, booth: 60 },
    { id: 33, category: "Materials", desc: "Discipleship Covenant", floor5: 0, floor7: 0, booth: 194 },
    { id: 34, category: "Materials", desc: "PCS Card", floor5: 150, floor7: 350, booth: 179 },
    { id: 35, category: "Materials", desc: "PCS Bookmark", floor5: 0, floor7: 600, booth: 400 },
    { id: 36, category: "Materials", desc: "Accountability Card", floor5: 3400, floor7: 1300, booth: 689 },
    { id: 37, category: "Tracts", desc: "Gospel Tracts English (NEW)", floor5: 45000, floor7: 1955, booth: 2000 },
    { id: 38, category: "Tracts", desc: "Gospel Tracts Tagalog (NEW)", floor5: 45400, floor7: 920, booth: 2400 },
    { id: 39, category: "Tracts", desc: "Gospel Tracts Elevate", floor5: 0, floor7: 290, booth: 1100 },
    { id: 40, category: "Booklets & Workbooks", desc: "Heart Of A Champion", floor5: 150, floor7: 10, booth: 30 },
    { id: 41, category: "Booklets & Workbooks", desc: "TLR Workbook (Participant)", floor5: 300, floor7: 10, booth: 13 },
    { id: 42, category: "Booklets & Workbooks", desc: "TLR Workbook (Facilitator)", floor5: 220, floor7: 25, booth: 66 },
    { id: 43, category: "Booklets & Workbooks", desc: "2be1 Workbook", floor5: 0, floor7: 3, booth: 21 }
];

// State
let inventoryData = [];
let currentCategory = 'All';
const STORAGE_KEY = 'resource_inventory_data';

// DOM Elements
const inventoryBody = document.getElementById('inventoryBody');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const lastUpdatedEl = document.getElementById('lastUpdated');
const exportBtn = document.getElementById('exportBtn');

// Summary Elements
const totalTypesEl = document.getElementById('totalTypes');
const grandTotalEl = document.getElementById('grandTotal');

// Adjust Modal Elements
const adjustModal = document.getElementById('adjustModal');
const closeAdjustModalBtn = document.getElementById('closeAdjustModalBtn');
const cancelAdjustBtn = document.getElementById('cancelAdjustBtn');
const confirmAdjustBtn = document.getElementById('confirmAdjustBtn');
const adjustItemDesc = document.getElementById('adjustItemDesc');
const adjustLocationText = document.getElementById('adjustLocationText');
const adjustCurrentVal = document.getElementById('adjustCurrentVal');
const adjustNewVal = document.getElementById('adjustNewVal');
const adjustAmountInput = document.getElementById('adjustAmountInput');
const adjustOpBtns = document.querySelectorAll('.adjust-op-btn');
const quickAmtBtns = document.querySelectorAll('.quick-amt-btn');

// Adjust Modal State
let adjustState = {
    id: null,
    field: null,
    op: 'add',
    currentVal: 0,
    amount: 0
};

// Quick Edit Modal Elements
const fabQuickEdit = document.getElementById('fabQuickEdit');
const quickEditModal = document.getElementById('quickEditModal');
const closeQuickEditBtn = document.getElementById('closeQuickEditBtn');
const cancelQuickEditBtn = document.getElementById('cancelQuickEditBtn');
const saveQuickEditBtn = document.getElementById('saveQuickEditBtn');
const quickEditSearch = document.getElementById('quickEditSearch');
const quickEditDropdown = document.getElementById('quickEditDropdown');
const quickEditForm = document.getElementById('quickEditForm');
const qeItemDesc = document.getElementById('qeItemDesc');
const qeItemCategory = document.getElementById('qeItemCategory');
const qeFloor5 = document.getElementById('qeFloor5');
const qeFloor7 = document.getElementById('qeFloor7');
const qeBooth = document.getElementById('qeBooth');
const qeQtyBtns = document.querySelectorAll('.modal-body .qty-btn'); // For +/- inside Quick Edit
let currentQuickEditItem = null;

// Sorting State
let sortColumn = 'desc';
let sortDirection = 'asc'; // 'asc' or 'desc'

// Initialize Application
function init() {
    loadData();
    renderTable();
    updateSummaries();
    setupEventListeners();
    updateLastSavedTime();
    
    // Display Current Date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDateDisplay').textContent = new Date().toLocaleDateString(undefined, dateOptions);
}

// Data Management
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
                }
            }
            
            if (item.category === "GLC Books" || item.category === "GLC 1 Books" || item.category === "GLC 2 Books" || item.category === "GLC 3 Books" || item.category === "Other GLC Books") {
                const desc = item.desc;
                if (desc.includes("GLC Book 1:") || desc.includes("GLC Book 2:") || desc.includes("GLC Book 3:") || desc.includes("GLC Book 4:")) {
                    if (desc.toLowerCase().includes("filipino")) {
                        item.category = "GLC 1 Books (Filipino)";
                    } else {
                        item.category = "GLC 1 Books (English)";
                    }
                } else if (desc.includes("GLC Book 5:") || desc.includes("GLC Book 6:") || desc.includes("GLC Book 7:") || desc.includes("GLC Book 8:")) {
                    item.category = "GLC 2 Books";
                } else if (desc.includes("GLC Book 9:") || desc.includes("GLC Book 10:") || desc.includes("GLC Book 11:") || desc.includes("GLC Book 12:")) {
                    item.category = "GLC 3 Books";
                } else {
                    item.category = "Other GLC Books";
                }
            }
        });

    } else {
        // Deep copy initial data
        inventoryData = JSON.parse(JSON.stringify(initialData));
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inventoryData));
    updateLastSavedTime();
    updateSummaries();
}

function updateLastSavedTime() {
    const now = new Date();
    lastUpdatedEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Calculate and update top summaries
function updateSummaries() {
    let grandTotal = 0;
    
    inventoryData.forEach(item => {
        grandTotal += (item.floor5 || 0) + (item.floor7 || 0) + (item.booth || 0);
    });
    
    totalTypesEl.textContent = inventoryData.length;
    grandTotalEl.textContent = grandTotal.toLocaleString();
}

// Rendering
function renderTable(searchTerm = '') {
    inventoryBody.innerHTML = '';
    
    const term = searchTerm.toLowerCase();
    let filteredData = inventoryData.filter(item => {
        const matchesSearch = item.desc.toLowerCase().includes(term);
        const matchesCategory = currentCategory === 'All' || item.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    // Apply Sorting
    filteredData.sort((a, b) => {
        let valA, valB;
        if (sortColumn === 'desc') {
            valA = a.desc.toLowerCase();
            valB = b.desc.toLowerCase();
        } else if (sortColumn === 'total') {
            valA = (a.floor5 || 0) + (a.floor7 || 0) + (a.booth || 0);
            valB = (b.floor5 || 0) + (b.floor7 || 0) + (b.booth || 0);
        } else {
            valA = a[sortColumn] || 0;
            valB = b[sortColumn] || 0;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    // Update Sorting UI
    document.querySelectorAll('th.sortable').forEach(th => {
        th.classList.remove('active');
        const icon = th.querySelector('i');
        icon.className = 'ri-arrow-up-down-line';
        if (th.dataset.sort === sortColumn) {
            th.classList.add('active');
            icon.className = sortDirection === 'asc' ? 'ri-arrow-up-line' : 'ri-arrow-down-line';
        }
    });

    if (filteredData.length === 0) {
        inventoryBody.parentElement.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }

    inventoryBody.parentElement.classList.remove('hidden');
    noResults.classList.add('hidden');

    filteredData.forEach(item => {
        const total = (item.floor5 || 0) + (item.floor7 || 0) + (item.booth || 0);
        
        let iconClass = 'ri-file-list-line'; // default
        if (item.category === 'GLC 1 Books (English)' || item.category === 'GLC 1 Books (Filipino)' || item.category === 'GLC 2 Books' || item.category === 'GLC 3 Books' || item.category === 'Other GLC Books') iconClass = 'ri-book-3-line';
        if (item.category === 'Booklets & Workbooks') iconClass = 'ri-book-open-line';
        if (item.category === 'Tracts') iconClass = 'ri-pages-line';
        if (item.category === 'Materials') iconClass = 'ri-box-3-line';

        const isLocked = item.isLocked || false;
        const lockIcon = isLocked ? 'ri-lock-fill' : 'ri-lock-unlock-line';
        const lockColor = isLocked ? 'var(--color-primary)' : 'var(--color-text-muted)';
        const rowClass = isLocked ? 'locked-row' : '';
        const controlClass = isLocked ? 'qty-control locked' : 'qty-control';
        const inputDisabled = isLocked ? 'disabled' : '';

        const tr = document.createElement('tr');
        if (isLocked) tr.classList.add('locked-row');
        tr.innerHTML = `
            <td data-label="Description">
                <span class="desc-text">
                    <button class="lock-toggle-btn" data-id="${item.id}" title="Toggle Lock">
                        <i class="${lockIcon}" style="color: ${lockColor};"></i>
                    </button>
                    <i class="${iconClass}" style="color: var(--color-primary); margin-right: 0.5rem;"></i>${item.desc}
                </span>
            </td>
            <td class="col-location" data-label="5th Floor">
                <div class="${controlClass}">
                    <button class="qty-btn minus" data-id="${item.id}" data-field="floor5" ${inputDisabled}><i class="ri-subtract-line"></i></button>
                    <input type="number" class="qty-input" data-id="${item.id}" data-field="floor5" value="${item.floor5}" min="0" ${inputDisabled}>
                    <button class="qty-btn plus" data-id="${item.id}" data-field="floor5" ${inputDisabled}><i class="ri-add-line"></i></button>
                    <button class="qty-btn adjust" data-id="${item.id}" data-field="floor5" title="Adjust" ${inputDisabled}><i class="ri-calculator-line"></i></button>
                </div>
            </td>
            <td class="col-location" data-label="7th Floor">
                <div class="${controlClass}">
                    <button class="qty-btn minus" data-id="${item.id}" data-field="floor7" ${inputDisabled}><i class="ri-subtract-line"></i></button>
                    <input type="number" class="qty-input" data-id="${item.id}" data-field="floor7" value="${item.floor7}" min="0" ${inputDisabled}>
                    <button class="qty-btn plus" data-id="${item.id}" data-field="floor7" ${inputDisabled}><i class="ri-add-line"></i></button>
                    <button class="qty-btn adjust" data-id="${item.id}" data-field="floor7" title="Adjust" ${inputDisabled}><i class="ri-calculator-line"></i></button>
                </div>
            </td>
            <td class="col-location" data-label="GLC Booth">
                <div class="${controlClass}">
                    <button class="qty-btn minus" data-id="${item.id}" data-field="booth" ${inputDisabled}><i class="ri-subtract-line"></i></button>
                    <input type="number" class="qty-input" data-id="${item.id}" data-field="booth" value="${item.booth}" min="0" ${inputDisabled}>
                    <button class="qty-btn plus" data-id="${item.id}" data-field="booth" ${inputDisabled}><i class="ri-add-line"></i></button>
                    <button class="qty-btn adjust" data-id="${item.id}" data-field="booth" title="Adjust" ${inputDisabled}><i class="ri-calculator-line"></i></button>
                </div>
            </td>
            <td class="col-total" data-label="Total">
                <span class="total-value ${total === 0 ? 'zero' : ''}" id="total-${item.id}">
                    ${total.toLocaleString()}
                </span>
            </td>
        `;
        inventoryBody.appendChild(tr);
    });

    // Re-attach input event listeners to new elements
    document.querySelectorAll('.qty-input:not(#adjustAmountInput)').forEach(input => {
        input.addEventListener('input', handleQuantityChange);
        // Select all text on focus for easier editing
        input.addEventListener('focus', function() { this.select(); });
    });
    
    // Attach click listeners for plus/minus buttons
    document.querySelectorAll('.qty-btn.plus, .qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', handleQuantityButtonClick);
    });

    // Attach click listeners for adjust buttons
    document.querySelectorAll('.qty-btn.adjust').forEach(btn => {
        btn.addEventListener('click', openAdjustModal);
    });

    document.querySelectorAll('.lock-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            const item = inventoryData.find(i => i.id === id);
            if (item) {
                item.isLocked = !item.isLocked;
                saveData();
                renderTable(searchInput.value);
            }
        });
    });

    updateLocationView();
}

function updateLocationView() {
    const filterValue = document.getElementById('locationFilter').value;
    
    // Select all location columns headers and cells
    const locationCols = {
        'floor5': document.querySelectorAll('th[data-sort="floor5"], td[data-label="5th Floor"]'),
        'floor7': document.querySelectorAll('th[data-sort="floor7"], td[data-label="7th Floor"]'),
        'booth': document.querySelectorAll('th[data-sort="booth"], td[data-label="GLC Booth"]')
    };

    // First reset all to visible
    Object.values(locationCols).forEach(elements => {
        elements.forEach(el => el.classList.remove('hidden-column'));
    });

    // Then hide the ones that don't match if not 'all'
    if (filterValue !== 'all') {
        document.getElementById('inventoryTable').classList.add('viewing-single-location');
        Object.entries(locationCols).forEach(([key, elements]) => {
            if (key !== filterValue) {
                elements.forEach(el => el.classList.add('hidden-column'));
            }
        });
    } else {
        document.getElementById('inventoryTable').classList.remove('viewing-single-location');
    }
}

// Event Handlers
function handleQuantityChange(e) {
    const input = e.target;
    const id = parseInt(input.getAttribute('data-id'));
    const field = input.getAttribute('data-field');
    
    // Allow empty string while typing, but evaluate as 0 for math
    let val = input.value === '' ? 0 : parseInt(input.value);
    
    // Prevent negative numbers
    if (val < 0) {
        val = 0;
        input.value = 0;
    }

    // Update state
    const itemIndex = inventoryData.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        inventoryData[itemIndex][field] = val;
        
        // Calculate new total
        const item = inventoryData[itemIndex];
        const newTotal = (item.floor5 || 0) + (item.floor7 || 0) + (item.booth || 0);
        
        // Update DOM Total visually
        const totalSpan = document.getElementById(`total-${id}`);
        if (totalSpan) {
            totalSpan.textContent = newTotal.toLocaleString();
            if (newTotal === 0) {
                totalSpan.classList.add('zero');
            } else {
                totalSpan.classList.remove('zero');
            }
        }
        
        saveData();
    }
}

function handleQuantityButtonClick(e) {
    const btn = e.currentTarget;
    const isPlus = btn.classList.contains('plus');
    const id = parseInt(btn.getAttribute('data-id'));
    const field = btn.getAttribute('data-field');
    
    const itemIndex = inventoryData.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        let currentVal = inventoryData[itemIndex][field] || 0;
        
        if (isPlus) {
            currentVal += 1;
        } else {
            currentVal -= 1;
            if (currentVal < 0) currentVal = 0;
        }
        
        // Update state
        inventoryData[itemIndex][field] = currentVal;
        
        // Update input visually
        const input = document.querySelector(`.qty-input[data-id="${id}"][data-field="${field}"]`);
        if (input) {
            input.value = currentVal;
        }
        
        // Update DOM Total visually
        const item = inventoryData[itemIndex];
        const newTotal = (item.floor5 || 0) + (item.floor7 || 0) + (item.booth || 0);
        
        const totalSpan = document.getElementById(`total-${id}`);
        if (totalSpan) {
            totalSpan.textContent = newTotal.toLocaleString();
            if (newTotal === 0) {
                totalSpan.classList.add('zero');
            } else {
                totalSpan.classList.remove('zero');
            }
        }
        
        saveData();
    }
}

function handleSearch(e) {
    renderTable(e.target.value);
}

// --- Adjust Modal Logic ---
function openAdjustModal(e) {
    const btn = e.currentTarget;
    const id = parseInt(btn.getAttribute('data-id'));
    const field = btn.getAttribute('data-field');
    
    const item = inventoryData.find(item => item.id === id);
    if (!item) return;

    adjustState.id = id;
    adjustState.field = field;
    adjustState.currentVal = item[field] || 0;
    adjustState.amount = 0;
    adjustState.op = 'add'; // Default to add

    const locationNames = {
        'floor5': '5th Floor',
        'floor7': '7th Floor',
        'booth': 'GLC Booth'
    };

    adjustItemDesc.textContent = item.desc;
    adjustLocationText.textContent = locationNames[field];
    adjustCurrentVal.textContent = adjustState.currentVal.toLocaleString();
    adjustAmountInput.value = '';
    
    updateAdjustModalUI();
    adjustModal.classList.remove('hidden');
    setTimeout(() => adjustAmountInput.focus(), 100);
}

function updateAdjustModalUI() {
    // Update active operation button styling
    adjustOpBtns.forEach(btn => {
        if (btn.getAttribute('data-op') === adjustState.op) {
            btn.classList.add('active');
            if(adjustState.op === 'add') {
                btn.style.background = '#dbeafe';
                btn.style.color = 'var(--color-primary)';
                btn.style.borderColor = '#bfdbfe';
            } else {
                btn.style.background = '#fee2e2';
                btn.style.color = 'var(--color-danger)';
                btn.style.borderColor = '#fecaca';
            }
        } else {
            btn.classList.remove('active');
            btn.style.background = 'var(--color-bg-surface)';
            btn.style.color = 'var(--color-text-muted)';
            btn.style.borderColor = 'var(--color-border)';
        }
    });

    // Calculate new value
    let newVal = adjustState.currentVal;
    if (adjustState.op === 'add') {
        newVal += adjustState.amount;
    } else {
        newVal -= adjustState.amount;
        if (newVal < 0) newVal = 0;
    }
    
    adjustNewVal.textContent = newVal.toLocaleString();
    if (adjustState.op === 'sub') {
        adjustNewVal.style.color = 'var(--color-danger)';
    } else {
        adjustNewVal.style.color = 'var(--color-primary)';
    }
}

function closeAdjustModal() {
    adjustModal.classList.add('hidden');
}

function applyAdjustment() {
    const itemIndex = inventoryData.findIndex(item => item.id === adjustState.id);
    if (itemIndex !== -1) {
        let newVal = adjustState.currentVal;
        if (adjustState.op === 'add') {
            newVal += adjustState.amount;
        } else {
            newVal -= adjustState.amount;
            if (newVal < 0) newVal = 0;
        }
        
        inventoryData[itemIndex][adjustState.field] = newVal;
        saveData();
        renderTable(searchInput.value);
        closeAdjustModal();
    }
}

// Export to CSV
function exportToCSV() {
    // Current date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = new Date().toLocaleDateString(undefined, dateOptions);

    // CSV Header
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `GLC Resource Inventory Report - ${dateString}\r\n\r\n`;
    csvContent += "Description,5th Floor,7th Floor,GLC Booth,Total\r\n";
    
    // Data rows
    inventoryData.forEach(item => {
        const total = (item.floor5 || 0) + (item.floor7 || 0) + (item.booth || 0);
        // Quote description to handle potential commas
        const desc = `"${item.desc.replace(/"/g, '""')}"`;
        const row = [desc, item.floor5, item.floor7, item.booth, total].join(",");
        csvContent += row + "\r\n";
    });

    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Setup Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keyup', handleSearch);
    
    const locationFilter = document.getElementById('locationFilter');
    if (locationFilter) {
        locationFilter.addEventListener('change', updateLocationView);
    }
    

    exportBtn.addEventListener('click', exportToCSV);

    const lockAllBtn = document.getElementById('lockAllBtn');
    const lockAllText = document.getElementById('lockAllText');
    const lockAllIcon = lockAllBtn.querySelector('i');
    
    // Determine initial Lock All state based on data
    let isAllLocked = inventoryData.every(item => item.isLocked);
    if (isAllLocked) {
        lockAllText.textContent = "Unlock All";
        lockAllIcon.className = "ri-lock-unlock-fill";
    }
    
    lockAllBtn.addEventListener('click', () => {
        // Toggle the global lock state
        isAllLocked = !isAllLocked;
        
        // Update all items in the inventory
        inventoryData.forEach(item => {
            item.isLocked = isAllLocked;
        });
        
        saveData();
        renderTable(searchInput.value);
        
        // Update button UI
        if (isAllLocked) {
            lockAllText.textContent = "Unlock All";
            lockAllIcon.className = "ri-lock-unlock-fill";
        } else {
            lockAllText.textContent = "Lock All";
            lockAllIcon.className = "ri-lock-fill";
        }
    });

    // Sorting headers
    document.querySelectorAll('th.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const field = th.dataset.sort;
            if (sortColumn === field) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = field;
                sortDirection = 'asc';
            }
            renderTable(searchInput.value);
        });
    });

    // Adjust Modal events
    closeAdjustModalBtn.addEventListener('click', closeAdjustModal);
    cancelAdjustBtn.addEventListener('click', closeAdjustModal);
    confirmAdjustBtn.addEventListener('click', applyAdjustment);
    
    adjustOpBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            adjustState.op = e.currentTarget.getAttribute('data-op');
            updateAdjustModalUI();
        });
    });
    
    adjustAmountInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        adjustState.amount = isNaN(val) ? 0 : val;
        updateAdjustModalUI();
    });
    
    quickAmtBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const amt = parseInt(e.currentTarget.getAttribute('data-amt'));
            adjustState.amount += amt;
            adjustAmountInput.value = adjustState.amount;
            updateAdjustModalUI();
        });
    });

    adjustModal.addEventListener('click', (e) => {
        if (e.target === adjustModal) {
            closeAdjustModal();
        }
    });

    // --- Category Tabs Setup ---
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.getAttribute('data-category');
            renderTable(searchInput.value);
        });
    });

    // --- Quick Edit Setup ---
    fabQuickEdit.addEventListener('click', () => {
        quickEditModal.classList.remove('hidden');
        quickEditSearch.value = '';
        quickEditSearch.focus();
        quickEditDropdown.classList.add('hidden');
        quickEditForm.classList.add('hidden');
        saveQuickEditBtn.disabled = true;
        currentQuickEditItem = null;
    });

    const closeQE = () => quickEditModal.classList.add('hidden');
    closeQuickEditBtn.addEventListener('click', closeQE);
    cancelQuickEditBtn.addEventListener('click', closeQE);
    
    quickEditSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        quickEditDropdown.innerHTML = '';
        
        if (term.trim() === '') {
            quickEditDropdown.classList.add('hidden');
            return;
        }

        const matches = inventoryData.filter(item => item.desc.toLowerCase().includes(term)).slice(0, 10);
        
        if (matches.length > 0) {
            matches.forEach(item => {
                const div = document.createElement('div');
                div.className = 'dropdown-item';
                div.innerHTML = `
                    <div class="dropdown-item-title">${item.desc}</div>
                    <div class="dropdown-item-category">${item.category}</div>
                `;
                div.addEventListener('click', () => selectQuickEditItem(item));
                quickEditDropdown.appendChild(div);
            });
            quickEditDropdown.classList.remove('hidden');
        } else {
            quickEditDropdown.classList.add('hidden');
        }
    });

    function selectQuickEditItem(item) {
        currentQuickEditItem = JSON.parse(JSON.stringify(item));
        quickEditSearch.value = item.desc;
        quickEditDropdown.classList.add('hidden');
        qeItemDesc.textContent = item.desc;
        qeItemCategory.textContent = item.category;
        qeFloor5.value = item.floor5;
        qeFloor7.value = item.floor7;
        qeBooth.value = item.booth;
        quickEditForm.classList.remove('hidden');
        saveQuickEditBtn.disabled = false;
    }

    qeQtyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.target.closest('.qty-btn');
            const field = button.getAttribute('data-qe-field');
            let input;
            if (field === 'floor5') input = qeFloor5;
            if (field === 'floor7') input = qeFloor7;
            if (field === 'booth') input = qeBooth;

            let val = parseInt(input.value) || 0;
            if (button.classList.contains('plus')) val++;
            if (button.classList.contains('minus')) val = Math.max(0, val - 1);
            
            input.value = val;
            currentQuickEditItem[field] = val;
        });
    });

    [qeFloor5, qeFloor7, qeBooth].forEach(input => {
        input.addEventListener('input', (e) => {
            const val = parseInt(e.target.value) || 0;
            const field = e.target.id === 'qeFloor5' ? 'floor5' : (e.target.id === 'qeFloor7' ? 'floor7' : 'booth');
            currentQuickEditItem[field] = Math.max(0, val);
        });
        input.addEventListener('focus', function() { this.select(); });
    });

    saveQuickEditBtn.addEventListener('click', () => {
        if (!currentQuickEditItem) return;

        currentQuickEditItem.floor5 = Math.max(0, parseInt(qeFloor5.value) || 0);
        currentQuickEditItem.floor7 = Math.max(0, parseInt(qeFloor7.value) || 0);
        currentQuickEditItem.booth = Math.max(0, parseInt(qeBooth.value) || 0);

        const itemIndex = inventoryData.findIndex(item => item.id === currentQuickEditItem.id);
        if (itemIndex !== -1) {
            inventoryData[itemIndex] = currentQuickEditItem;
            saveData();
            renderTable(searchInput.value);
            closeQE();
        }
    });

    document.addEventListener('click', (e) => {
        if (!quickEditSearch.contains(e.target) && !quickEditDropdown.contains(e.target)) {
            quickEditDropdown.classList.add('hidden');
        }
    });
}

// Run app
document.addEventListener('DOMContentLoaded', init);
