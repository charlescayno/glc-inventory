lines=open('old.js','r',encoding='utf-16').readlines()
for i, l in enumerate(lines[540:555]):
    print(f"{i}: {l.encode('ascii','ignore').decode('ascii').strip()}")
