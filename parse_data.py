import json

data = json.load(open('data.json'))

out = 'const initialData = [\n'
for i in data:
    out += '    { id: ' + str(i['id']) + ', category: "' + i['category'] + '", desc: "' + i['desc'] + '", price: ' + str(i['price']) + ', floor5: ' + str(i['floor5']) + ', floor7: ' + str(i['floor7']) + ', booth: ' + str(i['booth']) + ' },\n'
out += '];'

with open('updated_data.txt', 'w') as f:
    f.write(out)