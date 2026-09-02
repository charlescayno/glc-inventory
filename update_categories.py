with open('app.js', 'r') as f:
    lines = f.readlines()

for i in range(len(lines)):
    if 'GLC Book 9: The Multiplier' in lines[i]:
        lines[i] = lines[i].replace('"GLC 2 Books"', '"GLC 3 Books"')
    if 'GLC Book 10: Reliability of the Bible' in lines[i]:
        lines[i] = lines[i].replace('"Other GLC Books"', '"GLC 3 Books"')
    if 'GLC Book 11: Spiritual Warfare' in lines[i]:
        lines[i] = lines[i].replace('"Other GLC Books"', '"GLC 3 Books"')

with open('app.js', 'w') as f:
    f.writelines(lines)