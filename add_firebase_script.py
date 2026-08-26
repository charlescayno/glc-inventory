import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

firebase_imports = """import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getFirestore, collection, doc, getDoc, setDoc, onSnapshot, writeBatch } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

window.exportToExcel = exportToExcel;

"""

setup_listeners = """
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
"""

if "firebase-firestore" not in app_js:
    app_js = firebase_imports + app_js

if "function setupFirebaseListeners" not in app_js:
    app_js = app_js.replace("function loadData() {", setup_listeners + "\nfunction loadData() {")
    
    # Replace the FIRST loadData(); with setupFirebaseListeners(); in init()
    # Let's find init() block and replace inside it.
    init_match = re.search(r'function init\(\) \{[\s\S]*?loadData\(\);', app_js)
    if init_match:
        app_js = app_js[:init_match.start()] + init_match.group(0).replace('loadData();', 'setupFirebaseListeners();') + app_js[init_match.end():]


# Inject Firebase save calls
app_js = re.sub(
    r'(function saveData\(\) \{[\s\S]*?updateSummaries\(\);\n)',
    r'\1    setDoc(doc(db, "inventory", "main"), { data: inventoryData }).catch(e => console.error("Error saving inventory to Firebase", e));\n',
    app_js
)

app_js = re.sub(
    r'(localStorage\.setItem\(HISTORY_STORAGE_KEY, JSON\.stringify\(historyData\.slice\(0, 100\)\)\);\n)',
    r'\1    setDoc(doc(db, "history", "main"), { data: historyData.slice(0, 100) }).catch(e => console.error("Error saving history to Firebase", e));\n',
    app_js
)

app_js = re.sub(
    r'(localStorage\.setItem\(\'glcReceipts\', JSON\.stringify\(receiptsData\)\);\n)',
    r'\1    setDoc(doc(db, "receipts", "main"), { data: receiptsData }).catch(e => console.error("Error saving receipts to Firebase", e));\n',
    app_js
)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

with open('index.html', 'r', encoding='utf-8') as f:
    index = f.read()

index = index.replace('<script src="app.js"></script>', '<script type="module" src="app.js"></script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index)

print("Firebase injected successfully.")
