import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add Chart.js to head
if 'chart.js' not in html:
    html = html.replace('</head>', '    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n</head>')

# 2. Add Dashboard button next to Export button
dashboard_btn = """                            <button id="dashboardBtn" class="btn btn-icon btn-secondary" title="Dashboard">
                                <i class="ri-bar-chart-box-line"></i>
                                <span class="desktop-only">Dashboard</span>
                            </button>\n"""
if 'id="dashboardBtn"' not in html:
    html = html.replace('<button id="exportBtn"', dashboard_btn + '                            <button id="exportBtn"')

# 3. Add Dashboard Modal HTML
dashboard_modal = """
    <!-- Dashboard Modal -->
    <div id="dashboardModal" class="modal hidden">
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2><i class="ri-bar-chart-box-line" style="color: var(--color-primary); margin-right: 0.5rem;"></i>Analytics Dashboard</h2>
                <button class="close-modal" id="closeDashboardModalBtn"><i class="ri-close-line"></i></button>
            </div>
            <div class="modal-body" style="max-height: 70vh; overflow-y: auto; display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h3 style="margin-bottom: 1rem; color: var(--color-text-main);">Daily Revenue</h3>
                    <div style="position: relative; height: 300px; width: 100%;">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>
                <div>
                    <h3 style="margin-bottom: 1rem; color: var(--color-text-main);">Top Selling Items</h3>
                    <div style="position: relative; height: 300px; width: 100%;">
                        <canvas id="topItemsChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="closeDashboardBottomBtn">Close</button>
            </div>
        </div>
    </div>
"""
if 'id="dashboardModal"' not in html:
    html = html.replace('<!-- Activity Log / History Modal -->', dashboard_modal + '\n    <!-- Activity Log / History Modal -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Added Dashboard to index.html')
