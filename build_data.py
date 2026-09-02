import json
import urllib.request

old_data = [
    { 'id': 1, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 1: One by One (NEW)', 'price': 50, 'floor5': 750, 'floor7': 55, 'booth': 202 },
    { 'id': 2, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 1: One by One (OLD)', 'price': 50, 'floor5': 34, 'floor7': 0, 'booth': 0 },
    { 'id': 3, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 2: Spiritual Disciplines (NEW)', 'price': 60, 'floor5': 600, 'floor7': 56, 'booth': 158 },
    { 'id': 4, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 2: Spiritual Disciplines (OLD)', 'price': 60, 'floor5': 105, 'floor7': 0, 'booth': 0 },
    { 'id': 5, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 3: The Holy Spirit', 'price': 55, 'floor5': 750, 'floor7': 52, 'booth': 341 },
    { 'id': 6, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 4: CCF DNA (OLD)', 'price': 55, 'floor5': 470, 'floor7': 0, 'booth': 0 },
    { 'id': 7, 'category': 'GLC 1 Books (English)', 'desc': 'GLC Book 4: CCF DNA (NEW)', 'price': 55, 'floor5': 100, 'floor7': 80, 'booth': 192 },
    { 'id': 8, 'category': 'GLC 2 Books', 'desc': 'GLC Book 5: Starting Point for small group (NEW)', 'price': 65, 'floor5': 445, 'floor7': 50, 'booth': 45 },
    { 'id': 9, 'category': 'GLC 2 Books', 'desc': 'GLC Book 5: Starting Point for small group (OLD)', 'price': 65, 'floor5': 75, 'floor7': 39, 'booth': 93 },
    { 'id': 10, 'category': 'GLC 2 Books', 'desc': 'GLC Book 6: Basic Doctrine', 'price': 85, 'floor5': 250, 'floor7': 42, 'booth': 178 },
    { 'id': 11, 'category': 'GLC 2 Books', 'desc': 'GLC Book 7: The Family Life (NEW)', 'price': 80, 'floor5': 300, 'floor7': 15, 'booth': 147 },
    { 'id': 12, 'category': 'GLC 2 Books', 'desc': 'GLC Book 7: The Family Life (OLD)', 'price': 80, 'floor5': 350, 'floor7': 21, 'booth': 33 },
    { 'id': 13, 'category': 'GLC 2 Books', 'desc': 'GLC Book 9: The Multiplier', 'price': 60, 'floor5': 282, 'floor7': 16, 'booth': 102 },
    { 'id': 14, 'category': 'Other GLC Books', 'desc': 'GLC Book 10: Reliability of the Bible', 'price': 50, 'floor5': 250, 'floor7': 44, 'booth': 156 },
    { 'id': 15, 'category': 'Other GLC Books', 'desc': 'GLC Book 11: Spiritual Warfare', 'price': 55, 'floor5': 400, 'floor7': 45, 'booth': 148 },
    { 'id': 16, 'category': 'GLC 1 Books (Filipino)', 'desc': 'GLC Book 1 (Filipino): One by One', 'price': 50, 'floor5': 0, 'floor7': 18, 'booth': 40 },
    { 'id': 17, 'category': 'GLC 1 Books (Filipino)', 'desc': 'GLC Book 2 (Filipino): Spiritual Disciple', 'price': 70, 'floor5': 0, 'floor7': 1, 'booth': 6 },
    { 'id': 18, 'category': 'GLC 1 Books (Filipino)', 'desc': 'GLC Book 4 (Filipino): CCF DNA', 'price': 55, 'floor5': 370, 'floor7': 17, 'booth': 62 },
    { 'id': 19, 'category': 'Booklets & Workbooks', 'desc': 'Life Goals Magazine', 'price': 100, 'floor5': 325, 'floor7': 21, 'booth': 60 },
    { 'id': 20, 'category': 'Booklets & Workbooks', 'desc': '70X7 Workbook', 'price': 100, 'floor5': 100, 'floor7': 19, 'booth': 50 },
    { 'id': 21, 'category': 'Materials', 'desc': '70X7 USB', 'price': 100, 'floor5': 0, 'floor7': 0, 'booth': 0 },
    { 'id': 22, 'category': 'Booklets & Workbooks', 'desc': 'Superbook Workbook', 'price': 100, 'floor5': 0, 'floor7': 0, 'booth': 112 },
    { 'id': 23, 'category': 'Booklets & Workbooks', 'desc': 'Memory Verse Booklet (Volume 2)', 'price': 25, 'floor5': 350, 'floor7': 31, 'booth': 78 },
    { 'id': 24, 'category': 'Booklets & Workbooks', 'desc': 'Holy Spirit Booklet', 'price': 20, 'floor5': 200, 'floor7': 45, 'booth': 63 },
    { 'id': 25, 'category': 'Booklets & Workbooks', 'desc': 'Real Talk Booklet', 'price': 25, 'floor5': 1000, 'floor7': 31, 'booth': 70 },
    { 'id': 26, 'category': 'Materials', 'desc': 'Motivate Book (English)', 'price': 250, 'floor5': 280, 'floor7': 7, 'booth': 50 },
    { 'id': 27, 'category': 'Materials', 'desc': 'Motivate Book (Chinese)', 'price': 250, 'floor5': 4, 'floor7': 0, 'booth': 0 },
    { 'id': 28, 'category': 'Tracts', 'desc': 'Dare 2 Share', 'price': 100, 'floor5': 19, 'floor7': 0, 'booth': 9 },
    { 'id': 29, 'category': 'Materials', 'desc': 'Dgroup Kit', 'price': 200, 'floor5': 0, 'floor7': 0, 'booth': 0 },
    { 'id': 30, 'category': 'Materials', 'desc': 'IDC Bag (Color: Red)', 'price': 100, 'floor5': 0, 'floor7': 0, 'booth': 0 },
    { 'id': 31, 'category': 'Materials', 'desc': 'IDC Bag (Color: Blue)', 'price': 100, 'floor5': 60, 'floor7': 0, 'booth': 7 },
    { 'id': 32, 'category': 'Materials', 'desc': 'DJ Passport', 'price': 25, 'floor5': 200, 'floor7': 34, 'booth': 60 },
    { 'id': 33, 'category': 'Materials', 'desc': 'Discipleship Covenant Card', 'price': 2, 'floor5': 0, 'floor7': 0, 'booth': 194 },
    { 'id': 34, 'category': 'Materials', 'desc': 'PCS Card', 'price': 3, 'floor5': 150, 'floor7': 350, 'booth': 179 },
    { 'id': 35, 'category': 'Materials', 'desc': 'PCS Bookmark', 'price': 1, 'floor5': 0, 'floor7': 600, 'booth': 400 },
    { 'id': 36, 'category': 'Materials', 'desc': 'Accountability Card', 'price': 2, 'floor5': 3400, 'floor7': 1300, 'booth': 689 },
    { 'id': 37, 'category': 'Tracts', 'desc': 'Gospel Tract English', 'price': 3, 'floor5': 45000, 'floor7': 1955, 'booth': 2000 },
    { 'id': 38, 'category': 'Tracts', 'desc': 'Gospel Tract Tagalog', 'price': 3, 'floor5': 45400, 'floor7': 920, 'booth': 2400 },
    { 'id': 39, 'category': 'Tracts', 'desc': 'Gospel Tract (Elevate/LMMR)', 'price': 7, 'floor5': 0, 'floor7': 290, 'booth': 1100 },
    { 'id': 40, 'category': 'Booklets & Workbooks', 'desc': 'Heart Of A Champion', 'price': 0, 'floor5': 150, 'floor7': 10, 'booth': 30 },
    { 'id': 41, 'category': 'Booklets & Workbooks', 'desc': 'TLR Workbook (Participant)', 'price': 25, 'floor5': 300, 'floor7': 10, 'booth': 13 },
    { 'id': 42, 'category': 'Booklets & Workbooks', 'desc': 'TLR Workbook (Facilitator)', 'price': 25, 'floor5': 220, 'floor7': 25, 'booth': 66 },
    { 'id': 43, 'category': 'Booklets & Workbooks', 'desc': '2Be1 Workbook', 'price': 100, 'floor5': 0, 'floor7': 3, 'booth': 21 }
]

updates = {
    1: [550, 68, 248], 2: [0, 0, 0], 3: [650, 31, 100], 4: [0, 0, 0],
    5: [550, 36, 240], 6: [0, 0, 0], 7: [500, 35, 161], 8: [264, 34, 160],
    9: [75, 39, 44], 10: [200, 21, 140], 11: [200, 45, 112], 12: [351, 17, 82],
    13: [433, 7, 138], 14: [450, 39, 99], 15: [300, 39, 99], 16: [3, 8, 0],
    17: [0, 1, 0], 18: [370, 17, 56], 19: [100, 4, 116], 20: [200, 19, 74],
    21: [0, 6, 17], 22: [50, 0, 71], 23: [400, 29, 102], 24: [420, 37, 135],
    25: [800, 20, 211], 26: [430, 3, 67], 27: [4, 0, 0], 28: [19, 0, 5],
    29: [0, 4, 0], 30: [0, 0, 0], 31: [50, 0, 6], 32: [500, 30, 104],
    33: [0, 30, 0], 34: [150, 350, 74], 35: [0, 500, 365], 36: [4150, 1277, 383],
    37: [37000, 2062, 2000], 38: [32600, 486, 4800], 39: [0, 0, 0],
    40: [90, 15, 42], 41: [600, 10, 11], 42: [520, 25, 64], 43: [500, 2, 1]
}

new_data = []
for item in old_data:
    i = item['id']
    if i in updates:
        item['floor5'] = updates[i][0]
        item['floor7'] = updates[i][1]
        item['booth'] = updates[i][2]
    new_data.append(item)

# Build Firestore Document JSON
# Format: {"fields": {"data": {"arrayValue": {"values": [ {"mapValue": {"fields": {...}}} ]}}}}
firestore_values = []
for item in new_data:
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

# Now update app.js initialData just so the file is synced too
out = 'const initialData = [\n'
for i in new_data:
    out += '    { id: ' + str(i['id']) + ', category: "' + i['category'] + '", desc: "' + i['desc'] + '", price: ' + str(i['price']) + ', floor5: ' + str(i['floor5']) + ', floor7: ' + str(i['floor7']) + ', booth: ' + str(i['booth']) + ' },\n'
out += '];\n'

with open('updated_data.txt', 'w') as f:
    f.write(out)
