import re
with open('index.html', 'r', encoding='utf-8') as f:
    code = f.read()

fix = r'''<div class="cart-footer-actions">
                    <button class="btn btn-secondary" id="closeCartBtn">Close</button>
                    <button class="btn btn-secondary" id="checkoutComplimentaryBtn" style="background-color: var(--color-warning); color: white; border: none;">
                        <i class="ri-gift-line"></i> Complimentary
                    </button>
                    <button class="btn btn-checkout-finalize" id="checkoutDeductBtn">
                        <i class="ri-checkbox-circle-line"></i> Finalize & Deduct
                    </button>
                </div>'''

code = re.sub(r'<div class="cart-footer-actions">.*?</div>', fix, code, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(code)
