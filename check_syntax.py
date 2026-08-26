import re
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

literals = js.count('`')
print(f"Number of backticks: {literals}")
if literals % 2 != 0:
    print("WARNING: Odd number of backticks found. A template literal is unclosed.")

matches = re.search(r'tr\.innerHTML = `(.*?)`;', js, re.DOTALL)
if matches:
    print("Found tr.innerHTML:")
    # print(matches.group(1)[:200])
else:
    print("Could not find tr.innerHTML")
