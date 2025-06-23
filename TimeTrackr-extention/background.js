// Store active times for each domain
let activeTabId = null;
let lastActiveTime = Date.now();
let isUserActive = true;
let lastActivityTime = Date.now();
let isTabVisible = true;

// Function to get domain from URL
function getDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch (e) {
        return null;
    }
}

// Get today's date key in YYYY-MM-DD format
function getTodayKey() {
    const date = new Date();
    return date.toISOString().split('T')[0];
}

// Initialize or update domain time
async function updateDomainTime(domain) {
    if (!domain || !isUserActive || !isTabVisible) return;

    const currentTime = Date.now();
    // Only count time if user was active in the last 2 minutes
    if (currentTime - lastActivityTime > 120000) {
        lastActiveTime = currentTime;
        return;
    }

    const timeSpent = currentTime - lastActiveTime;
    lastActiveTime = currentTime;

    const todayKey = getTodayKey();
    
    try {
        const result = await chrome.storage.local.get(todayKey);
        let todayData = result[todayKey] || {};
        
        todayData[domain] = (todayData[domain] || 0) + timeSpent;
        
        await chrome.storage.local.set({ [todayKey]: todayData });
    } catch (error) {
        console.error('Error updating domain time:', error);
    }
}

// Initialize tracking
chrome.runtime.onStartup.addListener(async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
        activeTabId = tabs[0].id;
        lastActiveTime = Date.now();
        updateDomainTime(getDomain(tabs[0].url));
    }
});

// Track tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    if (activeTabId) {
        const tab = await chrome.tabs.get(activeTabId);
        await updateDomainTime(getDomain(tab.url));
    }
    activeTabId = activeInfo.tabId;
    lastActiveTime = Date.now();
    lastActivityTime = Date.now();
    
    // Check visibility state of the new active tab
    const newTab = await chrome.tabs.get(activeTabId);
    isTabVisible = newTab.status === 'complete';
});

// Track URL changes
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tabId === activeTabId) {
        if (changeInfo.url) {
            await updateDomainTime(getDomain(changeInfo.url));
            lastActiveTime = Date.now();
        }
        if (changeInfo.status === 'complete') {
            isTabVisible = true;
        }
    }
});

// Track window focus
chrome.windows.onFocusChanged.addListener(async (windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        if (activeTabId) {
            const tab = await chrome.tabs.get(activeTabId);
            await updateDomainTime(getDomain(tab.url));
        }
        isUserActive = false;
        isTabVisible = false;
    } else {
        isUserActive = true;
        lastActiveTime = Date.now();
        lastActivityTime = Date.now();
        
        // Check current tab visibility
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs[0]) {
            activeTabId = tabs[0].id;
            isTabVisible = tabs[0].status === 'complete';
        }
    }
});

// Listen for user activity
chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'activity') {
        lastActivityTime = Date.now();
        isUserActive = true;
    }
});

// Update time more frequently for better accuracy
setInterval(async () => {
    if (activeTabId && isUserActive && isTabVisible) {
        try {
            const tab = await chrome.tabs.get(activeTabId);
            await updateDomainTime(getDomain(tab.url));
        } catch (error) {
            console.error('Error in interval update:', error);
        }
    }
}, 5000); // Update every 5 seconds 