import re
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

matches = re.search(r'<img src="\$\{imgUrl\}".*?/>', js)
if matches:
    print("Found image tag:", matches.group(0))
    # Replace it with a simpler one that doesn't trigger the fallback on error
    new_tag = '<img src="${imgUrl}" alt="" style="width: 32px; height: 42px; object-fit: cover; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); flex-shrink: 0; background: #fff;" />'
    js = js.replace(matches.group(0), new_tag)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Fixed image tag!")
