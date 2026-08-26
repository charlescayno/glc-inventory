import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update renderTable to highlight low stock
render_table_find = """        const tr = document.createElement('tr');
        if (isLocked) tr.classList.add('locked-row');"""
render_table_replace = """        const tr = document.createElement('tr');
        if (isLocked) tr.classList.add('locked-row');
        // Low stock alert: Total stock <= 5
        if (total <= 5 && !isCashierMode) tr.classList.add('low-stock-row');"""
if 'total <= 5 && !isCashierMode' not in js:
    js = js.replace(render_table_find, render_table_replace)

# 2. Add event listeners and logic for Dashboard
dashboard_logic = """
// ==========================================
// Dashboard / Analytics
// ==========================================
const dashboardBtn = document.getElementById('dashboardBtn');
const dashboardModal = document.getElementById('dashboardModal');
const closeDashboardModalBtn = document.getElementById('closeDashboardModalBtn');
const closeDashboardBottomBtn = document.getElementById('closeDashboardBottomBtn');
let revenueChart = null;
let topItemsChart = null;

if (dashboardBtn) {
    dashboardBtn.addEventListener('click', () => {
        if (isCashierMode) return;
        renderDashboard();
        dashboardModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    });
}
if (closeDashboardModalBtn) {
    closeDashboardModalBtn.addEventListener('click', () => {
        dashboardModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    });
}
if (closeDashboardBottomBtn) {
    closeDashboardBottomBtn.addEventListener('click', () => {
        dashboardModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    });
}

function renderDashboard() {
    if (typeof Chart === 'undefined') return;

    // Process data for charts from receipts
    const dailyRevenue = {};
    const itemSales = {};

    receiptsData.forEach(receipt => {
        if (receipt.isComplimentary) return;
        
        // Group by day (YYYY-MM-DD)
        const date = new Date(receipt.date);
        const dayString = date.toLocaleDateString();
        dailyRevenue[dayString] = (dailyRevenue[dayString] || 0) + (receipt.total || 0);

        receipt.items.forEach(item => {
            itemSales[item.desc] = (itemSales[item.desc] || 0) + (item.qty || 0);
        });
    });

    const revenueLabels = Object.keys(dailyRevenue).sort((a, b) => new Date(a) - new Date(b));
    const revenueData = revenueLabels.map(label => dailyRevenue[label]);

    const sortedItems = Object.entries(itemSales).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const itemLabels = sortedItems.map(item => item[0]);
    const itemData = sortedItems.map(item => item[1]);

    const ctxRev = document.getElementById('revenueChart');
    if (ctxRev) {
        if (revenueChart) revenueChart.destroy();
        revenueChart = new Chart(ctxRev, {
            type: 'line',
            data: {
                labels: revenueLabels,
                datasets: [{
                    label: 'Revenue (₱)',
                    data: revenueData,
                    borderColor: '#009ee2',
                    backgroundColor: 'rgba(0, 158, 226, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    const ctxTop = document.getElementById('topItemsChart');
    if (ctxTop) {
        if (topItemsChart) topItemsChart.destroy();
        topItemsChart = new Chart(ctxTop, {
            type: 'bar',
            data: {
                labels: itemLabels,
                datasets: [{
                    label: 'Quantity Sold',
                    data: itemData,
                    backgroundColor: '#10b981',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true }
                }
            }
        });
    }
}
"""

if 'dashboardBtn' not in js:
    # Append to the end of app.js
    js += '\n' + dashboard_logic

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated app.js")
