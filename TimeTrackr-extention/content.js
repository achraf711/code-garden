// Track user activity events
const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

function reportActivity() {
    chrome.runtime.sendMessage({ type: 'activity' });
}

// Add listeners for all activity events
activityEvents.forEach(eventType => {
    document.addEventListener(eventType, reportActivity, { passive: true });
}); 