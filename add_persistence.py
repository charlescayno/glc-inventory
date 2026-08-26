import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add enableIndexedDbPersistence to imports
if 'enableMultiTabIndexedDbPersistence' not in js and 'enableIndexedDbPersistence' not in js:
    js = js.replace('writeBatch } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";', 'writeBatch, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";')

# Add persistence code right after getFirestore(app);
db_init_str = "const db = getFirestore(app);"
persistence_code = """
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
"""
if 'enableIndexedDbPersistence(db)' not in js:
    js = js.replace(db_init_str, persistence_code)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Enabled Firebase offline persistence in app.js")
