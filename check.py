import codecs
f = codecs.open('app_firebase.js', 'r', 'utf-8')
lines = f.readlines()
for i, l in enumerate(lines[525:575]):
    print(f"{i+525}: {l.encode('ascii', 'ignore').decode('ascii').strip()}")
