import re
with open(r'C:\Users\ccayno\.gemini\antigravity\brain\96f212f0-bcf0-4f47-a072-bcc0c7872826\.system_generated\steps\6247\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

imgs = re.findall(r'https://glc\.ccf\.org\.ph/[^\s"\'\)]+\.(?:jpg|png|webp|jpeg)', text, re.IGNORECASE)
for img in set(imgs):
    print(img)
