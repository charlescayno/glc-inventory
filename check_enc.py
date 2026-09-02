files = ["app.js", "app_firebase.js", "old.js"]
for filename in files:
    with open(filename, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    print(f"--- {filename} ---")
    for i, line in enumerate(lines):
        if 'history-stock-change' in line or 'Set\s+"?' in line or 'on\s+"?' in line:
            if 'oldVal' in line or 'match' in line:
                print(repr(line.strip()))
