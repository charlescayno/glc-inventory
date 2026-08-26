import os

with open('app.js', 'rb') as f:
    raw = f.read()

try:
    decoded = raw.decode('utf-8')
    decoded = decoded.replace('â‚±', '₱')
    decoded = decoded.replace('âœ“', '✓')
    
    with open('app.js', 'w', encoding='utf-8') as out:
        out.write(decoded)
    print('Replaced corrupted chars in app.js')
except Exception as e:
    print(f'Error: {e}')
