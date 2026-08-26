import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

import { getFirestore, collection, doc, getDoc, setDoc, onSnapshot, writeBatch, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";



const firebaseConfig = {

  apiKey: "AIzaSyATwpPiw_l3WiOAsdGBfU5DAKW3EgiYqBc",

  authDomain: "glc-inventory-cfeb1.firebaseapp.com",

  projectId: "glc-inventory-cfeb1",

  storageBucket: "glc-inventory-cfeb1.firebasestorage.app",

  messagingSenderId: "1010755900202",

  appId: "1:1010755900202:web:8bfce9d1c54cad2ae2c453",

  measurementId: "G-0PV43V2H6E"

};



const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);


const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
      } else if (err.code == 'unimplemented') {
          console.warn("The current browser does not support all of the features required to enable persistence.");
      }
  });




window.exportToExcel = exportToExcel;



// Initial Data Extracted from Image

const initialData = [

    { id: 1, category: "GLC 1 Books (English)", desc: "GLC Book 1: One by One (NEW)", price: 50, floor5: 750, floor7: 55, booth: 202 },

    { id: 2, category: "GLC 1 Books (English)", desc: "GLC Book 1: One by One (OLD)", price: 50, floor5: 34, floor7: 0, booth: 0 },

    { id: 3, category: "GLC 1 Books (English)", desc: "GLC Book 2: Spiritual Disciplines (NEW)", price: 60, floor5: 600, floor7: 56, booth: 158 },

    { id: 4, category: "GLC 1 Books (English)", desc: "GLC Book 2: Spiritual Disciplines (OLD)", price: 60, floor5: 105, floor7: 0, booth: 0 },

    { id: 5, category: "GLC 1 Books (English)", desc: "GLC Book 3: The Holy Spirit", price: 55, floor5: 750, floor7: 52, booth: 341 },

    { id: 6, category: "GLC 1 Books (English)", desc: "GLC Book 4: CCF DNA (OLD)", price: 55, floor5: 470, floor7: 0, booth: 0 },

    { id: 7, category: "GLC 1 Books (English)", desc: "GLC Book 4: CCF DNA (NEW)", price: 55, floor5: 100, floor7: 80, booth: 192 },

    { id: 8, category: "GLC 2 Books", desc: "GLC Book 5: Starting Point for small group (NEW)", price: 65, floor5: 445, floor7: 50, booth: 45 },

    { id: 9, category: "GLC 2 Books", desc: "GLC Book 5: Starting Point for small group (OLD)", price: 65, floor5: 75, floor7: 39, booth: 93 },

    { id: 10, category: "GLC 2 Books", desc: "GLC Book 6: Basic Doctrine", price: 85, floor5: 250, floor7: 42, booth: 178 },

    { id: 11, category: "GLC 2 Books", desc: "GLC Book 7: The Family Life (NEW)", price: 80, floor5: 300, floor7: 15, booth: 147 },

    { id: 12, category: "GLC 2 Books", desc: "GLC Book 7: The Family Life (OLD)", price: 80, floor5: 350, floor7: 21, booth: 33 },

    { id: 13, category: "GLC 2 Books", desc: "GLC Book 9: The Multiplier", price: 60, floor5: 282, floor7: 16, booth: 102 },

    { id: 14, category: "Other GLC Books", desc: "GLC Book 10: Reliability of the Bible", price: 50, floor5: 250, floor7: 44, booth: 156 },

    { id: 15, category: "Other GLC Books", desc: "GLC Book 11: Spiritual Warfare", price: 55, floor5: 400, floor7: 45, booth: 148 },

    { id: 16, category: "GLC 1 Books (Filipino)", desc: "GLC Book 1 (Filipino): One by One", price: 50, floor5: 0, floor7: 18, booth: 40 },

    { id: 17, category: "GLC 1 Books (Filipino)", desc: "GLC Book 2 (Filipino): Spiritual Disciple", price: 70, floor5: 0, floor7: 1, booth: 6 },

    { id: 18, category: "GLC 1 Books (Filipino)", desc: "GLC Book 4 (Filipino): CCF DNA", price: 55, floor5: 370, floor7: 17, booth: 62 },

    { id: 19, category: "Booklets & Workbooks", desc: "Life Goals Magazine", price: 100, floor5: 325, floor7: 21, booth: 60 },

    { id: 20, category: "Booklets & Workbooks", desc: "70X7 Workbook", price: 100, floor5: 100, floor7: 19, booth: 50 },

    { id: 21, category: "Materials", desc: "70X7 USB", price: 100, floor5: 0, floor7: 0, booth: 0 },

    { id: 22, category: "Booklets & Workbooks", desc: "Superbook Workbook", price: 100, floor5: 0, floor7: 0, booth: 112 },

    { id: 23, category: "Booklets & Workbooks", desc: "Memory Verse Booklet (Volume 2)", price: 25, floor5: 350, floor7: 31, booth: 78 },

    { id: 24, category: "Booklets & Workbooks", desc: "Holy Spirit Booklet", price: 20, floor5: 200, floor7: 45, booth: 63 },

    { id: 25, category: "Booklets & Workbooks", desc: "Real Talk Booklet", price: 25, floor5: 1000, floor7: 31, booth: 70 },

    { id: 26, category: "Materials", desc: "Motivate Book (English)", price: 250, floor5: 280, floor7: 7, booth: 50 },

    { id: 27, category: "Materials", desc: "Motivate Book (Chinese)", price: 250, floor5: 4, floor7: 0, booth: 0 },

    { id: 28, category: "Tracts", desc: "Dare 2 Share", price: 100, floor5: 19, floor7: 0, booth: 9 },

    { id: 29, category: "Materials", desc: "Dgroup Kit", price: 200, floor5: 0, floor7: 0, booth: 0 },

    { id: 30, category: "Materials", desc: "IDC Bag (Color: Red)", price: 100, floor5: 0, floor7: 0, booth: 0 },

    { id: 31, category: "Materials", desc: "IDC Bag (Color: Blue)", price: 100, floor5: 60, floor7: 0, booth: 7 },

    { id: 32, category: "Materials", desc: "DJ Passport", price: 25, floor5: 200, floor7: 34, booth: 60 },

    { id: 33, category: "Materials", desc: "Discipleship Covenant Card", price: 2, floor5: 0, floor7: 0, booth: 194 },

    { id: 34, category: "Materials", desc: "PCS Card", price: 3, floor5: 150, floor7: 350, booth: 179 },

    { id: 35, category: "Materials", desc: "PCS Bookmark", price: 1, floor5: 0, floor7: 600, booth: 400 },

    { id: 36, category: "Materials", desc: "Accountability Card", price: 2, floor5: 3400, floor7: 1300, booth: 689 },

    { id: 37, category: "Tracts", desc: "Gospel Tract English", price: 3, floor5: 45000, floor7: 1955, booth: 2000 },

    { id: 38, category: "Tracts", desc: "Gospel Tract Tagalog", price: 3, floor5: 45400, floor7: 920, booth: 2400 },

    { id: 39, category: "Tracts", desc: "Gospel Tract (Elevate/LMMR)", price: 7, floor5: 0, floor7: 290, booth: 1100 },

    { id: 40, category: "Booklets & Workbooks", desc: "Heart Of A Champion", price: 0, floor5: 150, floor7: 10, booth: 30 },

    { id: 41, category: "Booklets & Workbooks", desc: "TLR Workbook (Participant)", price: 25, floor5: 300, floor7: 10, booth: 13 },

    { id: 42, category: "Booklets & Workbooks", desc: "TLR Workbook (Facilitator)", price: 25, floor5: 220, floor7: 25, booth: 66 },

    { id: 43, category: "Booklets & Workbooks", desc: "2Be1 Workbook", price: 100, floor5: 0, floor7: 3, booth: 21 }

];



// State

let inventoryData = [];

let currentCategory = 'All';

let isCashierMode = false;

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

const totalValuationEl = document.getElementById('totalValuation');



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



// Stock Transfer Modal Elements

const transferBtn = document.getElementById('transferBtn');

const transferModal = document.getElementById('transferModal');

const closeTransferModalBtn = document.getElementById('closeTransferModalBtn');

const cancelTransferBtn = document.getElementById('cancelTransferBtn');

const confirmTransferBtn = document.getElementById('confirmTransferBtn');

const transferSearch = document.getElementById('transferSearch');

const transferDropdown = document.getElementById('transferDropdown');

const transferSelectedPreview = document.getElementById('transferSelectedPreview');

const transferItemTitle = document.getElementById('transferItemTitle');

const transferItemCategory = document.getElementById('transferItemCategory');

const transferFromLoc = document.getElementById('transferFromLoc');

const transferToLoc = document.getElementById('transferToLoc');

const transferBalancePreview = document.getElementById('transferBalancePreview');

const transferSourceNew = document.getElementById('transferSourceNew');

const transferDestNew = document.getElementById('transferDestNew');

const transferAmountInput = document.getElementById('transferAmountInput');

const transferMaxQty = document.getElementById('transferMaxQty');

const transferMaxBtn = document.getElementById('transferMaxBtn');

const quickTransferBtns = document.querySelectorAll('.quick-transfer-btn:not(#transferMaxBtn)');



let currentTransferItem = null;



// History Modal Elements & Storage

const HISTORY_STORAGE_KEY = 'resource_inventory_history';

const historyBtn = document.getElementById('historyBtn');

const historyModal = document.getElementById('historyModal');

const closeHistoryModalBtn = document.getElementById('closeHistoryModalBtn');

const closeHistoryBottomBtn = document.getElementById('closeHistoryBottomBtn');

const clearHistoryBtn = document.getElementById('clearHistoryBtn');

const historyListContainer = document.getElementById('historyListContainer');

const historyEmpty = document.getElementById('historyEmpty');

let historyData = [];



// Cart / Cashier Elements & State

const cashierCartBar = document.getElementById('cashierCartBar');

const cartCountEl = document.getElementById('cartCount');

const cartBarTotalEl = document.getElementById('cartBarTotal');

const clearCartQuickBtn = document.getElementById('clearCartQuickBtn');

const openCartModalBtn = document.getElementById('openCartModalBtn');



const cartModal = document.getElementById('cartModal');



const receiptModal = document.getElementById('receiptModal');

const receiptPaper = document.getElementById('receiptPaper');

const printReceiptBtn = document.getElementById('printReceiptBtn');

const closeReceiptModalBtn = document.getElementById('closeReceiptModalBtn');

const doneReceiptBtn = document.getElementById('doneReceiptBtn');



const RECEIPTS_STORAGE_KEY = 'glc_receipts_data';

let receiptsData = [];

try {

    const saved = localStorage.getItem(RECEIPTS_STORAGE_KEY);

    receiptsData = saved ? JSON.parse(saved) : [];

} catch(e) { receiptsData = []; }

function saveReceipts() {

    localStorage.setItem(RECEIPTS_STORAGE_KEY, JSON.stringify(receiptsData));

}



const closeCartModalBtn = document.getElementById('closeCartModalBtn');

const closeCartBtn = document.getElementById('closeCartBtn');

const clearCartModalBtn = document.getElementById('clearCartModalBtn');

const cartItemsContainer = document.getElementById('cartItemsContainer');

const cartGrandTotalEl = document.getElementById('cartGrandTotal');

const cashReceivedInput = document.getElementById('cashReceivedInput');

const changeDueDisplay = document.getElementById('changeDueDisplay');

const checkoutDeductBtn = document.getElementById('checkoutDeductBtn');



let cartState = {}; // { [itemId]: quantity }



// Sorting State

let sortColumn = 'desc';

let sortDirection = 'asc'; // 'asc' or 'desc'



// Initialize Application

function init() {

    setupFirebaseListeners();

    loadHistory();

    renderTable();

    updateSummaries();

    updateCartUI();

    setupEventListeners();

    updateLastSavedTime();

    

    // Display Current Date

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    document.getElementById('currentDateDisplay').textContent = new Date().toLocaleDateString(undefined, dateOptions);

}



// Data Management



let isFirebaseInitialized = false;



function setupFirebaseListeners() {

    // Inventory listener

    onSnapshot(doc(db, 'inventory', 'main'), (docSnap) => {

        if (docSnap.exists()) {

            const data = docSnap.data().data;

            if (data && data.length > 0) {

                inventoryData = data;

                console.log('Loaded inventory from Firebase');

            } else {

                console.log('Firebase inventory is empty, loading from localStorage/initialData');

                loadData();

                if (!inventoryData || inventoryData.length === 0) {

                   inventoryData = [...initialData];

                }

                setDoc(doc(db, 'inventory', 'main'), { data: inventoryData })

                    .then(() => console.log('Inventory migrated successfully'))

                    .catch(e => console.error('Migration error:', e));

            }

            renderTable(searchInput.value);

            updateSummaries();

        } else {

            console.log('First time: Migrate from localStorage');

            loadData();

            if (!inventoryData || inventoryData.length === 0) {

                inventoryData = [...initialData];

            }

            setDoc(doc(db, 'inventory', 'main'), { data: inventoryData })

                .then(() => console.log('Inventory migrated successfully'))

                .catch(e => console.error('Migration error:', e));

            renderTable(searchInput.value);

            updateSummaries();

        }

    }, (error) => {

        console.error('Firebase inventory listener error (likely permissions). Falling back to local data.', error);

        loadData();

        if (!inventoryData || inventoryData.length === 0) {

            inventoryData = [...initialData];

        }

        renderTable(searchInput.value);

        updateSummaries();

    });



    // History listener

    onSnapshot(doc(db, 'history', 'main'), (docSnap) => {

        if (docSnap.exists()) {

            historyData = docSnap.data().data || [];

            renderHistory();

        } else {

            loadHistory();

            setDoc(doc(db, 'history', 'main'), { data: historyData }).catch(e => console.error(e));

            renderHistory();

        }

    }, (error) => {

        console.error('Firebase history listener error. Falling back.', error);

        loadHistory();

        renderHistory();

    });



    // Receipts listener

    onSnapshot(doc(db, 'receipts', 'main'), (docSnap) => {

        if (docSnap.exists()) {

            receiptsData = docSnap.data().data || [];

            renderReceiptsList();

        } else {

            // Attempt to load from localStorage if not in firebase

            const savedReceipts = localStorage.getItem('glcReceipts');

            if (savedReceipts) {

                receiptsData = JSON.parse(savedReceipts);

            }

            setDoc(doc(db, 'receipts', 'main'), { data: receiptsData }).catch(e => console.error(e));

            renderReceiptsList();

        }

    }, (error) => {

        console.error('Firebase receipts listener error. Falling back.', error);

        const savedReceipts = localStorage.getItem('glcReceipts');

        if (savedReceipts) {

            receiptsData = JSON.parse(savedReceipts);

        }

        renderReceiptsList();

    });

}



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



function saveData() {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(inventoryData));

    updateLastSavedTime();

    updateSummaries();

    setDoc(doc(db, "inventory", "main"), { data: inventoryData }).catch(e => console.error("Error saving inventory to Firebase", e));

}



function updateLastSavedTime() {

    const now = new Date();

    lastUpdatedEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

}



// Calculate and update top summaries

function updateSummaries() {

    let grandTotal = 0;

    let totalValuation = 0;

    

    inventoryData.forEach(item => {

        const itemTotal = (item.floor5 || 0) + (item.floor7 || 0) + (item.booth || 0);

        grandTotal += itemTotal;

        if (item.price && item.price > 0) {

            totalValuation += itemTotal * item.price;

        }

    });

    

    totalTypesEl.textContent = inventoryData.length;

    grandTotalEl.textContent = grandTotal.toLocaleString();

    if (totalValuationEl) {

        totalValuationEl.textContent = '₱ ' + totalValuation.toLocaleString();

    }

}



// Rendering

function renderTable(searchTerm = '') {

    inventoryBody.innerHTML = '';

    

    const term = searchTerm.toLowerCase();

    let filteredData = inventoryData.filter(item => {

        const matchesSearch = item.desc.toLowerCase().includes(term);

        let matchesCategory = false;

        if (isCashierMode) {

            matchesCategory = (currentCategory === 'All' || item.category === currentCategory) && (item.price > 0);

        } else {

            matchesCategory = (currentCategory === 'All' || item.category === currentCategory);

        }

        return matchesSearch && matchesCategory;

    });



    // Apply Sorting

    filteredData.sort((a, b) => {

        if (sortColumn === 'desc') {

            return sortDirection === 'asc' 

                ? a.desc.localeCompare(b.desc, undefined, { numeric: true, sensitivity: 'base' })

                : b.desc.localeCompare(a.desc, undefined, { numeric: true, sensitivity: 'base' });

        }

        

        let valA, valB;

        if (sortColumn === 'total') {

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

        const controlClass = isLocked ? 'qty-control locked' : 'qty-control';

        const inputDisabled = isLocked ? 'disabled' : '';



        // Stock Alert Badges

        let badgeHtml = '';

        if (total === 0) {

            badgeHtml = '<span class="badge-stock badge-out-of-stock" title="Out of Stock"><i class="ri-close-circle-line"></i> Out of Stock</span>';

        } else if (total < 20) {

            badgeHtml = `<span class="badge-stock badge-low-stock" title="Low Stock: ${total} left"><i class="ri-alert-line"></i> Low: ${total}</span>`;

        }



        // Cashier Cart Controls (Segmented control with -, input, +, calculator)

        const inCartQty = cartState[item.id] || 0;

        const cartControlsHtml = item.price > 0 ? `

            <div class="cashier-cell-content">

                <span class="price-value">

                    ₱ ${item.price}

                </span>

                <div class="qty-control cart-qty-control">

                    <button class="qty-btn minus cart-qty-btn" data-id="${item.id}" data-cart-action="dec" title="Decrease order"><i class="ri-subtract-line"></i></button>

                    <input type="number" class="qty-input cart-qty-input" data-id="${item.id}" value="${inCartQty}" min="0" inputmode="numeric">

                    <button class="qty-btn plus cart-qty-btn" data-id="${item.id}" data-cart-action="inc" title="Add to order"><i class="ri-add-line"></i></button>

                </div>

            </div>

        ` : '<span class="price-value">-</span>';



        const tr = document.createElement('tr');

        if (isLocked) tr.classList.add('locked-row');

        
        // No external images to prevent broken icons
        tr.innerHTML = `
            <td data-label="Description">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <button class="lock-toggle-btn" data-id="${item.id}" title="Toggle Lock">
                        <i class="${lockIcon}" style="color: ${lockColor};"></i>
                    </button>
                    <i class="${iconClass}" style="color: var(--color-primary); margin-right: 0.5rem; font-size: 1.25rem;"></i>
                    <span class="desc-text" style="line-height: 1.2;">
<button class="lock-toggle-btn" data-id="${item.id}" title="Toggle Lock">

                        <i class="${lockIcon}" style="color: ${lockColor};"></i>

                    </button>

                    <i class="${iconClass}" style="color: var(--color-primary); margin-right: 0.5rem;"></i>${item.desc}

                    ${badgeHtml}

                </span>

            </div></td>>

            <td class="col-price hidden-column" data-label="Price">

                ${cartControlsHtml}

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



    // Re-attach input event listeners to inventory inputs

    document.querySelectorAll('.qty-input:not(#adjustAmountInput):not(.cart-qty-input):not(#cashReceivedInput):not(.cart-modal-qty-input)').forEach(input => {

        input.addEventListener('input', handleQuantityChange);

        input.addEventListener('focus', function() { this.select(); });

        input.addEventListener('click', function() { this.select(); });

    });



    // Re-attach input event listeners to cart inputs (typing support in cashier mode)

    document.querySelectorAll('.cart-qty-input').forEach(input => {

        input.addEventListener('input', handleCartQuantityChange);

        input.addEventListener('keyup', handleCartQuantityChange);

        input.addEventListener('change', handleCartQuantityChange);

        input.addEventListener('focus', function() { this.select(); });

        input.addEventListener('click', function() { this.select(); });

        input.addEventListener('blur', function() {

            if (this.value === '' || isNaN(parseInt(this.value, 10))) {

                this.value = 0;

            } else {

                this.value = parseInt(this.value, 10);

            }

        });

    });

    

    // Attach click listeners for inventory plus/minus buttons

    document.querySelectorAll('.qty-btn.plus:not(.cart-qty-btn), .qty-btn.minus:not(.cart-qty-btn)').forEach(btn => {

        btn.addEventListener('click', handleQuantityButtonClick);

    });



    // Attach click listeners for cart plus/minus buttons

    document.querySelectorAll('.cart-qty-btn').forEach(btn => {

        btn.addEventListener('click', handleCartStepClick);

    });



    // Attach click listeners for adjust buttons (both inventory and cart)

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

        const oldVal = inventoryData[itemIndex][field] || 0;

        if (oldVal !== val) {

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

            const locNames = { floor5: '5th Floor', floor7: '7th Floor', booth: 'GLC Booth' };

            logActivity({

                type: 'adjust',

                title: 'Quantity Changed',

                itemDesc: item.desc,

                field: locNames[field] || field,

                oldVal: oldVal,

                newVal: val,

                qtyDiff: val - oldVal

            });

        }

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

        const oldVal = currentVal;

        

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

        const locNames = { floor5: '5th Floor', floor7: '7th Floor', booth: 'GLC Booth' };

        logActivity({

            type: 'adjust',

            title: isPlus ? 'Quantity +1' : 'Quantity -1',

            itemDesc: item.desc,

            field: locNames[field] || field,

            oldVal: oldVal,

            newVal: currentVal,

            qtyDiff: isPlus ? 1 : -1

        });

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

    if (field === 'cart') {

        adjustState.currentVal = cartState[id] || 0;

    } else {

        adjustState.currentVal = item[field] || 0;

    }

    adjustState.amount = 0;

    adjustState.op = 'add'; // Default to add



    const locationNames = {

        'floor5': '5th Floor',

        'floor7': '7th Floor',

        'booth': 'GLC Booth',

        'cart': 'Order / Cart Quantity'

    };



    adjustItemDesc.textContent = item.desc;

    adjustLocationText.textContent = locationNames[field] || field;

    adjustCurrentVal.textContent = adjustState.currentVal.toLocaleString();

    adjustAmountInput.value = '';

    

    updateAdjustModalUI();

    adjustModal.classList.remove('hidden');

        document.body.classList.add('modal-open');

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

        document.body.classList.remove('modal-open');

}



function applyAdjustment() {

    if (adjustState.field === 'cart') {

        let newVal = adjustState.currentVal;

        if (adjustState.op === 'add') {

            newVal += adjustState.amount;

        } else {

            newVal -= adjustState.amount;

            if (newVal < 0) newVal = 0;

        }

        

        if (newVal > 0) {

            cartState[adjustState.id] = newVal;

        } else {

            delete cartState[adjustState.id];

        }

        

        updateCartUI();

        renderTable(searchInput.value);

        closeAdjustModal();

        return;

    }



    const itemIndex = inventoryData.findIndex(item => item.id === adjustState.id);

    if (itemIndex !== -1) {

        let newVal = adjustState.currentVal;

        if (adjustState.op === 'add') {

            newVal += adjustState.amount;

        } else {

            newVal -= adjustState.amount;

            if (newVal < 0) newVal = 0;

        }

        

        const oldVal = inventoryData[itemIndex][adjustState.field];

        inventoryData[itemIndex][adjustState.field] = newVal;

        saveData();

        const locNames = { floor5: '5th Floor', floor7: '7th Floor', booth: 'GLC Booth' };

        const diff = adjustState.op === 'add' ? adjustState.amount : -adjustState.amount;

        logActivity({

            type: 'adjust',

            title: adjustState.op === 'add' ? 'Stock Added' : 'Stock Deducted',

            itemDesc: inventoryData[itemIndex].desc,

            field: locNames[adjustState.field] || adjustState.field,

            oldVal: oldVal,

            newVal: newVal,

            qtyDiff: diff

        });

        renderTable(searchInput.value);

        closeAdjustModal();

    }

}



// Export to Excel using ExcelJS

async function exportToExcel() {

    // Current date

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const dateString = new Date().toLocaleDateString(undefined, dateOptions);



    const workbook = new ExcelJS.Workbook();

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

    sortedData.forEach(item => {

        sumRowData[2] += (item.floor5 || 0);

        sumRowData[3] += (item.floor7 || 0);

        sumRowData[4] += (item.booth || 0);

        sumRowData[5] += ((item.floor5 || 0) + (item.floor7 || 0) + (item.booth || 0));

    });

    

    const sumRow = worksheet.addRow(sumRowData);

    sumRow.font = { bold: true };

    sumRow.getCell(3).alignment = { horizontal: 'center' };

    sumRow.getCell(4).alignment = { horizontal: 'center' };

    sumRow.getCell(5).alignment = { horizontal: 'center' };

    sumRow.getCell(6).alignment = { horizontal: 'center' };



    // Add borders to the table (Starting from row 3)

    const rowCount = worksheet.rowCount;

    for (let i = 3; i <= rowCount; i++) {

        const row = worksheet.getRow(i);

        row.eachCell((cell) => {

            cell.border = {

                top: { style: 'thin' },

                left: { style: 'thin' },

                bottom: { style: 'thin' },

                right: { style: 'thin' }

            };

        });

    }



    // Set column widths for readability

    worksheet.columns = [

        { width: 25 }, // Category

        { width: 55 }, // Description

        { width: 12 }, // 5th Floor

        { width: 12 }, // 7th Floor

        { width: 12 }, // GLC Booth

        { width: 12 }  // Total

    ];



    // Export the file

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = `GLC_Inventory_${new Date().toISOString().split('T')[0]}.xlsx`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}





// Setup Event Listeners

function setupEventListeners() {

    // Theme Toggle Logic

    const themeToggleBtn = document.getElementById('themeToggleBtn');

    const themeIcon = document.getElementById('themeIcon');

    const savedTheme = localStorage.getItem('glc_theme') || 'light';

    

    // Set initial theme

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {

        themeIcon.className = 'ri-sun-line';

    } else {

        themeIcon.className = 'ri-moon-line';

    }



    themeToggleBtn.addEventListener('click', () => {

        const currentTheme = document.documentElement.getAttribute('data-theme');

        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        

        document.documentElement.setAttribute('data-theme', newTheme);

        localStorage.setItem('glc_theme', newTheme);

        

        if (newTheme === 'dark') {

            themeIcon.className = 'ri-sun-line';

        } else {

            themeIcon.className = 'ri-moon-line';

        }

    });



    searchInput.addEventListener('input', handleSearch);

    searchInput.addEventListener('keyup', handleSearch);

    

    const locationFilter = document.getElementById('locationFilter');

    if (locationFilter) {

        locationFilter.addEventListener('change', updateLocationView);

    }

    



    exportBtn.addEventListener('click', exportToExcel);



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

            e.currentTarget.classList.add('active');

            currentCategory = e.currentTarget.getAttribute('data-category');

            renderTable(searchInput.value);

        });

    });



    // --- View Mode Toggle Setup (Inventory Mode <-> Cashier Mode) ---

    function setViewMode(mode) {

        const isCashier = mode === 'cashier';

        isCashierMode = isCashier;



        const invBtn = document.getElementById('viewInventoryBtn');

        const priceBtn = document.getElementById('viewCashierBtn');

        const table = document.getElementById('inventoryTable');

        const locationFilter = document.getElementById('locationFilter');

        

        if (invBtn && priceBtn) {

            if (isCashier) {

                invBtn.classList.remove('active');

                priceBtn.classList.add('active');

                if (table) table.classList.add('viewing-cashier');

                if (locationFilter) locationFilter.disabled = true;

            } else {

                invBtn.classList.add('active');

                priceBtn.classList.remove('active');

                if (table) table.classList.remove('viewing-cashier');

                if (locationFilter) locationFilter.disabled = false;

            }

        }



        updateCartUI();

        renderTable(searchInput.value);

    }



    const viewInventoryBtn = document.getElementById('viewInventoryBtn');

    const viewCashierBtn = document.getElementById('viewCashierBtn');



    if (viewInventoryBtn) {

        viewInventoryBtn.addEventListener('click', () => setViewMode('inventory'));

    }

    if (viewCashierBtn) {

        viewCashierBtn.addEventListener('click', () => setViewMode('cashier'));

    }



    // --- Quick Edit Setup ---

    fabQuickEdit.addEventListener('click', () => {

        quickEditModal.classList.remove('hidden');

        document.body.classList.add('modal-open');

        quickEditSearch.value = '';

        quickEditSearch.focus();

        quickEditDropdown.classList.add('hidden');

        quickEditForm.classList.add('hidden');

        saveQuickEditBtn.disabled = true;

        currentQuickEditItem = null;

    });



    const closeQE = () => quickEditModal.classList.add('hidden');

        document.body.classList.remove('modal-open');

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

            logActivity({

                type: 'quickedit',

                title: 'Quick Edit',

                itemDesc: currentQuickEditItem.desc,

                floor5: currentQuickEditItem.floor5,

                floor7: currentQuickEditItem.floor7,

                booth: currentQuickEditItem.booth

            });

            renderTable(searchInput.value);

            closeQE();

        }

    });



    document.addEventListener('click', (e) => {

        if (!quickEditSearch.contains(e.target) && !quickEditDropdown.contains(e.target)) {

            quickEditDropdown.classList.add('hidden');

        }

        if (!transferSearch.contains(e.target) && !transferDropdown.contains(e.target)) {

            transferDropdown.classList.add('hidden');

        }

    });



    // --- History Modal Setup ---

    historyBtn.addEventListener('click', openHistoryModal);

    closeHistoryModalBtn.addEventListener('click', closeHistoryModal);

    closeHistoryBottomBtn.addEventListener('click', closeHistoryModal);

    clearHistoryBtn.addEventListener('click', clearHistory);

    historyModal.addEventListener('click', (e) => {

        if (e.target === historyModal) closeHistoryModal();

    });



    // --- Stock Transfer Setup ---

    transferBtn.addEventListener('click', () => openTransferModal());

    closeTransferModalBtn.addEventListener('click', closeTransferModal);

    cancelTransferBtn.addEventListener('click', closeTransferModal);

    confirmTransferBtn.addEventListener('click', executeTransfer);



    transferSearch.addEventListener('input', (e) => {

        const term = e.target.value.toLowerCase();

        transferDropdown.innerHTML = '';

        

        if (term.trim() === '') {

            transferDropdown.classList.add('hidden');

            return;

        }



        const matches = inventoryData.filter(item => item.desc.toLowerCase().includes(term)).slice(0, 10);

        

        if (matches.length > 0) {

            matches.forEach(item => {

                const div = document.createElement('div');

                div.className = 'dropdown-item';

                div.innerHTML = `

                    <div class="dropdown-item-title">${item.desc}</div>

                    <div class="dropdown-item-category">${item.category} (Total: ${((item.floor5||0)+(item.floor7||0)+(item.booth||0)).toLocaleString()})</div>

                `;

                div.addEventListener('click', () => selectTransferItem(item));

                transferDropdown.appendChild(div);

            });

            transferDropdown.classList.remove('hidden');

        } else {

            transferDropdown.classList.add('hidden');

        }

    });



    transferFromLoc.addEventListener('change', () => {

        if (transferFromLoc.value === transferToLoc.value) {

            const locs = ['floor5', 'floor7', 'booth'];

            const alt = locs.find(l => l !== transferFromLoc.value);

            if (alt) transferToLoc.value = alt;

        }

        updateTransferBalancePreview();

    });



    transferToLoc.addEventListener('change', () => {

        if (transferFromLoc.value === transferToLoc.value) {

            const locs = ['floor5', 'floor7', 'booth'];

            const alt = locs.find(l => l !== transferToLoc.value);

            if (alt) transferFromLoc.value = alt;

        }

        updateTransferBalancePreview();

    });



    transferAmountInput.addEventListener('input', updateTransferBalancePreview);



    transferMaxBtn.addEventListener('click', () => {

        if (!currentTransferItem) return;

        const available = currentTransferItem[transferFromLoc.value] || 0;

        transferAmountInput.value = available;

        updateTransferBalancePreview();

    });



    quickTransferBtns.forEach(btn => {

        btn.addEventListener('click', (e) => {

            const amt = parseInt(e.currentTarget.getAttribute('data-amt'));

            let current = parseInt(transferAmountInput.value) || 0;

            transferAmountInput.value = current + amt;

            updateTransferBalancePreview();

        });

    });



    transferModal.addEventListener('click', (e) => {

        if (e.target === transferModal) closeTransferModal();

    });



    // --- Cashier Cart & Cashier Setup ---

    clearCartQuickBtn.addEventListener('click', clearCart);

    openCartModalBtn.addEventListener('click', () => {

        renderCartModal();

        cartModal.classList.remove('hidden');

        document.body.classList.add('modal-open');

        setTimeout(() => {

            cashReceivedInput.focus();

            cashReceivedInput.select();

        }, 150);

    });



    closeCartModalBtn.addEventListener('click', () => {

        cartModal.classList.add('hidden');

        document.body.classList.remove('modal-open');

    });

    closeCartBtn.addEventListener('click', () => {

        cartModal.classList.add('hidden');

        document.body.classList.remove('modal-open');

    });

    clearCartModalBtn.addEventListener('click', clearCart);

    

    cashReceivedInput.addEventListener('input', updateChangeDue);

    cashReceivedInput.addEventListener('keyup', updateChangeDue);

    cashReceivedInput.addEventListener('change', updateChangeDue);



    document.querySelectorAll('.quick-cash-btn').forEach(btn => {

        btn.addEventListener('click', (e) => {

            let grandTotal = 0;

            Object.entries(cartState).forEach(([id, qty]) => {

                const item = inventoryData.find(i => i.id === parseInt(id));

                if (item && qty > 0) grandTotal += qty * (item.price || 0);

            });



            if (e.currentTarget.getAttribute('data-exact') === 'true') {

                cashReceivedInput.value = grandTotal;

            } else {

                const addVal = parseFloat(e.currentTarget.getAttribute('data-val')) || 0;

                const currentVal = parseFloat(cashReceivedInput.value) || 0;

                cashReceivedInput.value = currentVal + addVal;

            }

            updateChangeDue();

            cashReceivedInput.focus();

        });

    });



    const checkoutComplimentaryBtn = document.getElementById('checkoutComplimentaryBtn');

    if(checkoutComplimentaryBtn) checkoutComplimentaryBtn.addEventListener('click', checkoutComplimentary);

    checkoutDeductBtn.addEventListener('click', checkoutCartDeduct);



    if(closeReceiptModalBtn) closeReceiptModalBtn.addEventListener('click', () => { receiptModal.classList.add('hidden'); document.body.classList.remove('modal-open'); });

    if(doneReceiptBtn) doneReceiptBtn.addEventListener('click', () => { receiptModal.classList.add('hidden'); document.body.classList.remove('modal-open'); });

    if(printReceiptBtn) printReceiptBtn.addEventListener('click', () => { window.print(); });





    const checkoutLocationSelect = document.getElementById('checkoutLocationSelect');

    if (checkoutLocationSelect) {

        checkoutLocationSelect.addEventListener('change', () => {

            renderCartModal();

        });

    }



    cartModal.addEventListener('click', (e) => {

        if (e.target === cartModal) cartModal.classList.add('hidden');

        document.body.classList.remove('modal-open');

    });

}



// ==========================================

// History Functions

// ==========================================

function loadHistory() {

    try {

        const saved = localStorage.getItem(HISTORY_STORAGE_KEY);

        historyData = saved ? JSON.parse(saved) : [];

        if (!Array.isArray(historyData)) historyData = [];

    } catch (e) {

        historyData = [];

    }

}



function saveHistory() {

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyData.slice(0, 100)));

    setDoc(doc(db, "history", "main"), { data: historyData.slice(0, 100) }).catch(e => console.error("Error saving history to Firebase", e));

}



function logActivity(data, legacyTitle, legacyDesc) {

    let entry;

    if (typeof data === 'object' && data !== null) {

        entry = {

            id: Date.now() + Math.random(),

            timestamp: new Date().toISOString(),

            ...data

        };

    } else {

        entry = {

            id: Date.now() + Math.random(),

            timestamp: new Date().toISOString(),

            type: data,

            title: legacyTitle,

            desc: legacyDesc

        };

    }

    historyData.unshift(entry);

    if (historyData.length > 100) historyData = historyData.slice(0, 100);

    saveHistory();

}



function openHistoryModal() {

    renderHistoryModal();

    historyModal.classList.remove('hidden');

        document.body.classList.add('modal-open');

}



function closeHistoryModal() {

    historyModal.classList.add('hidden');

        document.body.classList.remove('modal-open');

}



function clearHistory() {

    if (confirm("Are you sure you want to clear the activity history?")) {

        historyData = [];

        saveHistory();

        renderHistoryModal();

    }

}



function parseHistoryEntry(rawItem) {

    const item = { ...rawItem };

    let type = item.type || 'adjust';

    let title = item.title;

    let itemDesc = item.itemDesc;

    let qty = item.qty;

    let fromLoc = item.fromLoc;

    let toLoc = item.toLoc;

    let fromLocKey = item.fromLocKey;

    let toLocKey = item.toLocKey;

    let field = item.field;

    let oldVal = item.oldVal;

    let newVal = item.newVal;

    let qtyDiff = item.qtyDiff;

    let items = item.items;

    let totalAmount = item.totalAmount;

    let floor5 = item.floor5;

    let floor7 = item.floor7;

    let booth = item.booth;



    // Detect / parse legacy transfer entries

    if (type === 'transfer' && (!itemDesc || !fromLoc || !toLoc) && item.desc) {

        const match = item.desc.match(/Moved\s+(\d+)x?\s+"?([^"]+?)"?\s+from\s+(.*?)\s+to\s+(.*)/i);

        if (match) {

            qty = qty || parseInt(match[1]);

            itemDesc = itemDesc || match[2];

            fromLoc = fromLoc || match[3];

            toLoc = toLoc || match[4];

        } else {

            itemDesc = itemDesc || item.desc;

        }

    }



    // Detect / parse legacy adjust entries

    if (type === 'adjust' && (!itemDesc || field === undefined) && item.desc) {

        const setMatch = item.desc.match(/Set\s+"?([^"]+?)"?\s+\((.*?)\):\s*(\d+)\s*â†’\s*(\d+)/i);

        if (setMatch) {

            itemDesc = itemDesc || setMatch[1];

            field = field || setMatch[2];

            oldVal = oldVal ?? parseInt(setMatch[3]);

            newVal = newVal ?? parseInt(setMatch[4]);

            qtyDiff = qtyDiff ?? (newVal - oldVal);

        } else {

            const btnMatch = item.desc.match(/([+-]?\d+)\s+on\s+"?([^"]+?)"?\s+\((.*?):\s*(\d+)\s*â†’\s*(\d+)\)/i);

            if (btnMatch) {

                qtyDiff = qtyDiff ?? parseInt(btnMatch[1]);

                itemDesc = itemDesc || btnMatch[2];

                field = field || btnMatch[3];

                oldVal = oldVal ?? parseInt(btnMatch[4]);

                newVal = newVal ?? parseInt(btnMatch[5]);

            } else {

                itemDesc = itemDesc || item.desc;

            }

        }

    }



    // Detect / parse legacy quickedit

    if (type === 'quickedit' && (!itemDesc) && item.desc) {

        const qeMatch = item.desc.match(/Updated\s+"?([^"]+?)"?\s+\(5th:\s*(\d+),\s*7th:\s*(\d+),\s*Booth:\s*(\d+)\)/i);

        if (qeMatch) {

            itemDesc = itemDesc || qeMatch[1];

            floor5 = floor5 ?? parseInt(qeMatch[2]);

            floor7 = floor7 ?? parseInt(qeMatch[3]);

            booth = booth ?? parseInt(qeMatch[4]);

        }

    }



    // Detect / parse legacy sale

    if (type === 'sale' && (!items || totalAmount === undefined) && item.desc) {

        const saleMatch = item.desc.match(/Deducted:\s*(.*?)\s*\|\s*Total:\s*₱?([\d,]+)/i);

        if (saleMatch) {

            items = items || saleMatch[1].split(',').map(s => s.trim());

            totalAmount = totalAmount ?? parseInt(saleMatch[2].replace(/,/g, ''));

        }

    }



    return {

        ...item,

        type,

        title: title || (type === 'transfer' ? 'Stock Transfer' : type === 'sale' ? 'Booth Sale' : type === 'quickedit' ? 'Quick Edit' : 'Stock Adjustment'),

        itemDesc: itemDesc || item.desc || 'Resource Item',

        qty: qty || 1,

        fromLoc: fromLoc || '5th Floor',

        toLoc: toLoc || 'GLC Booth',

        fromLocKey,

        toLocKey,

        field: field || 'Stock',

        oldVal,

        newVal,

        qtyDiff,

        items,

        totalAmount: totalAmount || 0,

        floor5,

        floor7,

        booth

    };

}



function renderHistoryModal() {

    historyListContainer.innerHTML = '';

    if (historyData.length === 0) {

        historyListContainer.classList.add('hidden');

        historyEmpty.classList.remove('hidden');

        return;

    }

    historyListContainer.classList.remove('hidden');

    historyEmpty.classList.add('hidden');



    historyData.forEach(rawItem => {

        const item = parseHistoryEntry(rawItem);

        const date = new Date(item.timestamp);

        const timeFormatted = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ', ' +

            date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });



        const div = document.createElement('div');

        div.className = 'history-item';



        if (item.type === 'transfer') {

            const qty = item.qty || 1;

            const undoButtonHtml = item.isUndone

                ? `<span class="history-undone-badge"><i class="ri-check-line"></i> Undone</span>`

                : `<button class="btn-undo-transfer" data-history-id="${item.id}" title="Undo and revert this stock transfer"><i class="ri-arrow-go-back-line"></i> Undo</button>`;



            div.innerHTML = `

                <div class="history-icon-badge history-icon-transfer">

                    <i class="ri-arrow-left-right-line"></i>

                </div>

                <div class="history-content">

                    <div class="history-header">

                        <span class="history-title">${item.title || 'Stock Transfer'}</span>

                        <div style="display: flex; align-items: center; gap: 0.5rem;">

                            ${undoButtonHtml}

                            <span class="history-time">${timeFormatted}</span>

                        </div>

                    </div>

                    <div class="history-item-desc">${item.itemDesc}</div>

                    <div class="history-route">

                        <span class="history-qty-pill">${qty} ${qty === 1 ? 'unit' : 'units'}</span>

                        <span class="history-loc-badge"><i class="ri-map-pin-line"></i> ${item.fromLoc}</span>

                        <i class="ri-arrow-right-line history-arrow-icon"></i>

                        <span class="history-loc-badge dest"><i class="ri-map-pin-fill"></i> ${item.toLoc}</span>

                    </div>

                </div>

            `;

        } else if (item.type === 'adjust') {

            const isPos = item.qtyDiff >= 0;

            const diffText = item.qtyDiff !== undefined ? (isPos ? `+${item.qtyDiff}` : `${item.qtyDiff}`) : '';

            div.innerHTML = `

                <div class="history-icon-badge history-icon-adjust">

                    <i class="${isPos ? 'ri-add-line' : 'ri-subtract-line'}"></i>

                </div>

                <div class="history-content">

                    <div class="history-header">

                        <span class="history-title">${item.title || 'Stock Adjustment'}</span>

                        <span class="history-time">${timeFormatted}</span>

                    </div>

                    <div class="history-item-desc">${item.itemDesc}</div>

                    <div class="history-route">

                        ${diffText ? `<span class="history-qty-pill ${isPos ? 'pos' : 'neg'}">${diffText}</span>` : ''}

                        <span class="history-loc-badge"><i class="ri-map-pin-line"></i> ${item.field}</span>

                        ${item.oldVal !== undefined && item.newVal !== undefined ? `<span class="history-stock-change">(${item.oldVal} â†’ <strong>${item.newVal}</strong>)</span>` : ''}

                    </div>

                </div>

            `;

        } else if (item.type === 'quickedit') {

            div.innerHTML = `

                <div class="history-icon-badge history-icon-adjust">

                    <i class="ri-edit-2-line"></i>

                </div>

                <div class="history-content">

                    <div class="history-header">

                        <span class="history-title">${item.title || 'Quick Edit'}</span>

                        <span class="history-time">${timeFormatted}</span>

                    </div>

                    <div class="history-item-desc">${item.itemDesc}</div>

                    <div class="history-route">

                        <span class="history-loc-badge">5th Floor: <strong>${item.floor5 ?? 0}</strong></span>

                        <span class="history-loc-badge">7th Floor: <strong>${item.floor7 ?? 0}</strong></span>

                        <span class="history-loc-badge dest">GLC Booth: <strong>${item.booth ?? 0}</strong></span>

                    </div>

                </div>

            `;

        } else if (item.type === 'sale') {

            const saleItems = Array.isArray(item.items) ? item.items.join(', ') : (item.desc || '');

            div.innerHTML = `

                <div class="history-icon-badge history-icon-sale">

                    <i class="ri-shopping-cart-2-line"></i>

                </div>

                <div class="history-content">

                    <div class="history-header">

                        <span class="history-title">${item.title || 'Booth Sale'}</span>

                        <span class="history-time">${timeFormatted}</span>

                    </div>

                    <div class="history-route" style="margin-bottom: 0.35rem;">

                        <span class="history-qty-pill sale">₱ ${(item.totalAmount || 0).toLocaleString()}</span>

                        <span class="history-loc-badge dest"><i class="ri-store-2-line"></i> GLC Booth</span>

                    </div>

                    <div class="history-sale-items">${saleItems}</div>

                </div>

            `;

        } else {

            // Legacy / Fallback entry

            div.innerHTML = `

                <div class="history-icon-badge history-icon-adjust">

                    <i class="ri-history-line"></i>

                </div>

                <div class="history-content">

                    <div class="history-header">

                        <span class="history-title">${item.title || 'Activity'}</span>

                        <span class="history-time">${timeFormatted}</span>

                    </div>

                    <div class="history-desc-legacy">${item.desc || ''}</div>

                </div>

            `;

        }



        // Bind Undo Transfer buttons

        div.querySelectorAll('.btn-undo-transfer').forEach(btn => {

            btn.addEventListener('click', (e) => {

                const hid = parseFloat(e.currentTarget.getAttribute('data-history-id')) || e.currentTarget.getAttribute('data-history-id');

                undoTransfer(hid);

            });

        });



        historyListContainer.appendChild(div);

    });

}



function undoTransfer(historyId) {

    const historyIndex = historyData.findIndex(h => h.id == historyId);

    if (historyIndex === -1) return;



    const rawEntry = historyData[historyIndex];

    const entry = parseHistoryEntry(rawEntry);

    if (entry.type !== 'transfer' || entry.isUndone) return;



    // Find inventory item

    let itemIndex = -1;

    if (entry.itemId) {

        itemIndex = inventoryData.findIndex(i => i.id === entry.itemId);

    }

    if (itemIndex === -1 && entry.itemDesc) {

        itemIndex = inventoryData.findIndex(i => i.desc.toLowerCase() === entry.itemDesc.toLowerCase());

    }



    if (itemIndex === -1) {

        alert("Could not find the original resource item to revert.");

        return;

    }



    const locMap = { '5th Floor': 'floor5', '7th Floor': 'floor7', 'GLC Booth': 'booth' };

    const locNames = { floor5: '5th Floor', floor7: '7th Floor', booth: 'GLC Booth' };



    let fromKey = entry.fromLocKey;

    let toKey = entry.toLocKey;

    if (!fromKey && entry.fromLoc) fromKey = locMap[entry.fromLoc];

    if (!toKey && entry.toLoc) toKey = locMap[entry.toLoc];



    if (!fromKey || !toKey) {

        alert("Invalid location data for undo.");

        return;

    }



    const qty = entry.qty || 1;

    const destStock = inventoryData[itemIndex][toKey] || 0;



    if (destStock < qty) {

        if (!confirm(`Destination (${locNames[toKey] || toKey}) currently only has ${destStock} units in stock (transferred was ${qty}). Reverting will set ${locNames[toKey] || toKey} to 0 and restore ${destStock} units to ${locNames[fromKey] || fromKey}. Proceed?`)) {

            return;

        }

    }



    const actualRevertQty = Math.min(destStock, qty);

    inventoryData[itemIndex][toKey] = Math.max(0, destStock - qty);

    inventoryData[itemIndex][fromKey] = (inventoryData[itemIndex][fromKey] || 0) + actualRevertQty;



    // Mark original transfer as undone

    historyData[historyIndex].isUndone = true;



    saveData();

    logActivity({

        type: 'transfer',

        title: 'Transfer Undone (Reverted)',

        itemId: inventoryData[itemIndex].id,

        itemDesc: inventoryData[itemIndex].desc,

        qty: actualRevertQty,

        fromLocKey: toKey,

        toLocKey: fromKey,

        fromLoc: locNames[toKey] || toKey,

        toLoc: locNames[fromKey] || fromKey,

        fromRemaining: inventoryData[itemIndex][toKey],

        toNew: inventoryData[itemIndex][fromKey],

        isUndone: true // cannot re-undo an undo record

    });



    renderTable(searchInput.value);

    renderHistoryModal();

}



// ==========================================

// Stock Transfer Functions

// ==========================================

function openTransferModal(preselectedId = null) {

    transferModal.classList.remove('hidden');

        document.body.classList.add('modal-open');

    transferSearch.value = '';

    transferDropdown.classList.add('hidden');

    transferAmountInput.value = '1';



    if (preselectedId) {

        const item = inventoryData.find(i => i.id === preselectedId);

        if (item) selectTransferItem(item);

    } else {

        currentTransferItem = null;

        transferSelectedPreview.classList.add('hidden');

        transferBalancePreview.classList.add('hidden');

        confirmTransferBtn.disabled = true;

        confirmTransferBtn.textContent = 'Transfer Stock';

        transferMaxQty.textContent = '0';

        setTimeout(() => transferSearch.focus(), 100);

    }

}



function closeTransferModal() {

    transferModal.classList.add('hidden');

        document.body.classList.remove('modal-open');

}



function selectTransferItem(item) {

    currentTransferItem = JSON.parse(JSON.stringify(item));

    transferSearch.value = item.desc;

    transferDropdown.classList.add('hidden');

    transferItemTitle.textContent = item.desc;

    transferItemCategory.textContent = item.category;

    transferSelectedPreview.classList.remove('hidden');

    transferBalancePreview.classList.remove('hidden');

    updateTransferBalancePreview();

}



function updateTransferBalancePreview() {

    if (!currentTransferItem) {

        confirmTransferBtn.disabled = true;

        transferBalancePreview.classList.add('hidden');

        return;

    }



    const fromLoc = transferFromLoc.value;

    const toLoc = transferToLoc.value;

    const available = currentTransferItem[fromLoc] || 0;

    transferMaxQty.textContent = available.toLocaleString();



    let amount = parseInt(transferAmountInput.value) || 0;

    if (amount < 1) amount = 1;



    const sourceRemaining = available - amount;

    const destCurrent = currentTransferItem[toLoc] || 0;

    const destNew = destCurrent + amount;



    transferSourceNew.textContent = sourceRemaining.toLocaleString();

    transferDestNew.textContent = destNew.toLocaleString();



    if (fromLoc === toLoc) {

        transferSourceNew.style.color = 'var(--color-danger)';

        confirmTransferBtn.disabled = true;

        confirmTransferBtn.textContent = 'Choose Different Locations';

    } else if (sourceRemaining < 0) {

        transferSourceNew.style.color = 'var(--color-danger)';

        confirmTransferBtn.disabled = true;

        confirmTransferBtn.textContent = 'Insufficient Stock';

    } else {

        transferSourceNew.style.color = 'var(--color-text-main)';

        confirmTransferBtn.disabled = false;

        confirmTransferBtn.textContent = `Transfer ${amount} Units`;

    }

}



function executeTransfer() {

    if (!currentTransferItem) return;

    const fromLoc = transferFromLoc.value;

    const toLoc = transferToLoc.value;

    const amount = parseInt(transferAmountInput.value) || 0;



    if (fromLoc === toLoc || amount <= 0) return;



    const locNames = { floor5: '5th Floor', floor7: '7th Floor', booth: 'GLC Booth' };

    const itemIndex = inventoryData.findIndex(i => i.id === currentTransferItem.id);

    if (itemIndex === -1) return;



    const available = inventoryData[itemIndex][fromLoc] || 0;

    if (amount > available) {

        alert(`Cannot transfer ${amount} units. Only ${available} units available on ${locNames[fromLoc]}.`);

        return;

    }



    // Update balances

    inventoryData[itemIndex][fromLoc] = available - amount;

    inventoryData[itemIndex][toLoc] = (inventoryData[itemIndex][toLoc] || 0) + amount;



    saveData();

    logActivity({

        type: 'transfer',

        title: 'Stock Transfer',

        itemId: inventoryData[itemIndex].id,

        itemDesc: inventoryData[itemIndex].desc,

        qty: amount,

        fromLocKey: fromLoc,

        toLocKey: toLoc,

        fromLoc: locNames[fromLoc],

        toLoc: locNames[toLoc],

        fromRemaining: available - amount,

        toNew: (inventoryData[itemIndex][toLoc] || 0) + amount,

        isUndone: false

    });

    renderTable(searchInput.value);

    closeTransferModal();

}



// ==========================================

// Cashier Cart / Cashier Functions

// ==========================================

function handleCartStepClick(e) {

    const btn = e.currentTarget;

    const id = parseInt(btn.getAttribute('data-id'));

    const action = btn.getAttribute('data-cart-action');



    const item = inventoryData.find(i => i.id === id);

    if (!item) return;



    let cur = cartState[id] || 0;



    if (action === 'inc') {

        cur++;

        cartState[id] = cur;

    } else if (action === 'dec') {

        cur = Math.max(0, cur - 1);

        if (cur === 0) {

            delete cartState[id];

        } else {

            cartState[id] = cur;

        }

    }



    // Update cell quantity input in DOM

    const input = document.querySelector(`.cart-qty-input[data-id="${id}"]`);

    if (input) {

        input.value = cur;

    }



    updateCartUI();

}



function handleCartQuantityChange(e) {

    const input = e.target;

    const id = parseInt(input.getAttribute('data-id'));

    const rawVal = input.value.trim();

    

    if (rawVal === '') {

        delete cartState[id];

        updateCartUI();

        return;

    }

    

    let val = parseInt(rawVal, 10);

    if (isNaN(val) || val <= 0) {

        val = 0;

        delete cartState[id];

    } else {

        cartState[id] = val;

    }

    updateCartUI();

}



function updateCartUI() {

    let totalItems = 0;

    let totalBill = 0;



    Object.entries(cartState).forEach(([id, qty]) => {

        const item = inventoryData.find(i => i.id === parseInt(id));

        if (item && qty > 0) {

            totalItems += qty;

            totalBill += qty * (item.price || 0);

        }

    });



    cartCountEl.textContent = totalItems;

    cartBarTotalEl.textContent = '₱ ' + totalBill.toLocaleString();



    // Show floating cart bar only if Cashier mode is active AND totalItems > 0

    if (isCashierMode && totalItems > 0) {

        cashierCartBar.classList.remove('hidden');

    } else {

        cashierCartBar.classList.add('hidden');

    }

}



function clearCart() {

    cartState = {};

    if (cashReceivedInput) cashReceivedInput.value = '';

    updateCartUI();

    renderTable(searchInput.value);

    if (!cartModal.classList.contains('hidden')) {

        renderCartModal();

    }

}



function renderCartModal() {

    cartItemsContainer.innerHTML = '';

    let grandTotal = 0;

    const activeEntries = Object.entries(cartState).filter(([_, qty]) => qty > 0);



    if (activeEntries.length === 0) {

        cartItemsContainer.innerHTML = '<div class="no-results" style="padding: 1.5rem;"><i class="ri-shopping-cart-line" style="font-size: 2rem;"></i><p>Your order is empty. Add items from the cashier.</p></div>';

        cartGrandTotalEl.textContent = '₱ 0';

        checkoutDeductBtn.disabled = true;

        updateChangeDue();

        return;

    }



    checkoutDeductBtn.disabled = false;



    const locSelect = document.getElementById('checkoutLocationSelect');

    const checkoutLoc = locSelect ? locSelect.value : 'booth';

    const locNames = {

        'floor5': '5th Floor',

        'floor7': '7th Floor',

        'booth': 'GLC Booth'

    };

    const locName = locNames[checkoutLoc];



    activeEntries.forEach(([idStr, qty]) => {

        const id = parseInt(idStr);

        const item = inventoryData.find(i => i.id === id);

        if (!item) return;



        const subtotal = qty * (item.price || 0);

        grandTotal += subtotal;



        const row = document.createElement('div');

        row.className = 'cart-item-row';

        row.innerHTML = `

            <div class="cart-item-name">

                <div class="cart-item-title">${item.desc}</div>

                <div class="cart-item-unit-price">₱ ${item.price} each (${locName} stock: ${item[checkoutLoc] || 0})</div>

            </div>

            <div class="cart-stepper">

                <button class="cart-step-btn" data-modal-cart-action="dec" data-id="${item.id}">-</button>

                <input type="number" class="qty-input cart-modal-qty-input" data-id="${item.id}" value="${qty}" min="0" inputmode="numeric">

                <button class="cart-step-btn" data-modal-cart-action="inc" data-id="${item.id}">+</button>

            </div>

            <div class="cart-item-subtotal">₱ ${subtotal.toLocaleString()}</div>

        `;

        cartItemsContainer.appendChild(row);

    });



    cartGrandTotalEl.textContent = '₱ ' + grandTotal.toLocaleString();

    updateChangeDue();



    // Attach step listeners inside modal

    cartItemsContainer.querySelectorAll('.cart-step-btn').forEach(btn => {

        btn.addEventListener('click', (e) => {

            const id = parseInt(e.currentTarget.getAttribute('data-id'));

            const action = e.currentTarget.getAttribute('data-modal-cart-action');

            if (action === 'inc') {

                cartState[id] = (cartState[id] || 0) + 1;

            } else if (action === 'dec') {

                cartState[id] = Math.max(0, (cartState[id] || 0) - 1);

                if (cartState[id] === 0) delete cartState[id];

            }

            updateCartUI();

            renderTable(searchInput.value);

            renderCartModal();

        });

    });



    // Attach typing listeners inside modal

    cartItemsContainer.querySelectorAll('.cart-modal-qty-input').forEach(input => {

        input.addEventListener('input', (e) => {

            const id = parseInt(e.target.getAttribute('data-id'));

            const rawVal = e.target.value.trim();

            if (rawVal === '') {

                delete cartState[id];

            } else {

                let val = parseInt(rawVal, 10);

                if (isNaN(val) || val <= 0) {

                    delete cartState[id];

                } else {

                    cartState[id] = val;

                }

            }

            updateCartUI();

            renderTable(searchInput.value);

            

            // Recompute totals without resetting modal focus

            let modalTotal = 0;

            Object.entries(cartState).forEach(([cId, cQty]) => {

                const cItem = inventoryData.find(i => i.id === parseInt(cId));

                if (cItem && cQty > 0) modalTotal += cQty * (cItem.price || 0);

            });

            cartGrandTotalEl.textContent = '₱ ' + modalTotal.toLocaleString();

            updateChangeDue();

        });

        input.addEventListener('focus', function() { this.select(); });

        input.addEventListener('click', function() { this.select(); });

        input.addEventListener('blur', function() {

            renderCartModal();

        });

    });

}



function updateChangeDue() {

    let grandTotal = 0;

    Object.entries(cartState).forEach(([id, qty]) => {

        const item = inventoryData.find(i => i.id === parseInt(id));

        if (item && qty > 0) {

            grandTotal += qty * (item.price || 0);

        }

    });



    const cashInputVal = cashReceivedInput.value.trim();

    const changeLabelEl = document.getElementById('changeLabel');

    const changeStatusBadge = document.getElementById('changeStatusBadge');



    if (cashInputVal === '') {

        changeDueDisplay.textContent = '₱ 0';

        changeDueDisplay.classList.remove('short');

        if (changeLabelEl) changeLabelEl.textContent = 'Change Due';

        if (changeStatusBadge) {

            changeStatusBadge.textContent = 'Enter cash received';

            changeStatusBadge.className = 'change-status-pill';

        }

        return;

    }



    const cashReceived = parseFloat(cashInputVal) || 0;

    const diff = cashReceived - grandTotal;



    if (diff >= 0) {

        changeDueDisplay.textContent = '₱ ' + diff.toLocaleString();

        changeDueDisplay.classList.remove('short');

        if (changeLabelEl) changeLabelEl.textContent = 'Change Due';

        if (changeStatusBadge) {

            changeStatusBadge.textContent = diff === 0 ? '✓ Exact Amount' : '✓ Change Ready';

            changeStatusBadge.className = 'change-status-pill paid';

        }

    } else {

        const shortAmt = Math.abs(diff);

        changeDueDisplay.textContent = '- ₱ ' + shortAmt.toLocaleString();

        changeDueDisplay.classList.add('short');

        if (changeLabelEl) changeLabelEl.textContent = 'Short / Balance';

        if (changeStatusBadge) {

            changeStatusBadge.textContent = `Needs ₱ ${shortAmt.toLocaleString()} more`;

            changeStatusBadge.className = 'change-status-pill insufficient';

        }

    }

}





function checkoutComplimentary() {

    const activeEntries = Object.entries(cartState).filter(([_, qty]) => qty > 0);

    if (activeEntries.length === 0) return;



    let itemsSummary = [];

    let receiptItems = [];

    let originalBill = 0;



    const locSelect = document.getElementById('checkoutLocationSelect');

    let checkoutLoc = locSelect ? locSelect.value : 'booth';

    let locName = '';

    const locNames = {'floor5': '5th Floor', 'floor7': '7th Floor', 'booth': 'GLC Booth'};

    

    if (isCashierMode) {

        checkoutLoc = 'booth';

        locName = 'GLC Booth';

    } else {

        locName = locNames[checkoutLoc] || 'GLC Booth';

    }



    activeEntries.forEach(([idStr, qty]) => {

        const id = parseInt(idStr);

        const itemIndex = inventoryData.findIndex(i => i.id === id);

        if (itemIndex !== -1) {

            const item = inventoryData[itemIndex];

            const currentStock = item[checkoutLoc] || 0;

            inventoryData[itemIndex][checkoutLoc] = Math.max(0, currentStock - qty);

            

            const itemSubtotal = qty * (item.price || 0);

            originalBill += itemSubtotal;

            itemsSummary.push(`x `);

            receiptItems.push({ desc: item.desc, qty: qty, subtotal: 0 }); // Free on receipt

        }

    });



    saveData();

    logActivity({

        type: 'sale',

        title: `${locName} Sale Completed (COMPLIMENTARY)`,

        items: itemsSummary,

        totalAmount: 0,

        totalQty: itemsSummary.length

    });



    // Generate receipt

    const receiptObj = {

        id: 'TXN-' + Math.floor(Date.now() / 1000) + '-COMP',

        date: new Date().toISOString(),

        location: locName,

        items: receiptItems,

        total: 0,

        cash: 0,

        change: 0,

        isComplimentary: true

    };

    receiptsData.push(receiptObj);

    localStorage.setItem('glcReceipts', JSON.stringify(receiptsData));

    setDoc(doc(db, "receipts", "main"), { data: receiptsData }).catch(e => console.error("Error saving receipts to Firebase", e));



    cartState = {};

    if (cashReceivedInput) cashReceivedInput.value = '';

    updateCartUI();

    renderTable(searchInput.value);

    cartModal.classList.add('hidden');

    document.body.classList.remove('modal-open');

    showNotification('Complimentary checkout successful!', 'success');

    renderHistory();

    renderReceiptsList();

    showReceiptModal(receiptObj);

}



function checkoutCartDeduct() {

    const activeEntries = Object.entries(cartState).filter(([_, qty]) => qty > 0);

    if (activeEntries.length === 0) return;



    let itemsSummary = [];

    let receiptItems = [];

    let totalBill = 0;





    const locSelect = document.getElementById('checkoutLocationSelect');

    let checkoutLoc = locSelect ? locSelect.value : 'booth';

    let locName = '';

    const locNames = {'floor5': '5th Floor', 'floor7': '7th Floor', 'booth': 'GLC Booth'};

    

    if (isCashierMode) {

        checkoutLoc = 'booth';

        locName = 'GLC Booth';

    } else {

        locName = locNames[checkoutLoc] || 'GLC Booth';

    }





    activeEntries.forEach(([idStr, qty]) => {

        const id = parseInt(idStr);

        const itemIndex = inventoryData.findIndex(i => i.id === id);

        if (itemIndex !== -1) {

            const item = inventoryData[itemIndex];

            const currentStock = item[checkoutLoc] || 0;

            inventoryData[itemIndex][checkoutLoc] = Math.max(0, currentStock - qty);

            

            const itemSubtotal = qty * (item.price || 0);

            totalBill += itemSubtotal;

            itemsSummary.push(`${qty}x ${item.desc}`);

            receiptItems.push({ desc: item.desc, qty: qty, subtotal: itemSubtotal });

        }

    });



    const cashInputVal = document.getElementById('cashReceivedInput').value;

    const cashReceived = parseFloat(cashInputVal) || 0;

    const changeDue = Math.max(0, cashReceived - totalBill);



    saveData();

    logActivity({

        type: 'sale',

        title: `${locName} Sale Completed`,

        items: itemsSummary,

        totalAmount: totalBill,

        totalQty: itemsSummary.length

    });



    // Generate receipt

    const receiptObj = {

        id: 'TXN-' + Math.floor(Date.now() / 1000),

        date: new Date().toISOString(),

        location: locName,

        items: receiptItems,

        total: totalBill,

        cash: cashReceived,

        change: changeDue

    };

    receiptsData.push(receiptObj);

    saveReceipts();



    clearCart();

    cartModal.classList.add('hidden');

    document.body.classList.remove('modal-open');

    renderTable(searchInput.value);

    

    showReceiptModal(receiptObj);

}



function showReceiptModal(receipt) {

    let d = new Date(receipt.date);

    let html = `

        <h3>GLC Inventory</h3>

        <p>Location: ${receipt.location}</p>

        <p>Date: ${d.toLocaleString()}</p>

        <p>TXN: ${receipt.id}</p>

        <div class="receipt-divider"></div>

    `;

    

    receipt.items.forEach(item => {

        html += `

            <div class="receipt-item">

                <div class="receipt-item-name">

                    <span class="receipt-item-qty">${item.qty}x</span>${item.desc}

                </div>

                <div>₱${item.subtotal.toLocaleString()}</div>

            </div>

        `;

    });

    

    html += `

        <div class="receipt-divider"></div>

        <div class="receipt-totals">

            <div class="receipt-total-row">

                <span>TOTAL DUE</span>

                <span>₱${receipt.total.toLocaleString()}</span>

            </div>

            <div class="receipt-total-row sub">

                <span>CASH</span>

                <span>₱${receipt.cash.toLocaleString()}</span>

            </div>

            <div class="receipt-total-row sub">

                <span>CHANGE</span>

                <span>₱${receipt.change.toLocaleString()}</span>

            </div>

        </div>

        <div class="receipt-divider"></div>

        <p>Thank you for your purchase!</p>

    `;

    

    if (receiptPaper) receiptPaper.innerHTML = html;

    if (receiptModal) {

        receiptModal.classList.remove('hidden');

        document.body.classList.add('modal-open');

    }

}





// ==========================================

// Progressive Web App (PWA) Registration

// ==========================================

let deferredInstallPrompt = null;



function initPWA() {

    // 1. Register Service Worker

    if ('serviceWorker' in navigator) {

        window.addEventListener('load', () => {

            navigator.serviceWorker.register('./sw.js')

                .then(reg => {

                    console.log('[PWA] Service Worker registered successfully:', reg.scope);

                })

                .catch(err => {

                    console.warn('[PWA] Service Worker registration failed:', err);

                });

        });

    }



    // 2. Capture install prompt

    const installBtn = document.getElementById('installPwaBtn');

    if (installBtn) {

        window.addEventListener('beforeinstallprompt', (e) => {

            e.preventDefault();

            deferredInstallPrompt = e;

            installBtn.classList.remove('hidden');

        });



        installBtn.addEventListener('click', async () => {

            if (!deferredInstallPrompt) return;

            deferredInstallPrompt.prompt();

            const choiceResult = await deferredInstallPrompt.userChoice;

            console.log(`[PWA] User install choice: ${choiceResult.outcome}`);

            deferredInstallPrompt = null;

            installBtn.classList.add('hidden');

        });



        window.addEventListener('appinstalled', () => {

            deferredInstallPrompt = null;

            installBtn.classList.add('hidden');

            console.log('[PWA] GLC Inventory app installed successfully!');

        });

    }

}



// Run app

document.addEventListener('DOMContentLoaded', () => {

    init();

    initPWA();

});





// ==========================================
// Dashboard / Analytics
// ==========================================
const dashboardBtn = document.getElementById('dashboardBtn');
const dashboardModal = document.getElementById('dashboardModal');
const closeDashboardModalBtn = document.getElementById('closeDashboardModalBtn');
const closeDashboardBottomBtn = document.getElementById('closeDashboardBottomBtn');
let revenueChart = null;
let topItemsChart = null;

if (dashboardBtn) {
    dashboardBtn.addEventListener('click', () => {
        if (isCashierMode) return;
        renderDashboard();
        dashboardModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    });
}
if (closeDashboardModalBtn) {
    closeDashboardModalBtn.addEventListener('click', () => {
        dashboardModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    });
}
if (closeDashboardBottomBtn) {
    closeDashboardBottomBtn.addEventListener('click', () => {
        dashboardModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    });
}

function renderDashboard() {
    if (typeof Chart === 'undefined') return;

    // Process data for charts from receipts
    const dailyRevenue = {};
    const itemSales = {};

    receiptsData.forEach(receipt => {
        if (receipt.isComplimentary) return;
        
        // Group by day (YYYY-MM-DD)
        const date = new Date(receipt.date);
        const dayString = date.toLocaleDateString();
        dailyRevenue[dayString] = (dailyRevenue[dayString] || 0) + (receipt.total || 0);

        receipt.items.forEach(item => {
            itemSales[item.desc] = (itemSales[item.desc] || 0) + (item.qty || 0);
        });
    });

    const revenueLabels = Object.keys(dailyRevenue).sort((a, b) => new Date(a) - new Date(b));
    const revenueData = revenueLabels.map(label => dailyRevenue[label]);

    const sortedItems = Object.entries(itemSales).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const itemLabels = sortedItems.map(item => item[0]);
    const itemData = sortedItems.map(item => item[1]);

    const ctxRev = document.getElementById('revenueChart');
    if (ctxRev) {
        if (revenueChart) revenueChart.destroy();
        revenueChart = new Chart(ctxRev, {
            type: 'line',
            data: {
                labels: revenueLabels,
                datasets: [{
                    label: 'Revenue (₱)',
                    data: revenueData,
                    borderColor: '#009ee2',
                    backgroundColor: 'rgba(0, 158, 226, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    const ctxTop = document.getElementById('topItemsChart');
    if (ctxTop) {
        if (topItemsChart) topItemsChart.destroy();
        topItemsChart = new Chart(ctxTop, {
            type: 'bar',
            data: {
                labels: itemLabels,
                datasets: [{
                    label: 'Quantity Sold',
                    data: itemData,
                    backgroundColor: '#10b981',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true }
                }
            }
        });
    }
}


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
