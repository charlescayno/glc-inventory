// Pop-out standard calculator (quick calculations). Self-contained: no inventory data is touched.
(function () {
    const fab = document.getElementById('fabCalculator');
    const panel = document.getElementById('calcPanel');
    if (!fab || !panel) return;

    const displayEl = document.getElementById('calcDisplay');
    const exprEl = document.getElementById('calcExpression');
    const keysEl = document.getElementById('calcKeys');
    const closeBtn = document.getElementById('calcCloseBtn');

    const SYMBOLS = { '+': '+', '-': '\u2212', '*': '\u00D7', '/': '\u00F7' };
    const MAX_DIGITS = 16;

    // current: raw entry/result string (no commas). acc/op: pending operation.
    let s;
    let memory = null;

    function reset() {
        s = { current: '0', acc: null, op: null, expr: '', newEntry: true, error: false, lastOp: null, lastOperand: null };
    }
    reset();

    // ---------- number helpers ----------
    function clean(n) {
        // Remove binary float noise (0.1 + 0.2 -> 0.3)
        if (!isFinite(n)) return n;
        return parseFloat(n.toPrecision(15));
    }
    function toStr(n) {
        n = clean(n);
        let str = String(n);
        if (/e/i.test(str)) return str; // very large/small: keep exponent form
        return str;
    }
    function withCommas(str) {
        if (/e/i.test(str)) return str;
        const neg = str.startsWith('-');
        const body = neg ? str.slice(1) : str;
        const [int, frac] = body.split('.');
        const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return (neg ? '-' : '') + grouped + (frac !== undefined ? '.' + frac : '');
    }
    function num() { return parseFloat(s.current); }

    // ---------- rendering ----------
    function render() {
        const text = s.error ? s.current : withCommas(s.current);
        displayEl.textContent = text;
        exprEl.textContent = s.expr;
        const len = text.length;
        displayEl.style.fontSize = len > 16 ? '1.3rem' : len > 12 ? '1.8rem' : len > 9 ? '2.2rem' : '2.75rem';
        keysEl.querySelector('[data-key="MC"]').disabled = memory === null;
        keysEl.querySelector('[data-key="MR"]').disabled = memory === null;
    }

    function setError(msg) {
        s.current = msg;
        s.error = true;
        s.acc = null;
        s.op = null;
        s.newEntry = true;
        s.lastOp = null;
    }

    // ---------- operations ----------
    function apply(a, op, b) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b === 0 ? null : a / b;
        }
        return b;
    }

    function digit(d) {
        if (s.error) reset();
        if (s.newEntry) {
            if (s.op === null && s.expr.endsWith('=')) s.expr = '';
            s.current = d;
            s.newEntry = false;
        } else if (s.current === '0') {
            s.current = d;
        } else if (s.current === '-0') {
            s.current = '-' + d;
        } else if (s.current.replace(/[-.]/g, '').length < MAX_DIGITS) {
            s.current += d;
        }
        render();
    }

    function dot() {
        if (s.error) reset();
        if (s.newEntry) {
            if (s.op === null && s.expr.endsWith('=')) s.expr = '';
            s.current = '0.';
            s.newEntry = false;
        } else if (!s.current.includes('.')) {
            s.current += '.';
        }
        render();
    }

    function operator(op) {
        if (s.error) return;
        if (s.op !== null && s.newEntry) {
            // Changing the operator before typing the next number
            s.op = op;
            s.expr = withCommas(toStr(s.acc)) + ' ' + SYMBOLS[op];
            render();
            return;
        }
        if (s.op !== null) {
            const result = apply(s.acc, s.op, num());
            if (result === null) { setError('Cannot divide by zero'); s.expr = ''; render(); return; }
            s.acc = clean(result);
            s.current = toStr(s.acc);
        } else {
            s.acc = num();
        }
        s.op = op;
        s.expr = withCommas(toStr(s.acc)) + ' ' + SYMBOLS[op];
        s.newEntry = true;
        s.lastOp = null;
        render();
    }

    function equals() {
        if (s.error) return;
        let a, op, b;
        if (s.op !== null) {
            a = s.acc;
            op = s.op;
            b = s.newEntry ? s.acc : num(); // "5 + =" uses 5 as the second operand
            s.lastOp = op;
            s.lastOperand = b;
        } else if (s.lastOp !== null) {
            // Repeated equals: repeat the last operation
            a = num();
            op = s.lastOp;
            b = s.lastOperand;
        } else {
            s.expr = withCommas(s.current) + ' =';
            s.newEntry = true;
            render();
            return;
        }
        const result = apply(a, op, b);
        if (result === null) { setError('Cannot divide by zero'); s.expr = ''; render(); return; }
        s.expr = withCommas(toStr(a)) + ' ' + SYMBOLS[op] + ' ' + withCommas(toStr(b)) + ' =';
        s.current = toStr(result);
        s.acc = null;
        s.op = null;
        s.newEntry = true;
        render();
    }

    function unary(kind) {
        if (s.error) return;
        const x = num();
        let result, label;
        const shown = withCommas(toStr(x));
        if (kind === 'recip') {
            if (x === 0) { setError('Cannot divide by zero'); s.expr = ''; render(); return; }
            result = 1 / x; label = '1/(' + shown + ')';
        } else if (kind === 'square') {
            result = x * x; label = 'sqr(' + shown + ')';
        } else {
            if (x < 0) { setError('Invalid input'); s.expr = ''; render(); return; }
            result = Math.sqrt(x); label = '\u221A(' + shown + ')';
        }
        s.current = toStr(result);
        s.expr = (s.op !== null ? withCommas(toStr(s.acc)) + ' ' + SYMBOLS[s.op] + ' ' : '') + label;
        s.newEntry = true;
        if (s.op === null) s.lastOp = null;
        render();
    }

    function percent() {
        if (s.error) return;
        let result = 0;
        if (s.op !== null) result = clean(s.acc * num() / 100);
        s.current = toStr(result);
        s.expr = withCommas(toStr(s.acc === null ? 0 : s.acc)) + (s.op ? ' ' + SYMBOLS[s.op] : '') + ' ' + withCommas(s.current);
        s.newEntry = false;
        render();
    }

    function negate() {
        if (s.error) return;
        if (s.current === '0') return;
        s.current = s.current.startsWith('-') ? s.current.slice(1) : '-' + s.current;
        if (s.newEntry && s.op === null) s.expr = '';
        render();
    }

    function backspace() {
        if (s.error) { reset(); render(); return; }
        if (s.newEntry) return; // can't edit a result
        const c = s.current;
        s.current = (c.length <= 1 || (c.length === 2 && c.startsWith('-'))) ? '0' : c.slice(0, -1);
        render();
    }

    function clearEntry() {
        if (s.error) { reset(); render(); return; }
        s.current = '0';
        s.newEntry = false;
        if (s.op === null) s.expr = '';
        render();
    }

    function clearAll() { reset(); render(); }

    // ---------- memory ----------
    function memoryOp(k) {
        if (s.error) return;
        const x = num();
        if (k === 'MC') memory = null;
        else if (k === 'MS') memory = x;
        else if (k === 'M+') memory = clean((memory || 0) + x);
        else if (k === 'M-') memory = clean((memory || 0) - x);
        else if (k === 'MR' && memory !== null) { s.current = toStr(memory); s.newEntry = false; }
        if (k !== 'MR') s.newEntry = true;
        render();
    }

    // ---------- key layout ----------
    const LAYOUT = [
        ['MC', 'MR', 'M+', 'M-', 'MS'],
        ['%', 'CE', 'C', '\u232B'],
        ['recip', 'square', 'sqrt', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['neg', '0', '.', '=']
    ];
    const LABELS = { recip: '1/x', square: 'x\u00B2', sqrt: '\u221Ax', neg: '+/\u2212', '/': '\u00F7', '*': '\u00D7', '-': '\u2212' };

    LAYOUT.forEach((row, idx) => {
        const rowEl = document.createElement('div');
        rowEl.className = 'calc-row' + (idx === 0 ? ' calc-memory-row' : '');
        row.forEach(key => {
            const b = document.createElement('button');
            b.type = 'button';
            b.dataset.key = key;
            b.textContent = LABELS[key] || key;
            b.className = 'calc-key';
            if (/^\d$/.test(key) || key === '.' || key === 'neg') b.classList.add('calc-num');
            else if (key === '=') b.classList.add('calc-equals');
            else if (idx === 0) b.classList.add('calc-mem');
            rowEl.appendChild(b);
        });
        keysEl.appendChild(rowEl);
    });

    function press(key) {
        if (/^\d$/.test(key)) return digit(key);
        switch (key) {
            case '.': return dot();
            case '+': case '-': case '*': case '/': return operator(key);
            case '=': return equals();
            case 'recip': return unary('recip');
            case 'square': return unary('square');
            case 'sqrt': return unary('sqrt');
            case '%': return percent();
            case 'neg': return negate();
            case '\u232B': return backspace();
            case 'CE': return clearEntry();
            case 'C': return clearAll();
            case 'MC': case 'MR': case 'M+': case 'M-': case 'MS': return memoryOp(key);
        }
    }

    keysEl.addEventListener('click', e => {
        const b = e.target.closest('.calc-key');
        if (b && !b.disabled) press(b.dataset.key);
    });

    // ---------- open / close ----------
    function open() {
        panel.classList.remove('hidden');
        fab.classList.add('active');
        render();
    }
    function close() {
        panel.classList.add('hidden');
        fab.classList.remove('active');
    }
    fab.addEventListener('click', () => panel.classList.contains('hidden') ? open() : close());
    closeBtn.addEventListener('click', close);

    // ---------- keyboard ----------
    document.addEventListener('keydown', e => {
        if (panel.classList.contains('hidden')) return;
        const t = e.target;
        const typing = t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && !panel.contains(t);
        if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
        // Don't let Enter re-trigger a focused calculator button as well
        const k = e.key;
        let handled = true;
        if (/^\d$/.test(k)) press(k);
        else if (k === '.' || k === ',') press('.');
        else if (k === '+' || k === '-' || k === '*' || k === '/') press(k);
        else if (k === 'x' || k === 'X') press('*');
        else if (k === 'Enter' || k === '=') press('=');
        else if (k === 'Backspace') press('\u232B');
        else if (k === 'Delete') press('CE');
        else if (k === 'c' || k === 'C') press('C');
        else if (k === '%') press('%');
        else if (k === 'Escape') close();
        else handled = false;
        if (handled) e.preventDefault();
    });

    // ---------- dragging (by the title bar; mouse, touch and pen) ----------
    const header = panel.querySelector('.calc-header');
    const POS_KEY = 'glc_calc_pos';

    function clampToViewport(left, top) {
        const w = panel.offsetWidth, h = panel.offsetHeight;
        return {
            left: Math.min(Math.max(0, left), Math.max(0, window.innerWidth - w)),
            top: Math.min(Math.max(0, top), Math.max(0, window.innerHeight - h))
        };
    }
    function placeAt(left, top) {
        const p = clampToViewport(left, top);
        panel.style.left = p.left + 'px';
        panel.style.top = p.top + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
        return p;
    }
    function restorePosition() {
        try {
            const saved = JSON.parse(localStorage.getItem(POS_KEY) || 'null');
            if (saved && isFinite(saved.left) && isFinite(saved.top)) placeAt(saved.left, saved.top);
        } catch (e) { /* ignore bad saved position */ }
    }

    let drag = null;
    header.addEventListener('pointerdown', e => {
        if (e.target.closest('.calc-close')) return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        const r = panel.getBoundingClientRect();
        drag = { dx: e.clientX - r.left, dy: e.clientY - r.top, id: e.pointerId };
        header.setPointerCapture(e.pointerId);
        header.classList.add('dragging');
        e.preventDefault();
    });
    header.addEventListener('pointermove', e => {
        if (!drag || e.pointerId !== drag.id) return;
        placeAt(e.clientX - drag.dx, e.clientY - drag.dy);
    });
    function endDrag(e) {
        if (!drag || e.pointerId !== drag.id) return;
        drag = null;
        header.classList.remove('dragging');
        const r = panel.getBoundingClientRect();
        try { localStorage.setItem(POS_KEY, JSON.stringify({ left: Math.round(r.left), top: Math.round(r.top) })); } catch (err) { /* storage unavailable */ }
    }
    header.addEventListener('pointerup', endDrag);
    header.addEventListener('pointercancel', endDrag);
    // Double-click the title bar to snap back to the default corner
    header.addEventListener('dblclick', e => {
        if (e.target.closest('.calc-close')) return;
        panel.style.left = panel.style.top = panel.style.right = panel.style.bottom = '';
        try { localStorage.removeItem(POS_KEY); } catch (err) { /* ignore */ }
    });
    // Keep the panel on screen if the window is resized / rotated
    window.addEventListener('resize', () => {
        if (panel.style.left) {
            const r = panel.getBoundingClientRect();
            placeAt(r.left, r.top);
        }
    });
    // Position can only be measured/clamped once the panel is visible
    const origOpen = open;
    open = function () { origOpen(); restorePosition(); };

    render();
})();
