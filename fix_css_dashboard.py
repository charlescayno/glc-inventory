import re

with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

low_stock_css = """
/* Low Stock Alert */
.low-stock-row td.col-total {
    color: var(--color-danger);
    font-weight: 700;
}
.low-stock-row {
    background-color: #fff1f2 !important;
}
"""

if '.low-stock-row' not in css:
    css += '\n' + low_stock_css

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated index.css")
