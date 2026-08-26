import codecs
lines = codecs.open('index_firebase.html', 'r', 'utf-16').readlines()
for i, l in enumerate(lines[100:120]):
    print(f"{i+100}: {l.encode('ascii','ignore').decode('ascii').strip()}")
