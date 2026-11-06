import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Read-only on-screen version of the Excel export (same sort, columns and totals).
// Never writes to Firestore.
const firebaseConfig = {
    apiKey: "AIzaSyATwpPiw_l3WiOAsdGBfU5DAKW3EgiYqBc",
    authDomain: "glc-inventory-cfeb1.firebaseapp.com",
    projectId: "glc-inventory-cfeb1",
    storageBucket: "glc-inventory-cfeb1.firebasestorage.app",
    messagingSenderId: "1010755900202",
    appId: "1:1010755900202:web:8bfce9d1c54cad2ae2c453"
};

const STORAGE_KEY = 'resource_inventory_data';

document.documentElement.setAttribute('data-theme', localStorage.getItem('glc_theme') || 'light');

const body = document.getElementById('summaryTableBody');
document.getElementById('summaryDate').textContent =
    new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

function addCell(tr, text) {
    const td = document.createElement('td');
    td.textContent = text;
    tr.appendChild(td);
}

function render(inventoryData) {
    // Same order as the main inventory table (the "proper order" layout), not alphabetical
    const rows = [...inventoryData];
    const totals = { floor5: 0, floor7: 0, booth: 0, total: 0 };

    body.innerHTML = '';
    rows.forEach(item => {
        const f5 = item.floor5 || 0, f7 = item.floor7 || 0, bo = item.booth || 0;
        totals.floor5 += f5; totals.floor7 += f7; totals.booth += bo; totals.total += f5 + f7 + bo;
        const tr = document.createElement('tr');
        [item.category, item.desc, f5, f7, bo, f5 + f7 + bo].forEach(v => addCell(tr, v));
        body.appendChild(tr);
    });

    const sum = document.createElement('tr');
    sum.className = 'summary-total-row';
    ['', 'Grand Total', totals.floor5, totals.floor7, totals.booth, totals.total].forEach(v => addCell(sum, v));
    body.appendChild(sum);
}

function loadFromLocal() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        if (Array.isArray(saved)) render(saved);
        else body.innerHTML = '<tr><td colspan="6" style="text-align: center;">No inventory data available.</td></tr>';
    } catch (e) {
        body.innerHTML = '<tr><td colspan="6" style="text-align: center;">No inventory data available.</td></tr>';
    }
}

try {
    const db = getFirestore(initializeApp(firebaseConfig));
    onSnapshot(doc(db, 'inventory', 'main'), snap => {
        const data = snap.exists() ? snap.data().data : null;
        if (Array.isArray(data) && data.length) render(data);
        else loadFromLocal();
    }, err => {
        console.error('Summary: Firestore unavailable, using local data.', err);
        loadFromLocal();
    });
} catch (e) {
    loadFromLocal();
}
