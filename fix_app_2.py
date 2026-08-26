import re
with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

fix = r"itemsSummary.push(${qty}x );"
code = re.sub(r'itemsSummary\.push\(\$\{qty\}x \);', fix, code)

fix2 = r"title: ${locName} Sale Completed (COMPLIMENTARY),"
code = re.sub(r'title: \$\{locName\} Sale Completed \(COMPLIMENTARY\),', fix2, code)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)
