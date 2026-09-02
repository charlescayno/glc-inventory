import json
import urllib.request

old_data = [
    { 'id': 1, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 1: One by One (NEW)', 'price': 50, 'floor5': 550, 'floor7': 68, 'booth': 248 },
    { 'id': 2, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 1: One by One (OLD)', 'price': 50, 'floor5': 0, 'floor7': 0, 'booth': 0 },
    { 'id': 3, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 2: Spiritual Disciplines (NEW)', 'price': 60, 'floor5': 650, 'floor7': 31, 'booth': 100 },
    { 'id': 4, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 2: Spiritual Disciplines (OLD)', 'price': 60, 'floor5': 0, 'floor7': 0, 'booth': 0 },
    { 'id': 5, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 3: The Holy Spirit', 'price': 55, 'floor5': 550, 'floor7': 36, 'booth': 240 },
    { 'id': 6, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 4: CCF DNA (OLD)', 'price': 55, 'floor5': 0, 'floor7': 0, 'booth': 0 },
    { 'id': 7, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 4: CCF DNA (NEW)', 'price': 55, 'floor5': 500, 'floor7': 35, 'booth': 161 },
    { 'id': 8, 'category': 'GLC 2 Books', 'desc': 'GLC Book 5: Starting Point for small group (NEW)', 'price': 65, 'floor5': 264, 'floor7': 34, 'booth': 160 },
    { 'id': 9, 'category': 'GLC 2 Books', 'desc': 'GLC Book 5: Starting Point for small group (OLD)', 'price': 65, 'floor5': 75, 'floor7': 39, 'booth': 44 },
    { 'id': 10, 'category': 'GLC 2 Books', 'desc': 'GLC Book 6: Basic Doctrine', 'price': 85, 'floor5': 200, 'floor7': 21, 'booth': 140 },
    { 'id': 11, 'category': 'GLC 2 Books', 'desc': 'GLC Book 7: The Family Life (NEW)', 'price': 80, 'floor5': 200, 'floor7': 45, 'booth': 112 },
    { 'id': 12, 'category': 'GLC 2 Books', 'desc': 'GLC Book 7: The Family Life (OLD)', 'price': 80, 'floor5': 351, 'floor7': 17, 'booth': 82 },
    { 'id': 13, 'category': 'GLC 3 Books', 'desc': 'GLC Book 9: The Multiplier', 'price': 60, 'floor5': 433, 'floor7': 7, 'booth': 138 },
    { 'id': 14, 'category': 'GLC 3 Books', 'desc': 'GLC Book 10: Reliability of the Bible', 'price': 50, 'floor5': 450, 'floor7': 39, 'booth': 99 },
    { 'id': 15, 'category': 'GLC 3 Books', 'desc': 'GLC Book 11: Spiritual Warfare', 'price': 55, 'floor5': 300, 'floor7': 39, 'booth': 99 },
    { 'id': 16, 'category': 'GLC 1 Books (Filipino)', 'desc': 'GLC Book 1 (Filipino): One by One', 'price': 50, 'floor5': 3, 'floor7': 8, 'booth': 0 },
    { 'id': 17, 'category': 'GLC 1 Books (Filipino)', 'desc': 'GLC Book 2 (Filipino): Spiritual Disciple', 'price': 70, 'floor5': 0, 'floor7': 1, 'booth': 0 },
    { 'id': 18, 'category': 'GLC 1 Books (Filipino)', 'desc': 'GLC Book 4 (Filipino): CCF DNA', 'price': 55, 'floor5': 370, 'floor7': 17, 'booth': 56 },
    { 'id': 19, 'category': 'Booklets & Workbooks', 'desc': 'Life Goals Magazine', 'price': 100, 'floor5': 100, 'floor7': 4, 'booth': 116 },
    { 'id': 20, 'category': 'Booklets & Workbooks', 'desc': '70X7 Workbook', 'price': 100, 'floor5': 200, 'floor7': 19, 'booth': 74 },
    { 'id': 21, 'category': 'Materials', 'desc': '70X7 USB', 'price': 100, 'floor5': 0, 'floor7': 6, 'booth': 17 },
    { 'id': 22, 'category': 'Booklets & Workbooks', 'desc': 'Superbook Workbook', 'price': 100, 'floor5': 50, 'floor7': 0, 'booth': 71 },
    { 'id': 23, 'category': 'Booklets & Workbooks', 'desc': 'Memory Verse Booklet (Volume 2)', 'price': 25, 'floor5': 400, 'floor7': 29, 'booth': 102 },
    { 'id': 24, 'category': 'Booklets & Workbooks', 'desc': 'Holy Spirit Booklet', 'price': 20, 'floor5': 420, 'floor7': 37, 'booth': 135 },
    { 'id': 25, 'category': 'Booklets & Workbooks', 'desc': 'Real Talk Booklet', 'price': 25, 'floor5': 800, 'floor7': 20, 'booth': 211 },
    { 'id': 26, 'category': 'Materials', 'desc': 'Motivate Book (English)', 'price': 250, 'floor5': 430, 'floor7': 3, 'booth': 67 },
    { 'id': 27, 'category': 'Materials', 'desc': 'Motivate Book (Chinese)', 'price': 250, 'floor5': 4, 'floor7': 0, 'booth': 0 },
    { 'id': 28, 'category': 'Tracts', 'desc': 'Dare 2 Share', 'price': 100, 'floor5': 19, 'floor7': 0, 'booth': 5 },
    { 'id': 29, 'category': 'Materials', 'desc': 'Dgroup Kit', 'price': 200, 'floor5': 0, 'floor7': 4, 'booth': 0 },
    { 'id': 30, 'category': 'Materials', 'desc': 'IDC Bag (Color: Red)', 'price': 100, 'floor5': 0, 'floor7': 0, 'booth': 0 },
    { 'id': 31, 'category': 'Materials', 'desc': 'IDC Bag (Color: Blue)', 'price': 100, 'floor5': 50, 'floor7': 0, 'booth': 6 },
    { 'id': 32, 'category': 'Materials', 'desc': 'DJ Passport', 'price': 25, 'floor5': 500, 'floor7': 30, 'booth': 104 },
    { 'id': 33, 'category': 'Materials', 'desc': 'Discipleship Covenant Card', 'price': 2, 'floor5': 0, 'floor7': 30, 'booth': 0 },
    { 'id': 34, 'category': 'Materials', 'desc': 'PCS Card', 'price': 3, 'floor5': 150, 'floor7': 350, 'booth': 74 },
    { 'id': 35, 'category': 'Materials', 'desc': 'PCS Bookmark', 'price': 1, 'floor5': 0, 'floor7': 500, 'booth': 365 },
    { 'id': 36, 'category': 'Materials', 'desc': 'Accountability Card', 'price': 2, 'floor5': 4150, 'floor7': 1277, 'booth': 383 },
    { 'id': 37, 'category': 'Tracts', 'desc': 'Gospel Tract English', 'price': 3, 'floor5': 37000, 'floor7': 2062, 'booth': 2000 },
    { 'id': 38, 'category': 'Tracts', 'desc': 'Gospel Tract Tagalog', 'price': 3, 'floor5': 32600, 'floor7': 486, 'booth': 4800 },
    { 'id': 39, 'category': 'Tracts', 'desc': 'Gospel Tract (Elevate/LMMR)', 'price': 7, 'floor5': 0, 'floor7': 0, 'booth': 0 },
    { 'id': 40, 'category': 'Booklets & Workbooks', 'desc': 'Heart Of A Champion', 'price': 0, 'floor5': 90, 'floor7': 15, 'booth': 42 },
    { 'id': 41, 'category': 'Booklets & Workbooks', 'desc': 'TLR Workbook (Participant)', 'price': 25, 'floor5': 600, 'floor7': 10, 'booth': 11 },
    { 'id': 42, 'category': 'Booklets & Workbooks', 'desc': 'TLR Workbook (Facilitator)', 'price': 25, 'floor5': 520, 'floor7': 25, 'booth': 64 },
    { 'id': 43, 'category': 'Booklets & Workbooks', 'desc': '2Be1 Workbook', 'price': 100, 'floor5': 500, 'floor7': 2, 'booth': 1 },
    { 'id': 44, 'category': 'GLC 3 Books', 'desc': 'GLC Book 12: Leadership Skills', 'price': 0, 'floor5': 0, 'floor7': 0, 'booth': 0 }
]


firestore_values = []
for item in old_data:
    fields = {}
    for k, v in item.items():
        if isinstance(v, int):
            fields[k] = {"integerValue": str(v)}
        elif isinstance(v, float):
            fields[k] = {"doubleValue": v}
        else:
            fields[k] = {"stringValue": v}
    firestore_values.append({"mapValue": {"fields": fields}})

payload = {
    "fields": {
        "data": {
            "arrayValue": {
                "values": firestore_values
            }
        }
    }
}

req = urllib.request.Request(
    'https://firestore.googleapis.com/v1/projects/glc-inventory-cfeb1/databases/(default)/documents/inventory/main?updateMask.fieldPaths=data',
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json'},
    method='PATCH'
)

try:
    with urllib.request.urlopen(req) as response:
        print('Success:', response.status)
except Exception as e:
    print('Error:', e)
    if hasattr(e, 'read'):
        print(e.read().decode())