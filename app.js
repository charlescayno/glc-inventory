// Initial Data Extracted from Image
const initialData = [
    { id: 1, desc: "GLC Book 1: English One by One (new)", floor5: 750, floor7: 55, booth: 202 },
    { id: 2, desc: "GLC Book 1: English One by One (old)", floor5: 34, floor7: 0, booth: 0 },
    { id: 3, desc: "GLC Book 2: English Spiritual Disciplines (new)", floor5: 600, floor7: 56, booth: 158 },
    { id: 4, desc: "GLC Book 2: English Spiritual Disciplines (old)", floor5: 105, floor7: 0, booth: 0 },
    { id: 5, desc: "GLC Book 3: English The Holy Spirit", floor5: 750, floor7: 52, booth: 341 },
    { id: 6, desc: "GLC Book 4: English CCF DNA (old)", floor5: 470, floor7: 0, booth: 0 },
    { id: 7, desc: "GLC Book 4: English CCF DNA (new)", floor5: 100, floor7: 80, booth: 192 },
    { id: 8, desc: "GLC Book 5: English Starting Point for small group(new)", floor5: 445, floor7: 50, booth: 45 },
    { id: 9, desc: "GLC Book 5: English Starting Point for small group (old)", floor5: 75, floor7: 39, booth: 93 },
    { id: 10, desc: "GLC Book 6: English Basic Doctrine", floor5: 250, floor7: 42, booth: 178 },
    { id: 11, desc: "GLC Book 7: English The Family Life (new)", floor5: 300, floor7: 15, booth: 147 },
    { id: 12, desc: "GLC Book 7: English The Family Life", floor5: 350, floor7: 21, booth: 33 },
    { id: 13, desc: "GLC Book 9: English The Multiplier", floor5: 282, floor7: 16, booth: 102 },
    { id: 14, desc: "GLC Book 10: Realiability of the Bible", floor5: 250, floor7: 44, booth: 156 },
    { id: 15, desc: "GLC Book 11: Spiritual Warfare", floor5: 400, floor7: 45, booth: 148 },
    { id: 16, desc: "GLC Book 1: Filipino One by One", floor5: 0, floor7: 18, booth: 40 },
    { id: 17, desc: "GLC Book 2: Filipino Spiritual Disciple", floor5: 0, floor7: 1, booth: 6 },
    { id: 18, desc: "GLC Book 4: Filipino CCF DNA", floor5: 370, floor7: 17, booth: 62 },
    { id: 19, desc: "Life Goals Magazine", floor5: 325, floor7: 21, booth: 60 },
    { id: 20, desc: "70X7 Work Books", floor5: 100, floor7: 19, booth: 50 },
    { id: 21, desc: "70X7 USB", floor5: 0, floor7: 0, booth: 0 },
    { id: 22, desc: "Superbook Work Book", floor5: 0, floor7: 0, booth: 112 },
    { id: 23, desc: "Memory Verse Volume 2", floor5: 350, floor7: 31, booth: 78 },
    { id: 24, desc: "Holy Spirit Booklet", floor5: 200, floor7: 45, booth: 63 },
    { id: 25, desc: "Real Talk Booklet", floor5: 1000, floor7: 31, booth: 70 },
    { id: 26, desc: "Motivate English", floor5: 280, floor7: 7, booth: 50 },
    { id: 27, desc: "Motivate Chinese", floor5: 4, floor7: 0, booth: 0 },
    { id: 28, desc: "Dare 2 Share", floor5: 19, floor7: 0, booth: 9 },
    { id: 29, desc: "Dgroup kit", floor5: 0, floor7: 0, booth: 0 },
    { id: 30, desc: "IDC bag Red", floor5: 0, floor7: 0, booth: 0 },
    { id: 31, desc: "IDC Bag Blue", floor5: 60, floor7: 0, booth: 7 },
    { id: 32, desc: "Dj Passport", floor5: 200, floor7: 34, booth: 60 },
    { id: 33, desc: "Discipleship Covenant", floor5: 0, floor7: 0, booth: 194 },
    { id: 34, desc: "PCS Card", floor5: 150, floor7: 350, booth: 179 },
    { id: 35, desc: "Pcs Bookmark", floor5: 0, floor7: 600, booth: 400 },
    { id: 36, desc: "Accountability Card", floor5: 3400, floor7: 1300, booth: 689 },
    { id: 37, desc: "Gospel Tracts English (New)", floor5: 45000, floor7: 1955, booth: 2000 },
    { id: 38, desc: "Gospel Tracts Tagalog (New)", floor5: 45400, floor7: 920, booth: 2400 },
    { id: 39, desc: "Gospel Tracts Elevate", floor5: 0, floor7: 290, booth: 1100 },
    { id: 40, desc: "Heart Of A Champion", floor5: 150, floor7: 10, booth: 30 },
    { id: 41, desc: "True Life Participant Workbook", floor5: 300, floor7: 10, booth: 13 },
    { id: 42, desc: "True Life Facilitator Workbook", floor5: 220, floor7: 25, booth: 66 },
    { id: 43, desc: "2be1 Workbook", floor5: 0, floor7: 3, booth: 21 }
];

// State
let inventoryData = [];
const STORAGE_KEY = 'resource_inventory_data';

// DOM Elements
const inventoryBody = document.getElementById('inventoryBody');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const lastUpdatedEl = document.getElementById('lastUpdated');
const exportBtn = document.getElementById('exportBtn');
const resetBtn = document.getElementById('resetBtn');

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

// Reset Modal Elements
const resetModal = document.getElementById('resetModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelResetBtn = document.getElementById('cancelResetBtn');
const confirmResetBtn = document.getElementById('confirmResetBtn');

// Initialize Application
function init() {
    loadData();
    renderTable();
    updateSummaries();
    setupEventListeners();
    updateLastSavedTime();
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
    const filteredData = inventoryData.filter(item => 
        item.desc.toLowerCase().includes(term)
    );

    if (filteredData.length === 0) {
        inventoryBody.parentElement.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }

    inventoryBody.parentElement.classList.remove('hidden');
    noResults.classList.add('hidden');

    filteredData.forEach(item => {
        const total = (item.floor5 || 0) + (item.floor7 || 0) + (item.booth || 0);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Description"><span class="desc-text">${item.desc}</span></td>
            <td class="col-location" data-label="5th Floor">
                <div class="qty-control">
                    <button class="qty-btn minus" data-id="${item.id}" data-field="floor5"><i class="ri-subtract-line"></i></button>
                    <input type="number" class="qty-input" data-id="${item.id}" data-field="floor5" value="${item.floor5}" min="0">
                    <button class="qty-btn plus" data-id="${item.id}" data-field="floor5"><i class="ri-add-line"></i></button>
                    <button class="qty-btn adjust" data-id="${item.id}" data-field="floor5" title="Adjust"><i class="ri-calculator-line"></i></button>
                </div>
            </td>
            <td class="col-location" data-label="7th Floor">
                <div class="qty-control">
                    <button class="qty-btn minus" data-id="${item.id}" data-field="floor7"><i class="ri-subtract-line"></i></button>
                    <input type="number" class="qty-input" data-id="${item.id}" data-field="floor7" value="${item.floor7}" min="0">
                    <button class="qty-btn plus" data-id="${item.id}" data-field="floor7"><i class="ri-add-line"></i></button>
                    <button class="qty-btn adjust" data-id="${item.id}" data-field="floor7" title="Adjust"><i class="ri-calculator-line"></i></button>
                </div>
            </td>
            <td class="col-location" data-label="GLC Booth">
                <div class="qty-control">
                    <button class="qty-btn minus" data-id="${item.id}" data-field="booth"><i class="ri-subtract-line"></i></button>
                    <input type="number" class="qty-input" data-id="${item.id}" data-field="booth" value="${item.booth}" min="0">
                    <button class="qty-btn plus" data-id="${item.id}" data-field="booth"><i class="ri-add-line"></i></button>
                    <button class="qty-btn adjust" data-id="${item.id}" data-field="booth" title="Adjust"><i class="ri-calculator-line"></i></button>
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
    // CSV Header
    let csvContent = "data:text/csv;charset=utf-8,";
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

// Reset Functionality
function resetAllQuantities() {
    inventoryData = inventoryData.map(item => ({
        ...item,
        floor5: 0,
        floor7: 0,
        booth: 0
    }));
    
    saveData();
    renderTable(searchInput.value); // Re-render with current search term
    closeModal();
}

// Modal Helpers
function openModal() {
    resetModal.classList.remove('hidden');
}

function closeModal() {
    resetModal.classList.add('hidden');
}

// Setup Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    
    exportBtn.addEventListener('click', exportToCSV);
    
    // Reset Modal events
    resetBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelResetBtn.addEventListener('click', closeModal);
    confirmResetBtn.addEventListener('click', resetAllQuantities);
    
    resetModal.addEventListener('click', (e) => {
        if (e.target === resetModal) {
            closeModal();
        }
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
}

// Run app
document.addEventListener('DOMContentLoaded', init);
