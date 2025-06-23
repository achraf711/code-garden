let timeChart = null;
let currentDate = new Date();

// Format time duration
function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else {
        return `${seconds}s`;
    }
}

// Format date as YYYY-MM-DD
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Update the date display
function updateDateDisplay() {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    document.getElementById('currentDate').textContent = currentDate.toLocaleDateString(undefined, options);
}

// Generate random color for chart
function generateColor(index) {
    const colors = [
        '#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6',
        '#1abc9c', '#e67e22', '#34495e', '#16a085', '#c0392b'
    ];
    return colors[index % colors.length];
}

// Update the chart with new data
function updateChart(data) {
    const domains = Object.keys(data);
    const times = Object.values(data);
    const colors = domains.map((_, index) => generateColor(index));

    if (timeChart) {
        timeChart.destroy();
    }

    const ctx = document.getElementById('timeChart').getContext('2d');
    timeChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: domains,
            datasets: [{
                data: times,
                backgroundColor: colors,
                borderColor: 'white',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            return ` ${context.label}: ${formatTime(value)}`;
                        }
                    }
                }
            }
        }
    });
}

// Update the stats list
function updateStatsList(data) {
    const statsList = document.getElementById('statsList');
    statsList.innerHTML = '';

    // Sort domains by time spent (descending)
    const sortedDomains = Object.entries(data)
        .sort(([, a], [, b]) => b - a);

    sortedDomains.forEach(([domain, time]) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <span class="stat-domain">${domain}</span>
            <span class="stat-time">${formatTime(time)}</span>
        `;
        statsList.appendChild(statItem);
    });
}

// Load and display data for the current date
async function loadData() {
    try {
        const dateKey = formatDate(currentDate);
        const result = await chrome.storage.local.get(dateKey);
        const data = result[dateKey] || {};

        if (Object.keys(data).length === 0) {
            document.querySelector('.chart-container').innerHTML = 
                '<p style="text-align: center; color: #7f8c8d;">No data available for this date</p>';
            document.getElementById('statsList').innerHTML = '';
        } else {
            document.querySelector('.chart-container').innerHTML = '<canvas id="timeChart"></canvas>';
            updateChart(data);
            updateStatsList(data);
        }
    } catch (error) {
        console.error('Error loading data:', error);
        document.querySelector('.chart-container').innerHTML = 
            '<p style="text-align: center; color: #e74c3c;">Error loading data</p>';
    }
}

// Initialize the popup
document.addEventListener('DOMContentLoaded', () => {
    // Set initial date display
    updateDateDisplay();
    
    // Load initial data
    loadData();

    // Handle date navigation
    document.getElementById('prevDate').addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
        loadData();
    });

    document.getElementById('nextDate').addEventListener('click', () => {
        const today = new Date();
        if (currentDate < today) {
            currentDate.setDate(currentDate.getDate() + 1);
            updateDateDisplay();
            loadData();
        }
    });

    // Add error handling for Chart.js loading
    if (typeof Chart === 'undefined') {
        document.querySelector('.chart-container').innerHTML = 
            '<p style="text-align: center; color: #e74c3c;">Error: Chart.js not loaded</p>';
    }
}); 