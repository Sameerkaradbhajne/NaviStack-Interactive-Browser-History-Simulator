// State
let backStack = [];
let forwardStack = [];
let currentPage = null;

// DOM Elements
const urlInput = document.getElementById('urlInput');
const visitBtn = document.getElementById('visitBtn');
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const currentPageDisplay = document.getElementById('currentPageDisplay');
const backStackCount = document.getElementById('backStackCount');
const forwardStackCount = document.getElementById('forwardStackCount');
const backStackBody = document.getElementById('backStackBody');
const forwardStackBody = document.getElementById('forwardStackBody');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const toastContainer = document.getElementById('toastContainer');

const themeIconLight = document.querySelector('.theme-icon-light');
const themeIconDark = document.querySelector('.theme-icon-dark');
const themeToggleText = document.getElementById('themeToggleText');

// Icons 
const HistoryPushIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`;

// Core Logic
function visitPage(url) {
    let cleanUrl = url.trim();
    if (!cleanUrl) {
        showToast('Please enter a valid URL', 'error');
        return;
    }
    
    // Auto format url for aesthetics
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = cleanUrl;
    }

    if (currentPage) {
        backStack.push(currentPage);
    }
    
    // Clear forward stack on new visit
    forwardStack = [];
    currentPage = cleanUrl;
    
    urlInput.value = '';
    
    updateUI();
    showToast(`Visited: ${cleanUrl}`);
}

function goBack() {
    if (backStack.length === 0) return;
    
    forwardStack.push(currentPage);
    currentPage = backStack.pop();
    
    updateUI();
    showToast(`Navigated Back to: ${currentPage}`);
}

function goForward() {
    if (forwardStack.length === 0) return;
    
    backStack.push(currentPage);
    currentPage = forwardStack.pop();
    
    updateUI();
    showToast(`Navigated Forward to: ${currentPage}`);
}

function clearHistory() {
    backStack = [];
    forwardStack = [];
    currentPage = null;
    updateUI();
    showToast('Browser history cleared');
}

// UI Updates
function updateUI() {
    // Current Page
    if (currentPage) {
        currentPageDisplay.innerHTML = `<span style="color: var(--primary)">${currentPage}</span>`;
    } else {
        currentPageDisplay.innerHTML = `<div class="empty-state">No page currently visited</div>`;
    }

    // Button states
    backBtn.disabled = backStack.length === 0;
    forwardBtn.disabled = forwardStack.length === 0;

    // Badges
    backStackCount.textContent = backStack.length;
    forwardStackCount.textContent = forwardStack.length;

    // Stack Tables
    renderStack(backStackBody, backStack, 'Stored');
    renderStack(forwardStackBody, forwardStack, 'Stored'); 
}

function renderStack(tbodyElement, stackContent, tagLabel) {
    tbodyElement.innerHTML = '';
    
    if (stackContent.length === 0) {
        tbodyElement.innerHTML = `<tr><td colspan="3" class="empty-row">Stack is currently empty</td></tr>`;
        return;
    }

    // Render from top of stack to bottom (reverse order array)
    const reversedStack = [...stackContent].reverse();
    
    reversedStack.forEach((url, index) => {
        // Actual index at the bottom of the stack
        const actualIndex = stackContent.length - 1 - index;
        
        const tr = document.createElement('tr');
        tr.style.animationDelay = `${index * 0.05}s`;
        
        // Use a badge style depending on visual preference
        const badgeClass = 'push';
        
        tr.innerHTML = `
            <td>#${actualIndex}</td>
            <td>${url}</td>
            <td><span class="type-badge ${badgeClass}">${HistoryPushIcon} ${tagLabel}</span></td>
        `;
        tbodyElement.appendChild(tr);
    });
}

// Utils
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    
    let icon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    
    if (type === 'info') {
        icon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    }
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        themeIconLight.style.display = 'none';
        themeIconDark.style.display = 'block';
        themeToggleText.textContent = 'Light Mode';
    } else {
        themeIconLight.style.display = 'block';
        themeIconDark.style.display = 'none';
        themeToggleText.textContent = 'Dark Mode';
    }
}

// Stats Variables
let totalVisits = 0;
let totalBacks = 0;
let totalForwards = 0;

// Event Listeners
visitBtn.addEventListener('click', () => {
    visitPage(urlInput.value);
    totalVisits++;
    updateAnalytics();
});

urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        visitPage(urlInput.value);
        totalVisits++;
        updateAnalytics();
    }
});

backBtn.addEventListener('click', () => {
    goBack();
    totalBacks++;
    updateAnalytics();
});

forwardBtn.addEventListener('click', () => {
    goForward();
    totalForwards++;
    updateAnalytics();
});

themeToggleBtn.addEventListener('click', toggleTheme);

clearHistoryBtn.addEventListener('click', () => {
    clearHistory();
    totalVisits = 0;
    totalBacks = 0;
    totalForwards = 0;
    updateAnalytics();
});

// View Switching
const dashboardContent = document.getElementById('dashboardView');
const analyticsContent = document.getElementById('analyticsView');

function switchView(view) {
    if (view === 'dashboard') {
        document.getElementById('menuDashboard').classList.add('active');
        document.getElementById('menuAnalytics').classList.remove('active');
        dashboardContent.style.display = 'flex';
        analyticsContent.style.display = 'none';
        document.querySelector('.breadcrumbs .text-strong').textContent = 'Simulator';
    } else if (view === 'analytics') {
        document.getElementById('menuDashboard').classList.remove('active');
        document.getElementById('menuAnalytics').classList.add('active');
        dashboardContent.style.display = 'none';
        analyticsContent.style.display = 'flex';
        document.querySelector('.breadcrumbs .text-strong').textContent = 'Analytics Overview';
    }
}

function updateAnalytics() {
    document.getElementById('statTotalVisits').textContent = totalVisits;
    document.getElementById('statTotalBacks').textContent = totalBacks;
    document.getElementById('statTotalForwards').textContent = totalForwards;
    document.getElementById('statCurrentSize').textContent = backStack.length + forwardStack.length;
}

// Extra Sidebar Interactions
document.getElementById('menuDashboard').addEventListener('click', () => switchView('dashboard'));
document.getElementById('menuLogs').addEventListener('click', () => showToast('Log Records view is under construction!'));
document.getElementById('menuAnalytics').addEventListener('click', () => switchView('analytics'));

document.getElementById('shortcutBack').addEventListener('click', () => {
    goBack();
    totalBacks++;
    updateAnalytics();
});
document.getElementById('shortcutForward').addEventListener('click', () => {
    goForward();
    totalForwards++;
    updateAnalytics();
});

document.getElementById('userProfileBtn').addEventListener('click', () => {
    showToast('Admin Profile: Sameer Karadbhajne | Developer & Creator of NaviStack', 'info');
});

document.getElementById('searchBar').addEventListener('click', () => document.querySelector('#searchBar input').focus());
document.getElementById('onlineBadge').addEventListener('click', () => showToast('System status: Online and tracking seamlessly.', 'info'));
document.querySelector('.logo').addEventListener('click', () => showToast('NaviStack - Simulator Engine'));

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + Left Arrow for Back
    if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
        totalBacks++;
        updateAnalytics();
    }
    // Alt + Right Arrow for Forward
    if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
        totalForwards++;
        updateAnalytics();
    }
    // cmd/ctrl + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('#searchBar input').focus();
    }
});

// Init UI
updateUI();
