// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const tasksCount = document.getElementById('tasks-count');
const completedCount = document.getElementById('completed-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed');
const clearAllBtn = document.getElementById('clear-all');
const themeToggle = document.getElementById('theme-toggle');
const viewToggle = document.getElementById('view-toggle');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search-input');
const advancedSearchBtn = document.getElementById('advanced-search');
const exportDataBtn = document.getElementById('export-data');
const importDataBtn = document.getElementById('import-data');
const showStatsBtn = document.getElementById('show-stats');
const categorySelect = document.getElementById('category-select');
const prioritySelect = document.getElementById('priority-select');
const dueDateInput = document.getElementById('due-date');
const tagsInput = document.getElementById('tags-input');
const notesInput = document.getElementById('notes-input');
const repeatSelect = document.getElementById('repeat-select');
const estimateTime = document.getElementById('estimate-time');
const subtasksList = document.getElementById('subtasks-list');
const addSubtaskBtn = document.getElementById('add-subtask');
const pomodoroToggle = document.getElementById('pomodoro-toggle');

// Modals
const statsModal = document.getElementById('stats-modal');
const advancedSearchModal = document.getElementById('advanced-search-modal');
const taskDetailModal = document.getElementById('task-detail-modal');
const settingsModal = document.getElementById('settings-modal');
const pomodoroModal = document.getElementById('pomodoro-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');

// Pomodoro Elements
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');
const startTimer = document.getElementById('start-timer');
const pauseTimer = document.getElementById('pause-timer');
const resetTimer = document.getElementById('reset-timer');
const workDuration = document.getElementById('work-duration');
const breakDuration = document.getElementById('break-duration');

// Settings Elements
const defaultViewSetting = document.getElementById('default-view-setting');
const timeFormatSetting = document.getElementById('time-format-setting');
const notificationsSetting = document.getElementById('notifications-setting');
const soundSetting = document.getElementById('sound-setting');

// Additional DOM Elements
const progressRingCircle = document.querySelector('.progress-ring-circle');
const progressRingText = document.querySelector('.progress-ring-text');
const quoteText = document.getElementById('quote-text');
const focusTask = document.getElementById('focus-task');
const focusContent = document.querySelector('.focus-content');

// Motivational Quotes
const quotes = [
    "The only way to do great work is to love what you do.",
    "Small progress is still progress.",
    "Focus on being productive instead of busy.",
    "Done is better than perfect.",
    "Your future is created by what you do today.",
    "One task at a time.",
    "Make each day your masterpiece.",
    "Start where you are. Use what you have. Do what you can."
];

let currentQuote = 0;
let pinnedTaskId = localStorage.getItem('pinnedTaskId');

// State
let todos = [];
let subtasks = [];
let currentFilter = 'all';
let currentSort = 'date-added';
let searchQuery = '';
let isGridView = false;
let isDarkTheme = false;
let pomodoroInterval;
let isBreak = false;
let isPaused = true;
let timeLeft;

// Settings
const settings = JSON.parse(localStorage.getItem('settings')) || {
    defaultView: 'list',
    timeFormat: '12',
    notifications: true,
    sound: true
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    
    // Load todos from localStorage
    try {
        const savedTodos = localStorage.getItem('todos');
        console.log('Saved todos from localStorage:', savedTodos);
        if (savedTodos) {
            todos = JSON.parse(savedTodos);
            console.log('Parsed todos:', todos);
        }
    } catch (error) {
        console.error('Error loading todos:', error);
        todos = [];
    }
    
    // Load settings
    try {
        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) {
            Object.assign(settings, JSON.parse(savedSettings));
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
    
    // Setup event listeners
    if (todoForm) {
        todoForm.addEventListener('submit', handleSubmit);
    }
    
    if (todoList) {
        todoList.addEventListener('click', handleTodoClick);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            renderTodos();
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', e => {
            currentSort = e.target.value;
            renderTodos();
        });
    }
    
    if (viewToggle) {
        viewToggle.addEventListener('click', () => {
            isGridView = !isGridView;
            todoList.classList.toggle('grid-view');
            localStorage.setItem('isGridView', isGridView);
        });
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkTheme = !isDarkTheme;
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('isDarkTheme', isDarkTheme);
        });
    }
    
    if (clearCompletedBtn) {
        clearCompletedBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all completed tasks?')) {
                todos = todos.filter(todo => !todo.completed);
                saveTodos();
                renderTodos();
                updateStats();
            }
        });
    }
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear ALL tasks?')) {
                todos = [];
                saveTodos();
                renderTodos();
                updateStats();
            }
        });
    }
    
    // Apply saved view and theme
    if (localStorage.getItem('isGridView') === 'true') {
        isGridView = true;
        todoList.classList.add('grid-view');
    }
    
    if (localStorage.getItem('isDarkTheme') === 'true') {
        isDarkTheme = true;
        document.body.classList.add('dark-theme');
    }
    
    // Initial render
    renderTodos();
    updateStats();
    
    console.log('App initialization complete');
});

// Event Listeners Setup
function setupEventListeners() {
    todoForm.addEventListener('submit', handleSubmit);
    todoList.addEventListener('click', handleTodoClick);
    searchInput.addEventListener('input', handleSearch);
    sortSelect.addEventListener('change', handleSort);
    viewToggle.addEventListener('click', toggleView);
    themeToggle.addEventListener('click', toggleTheme);
    pomodoroToggle.addEventListener('click', togglePomodoro);
    clearCompletedBtn.addEventListener('click', clearCompleted);
    clearAllBtn.addEventListener('click', clearAll);
    exportDataBtn.addEventListener('click', exportData);
    importDataBtn.addEventListener('click', importData);
    showStatsBtn.addEventListener('click', showStats);
    showSettingsBtn.addEventListener('click', showSettings);
    addSubtaskBtn.addEventListener('click', addSubtask);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Pomodoro controls
    startTimer.addEventListener('click', startPomodoro);
    pauseTimer.addEventListener('click', pausePomodoro);
    resetTimer.addEventListener('click', resetPomodoro);
    
    // Settings controls
    defaultViewSetting.addEventListener('change', updateSettings);
    timeFormatSetting.addEventListener('change', updateSettings);
    notificationsSetting.addEventListener('change', updateSettings);
    soundSetting.addEventListener('change', updateSettings);
}

// Form Submission
function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    // Validate input
    if (!todoInput.value.trim()) {
        console.log('Empty input, ignoring submission');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: todoInput.value.trim(),
        completed: false,
        category: categorySelect ? categorySelect.value : '',
        priority: prioritySelect ? prioritySelect.value : 'normal',
        repeat: repeatSelect ? repeatSelect.value : 'none',
        dueDate: dueDateInput ? dueDateInput.value : '',
        estimatedTime: estimateTime ? parseInt(estimateTime.value) || 0 : 0,
        tags: tagsInput ? tagsInput.value.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        notes: notesInput ? notesInput.value.trim() : '',
        dateAdded: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
    };
    
    console.log('New todo created:', todo);
    
    // Add the todo to the array
    todos.unshift(todo);
    console.log('Updated todos array:', todos);
    
    // Save to localStorage
    saveTodos();
    
    // Reset the form
    resetForm();
    
    // Render the updated list
    renderTodos();
    
    // Update statistics
    updateStats();
    
    // Update quote
    updateQuote();
}

// Reset Form
function resetForm() {
    todoForm.reset();
}

// Todo Item Click Handler
function handleTodoClick(e) {
    const item = e.target.closest('.todo-item');
    if (!item) return;
    
    const id = parseInt(item.dataset.id);
    const todo = todos.find(t => t.id === id);
    
    if (e.target.matches('.complete-btn')) {
        toggleComplete(id);
    } else if (e.target.matches('.delete-btn')) {
        deleteTodo(id);
    } else if (e.target.matches('.edit-btn')) {
        showEditModal(todo);
    } else if (e.target.matches('.details-btn')) {
        showTaskDetails(todo);
    }
}

// Render Functions
function renderTodos() {
    console.log('Rendering todos...');
    console.log('Current todos:', todos);
    
    if (!todoList) {
        console.error('Todo list element not found');
        return;
    }
    
    // Clear the current list
    todoList.innerHTML = '';
    
    // Check if we have any todos
    if (!todos || todos.length === 0) {
        console.log('No todos to display');
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        return;
    }
    
    // Hide empty state
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    // Filter and sort todos
    const filteredTodos = filterTodos(todos);
    console.log('Filtered todos:', filteredTodos);
    const sortedTodos = sortTodos(filteredTodos);
    console.log('Sorted todos:', sortedTodos);
    
    // Create and append todo elements
    sortedTodos.forEach(todo => {
        try {
            const li = createTodoElement(todo);
            todoList.appendChild(li);
        } catch (error) {
            console.error('Error creating todo element:', error);
        }
    });
    
    console.log('Render complete');
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.priority}-priority`;
    li.dataset.id = todo.id;
    
    const content = document.createElement('div');
    content.className = 'todo-content';
    
    const header = document.createElement('div');
    header.className = 'todo-header';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'complete-btn';
    checkbox.addEventListener('change', () => toggleComplete(todo.id));
    
    const text = document.createElement('span');
    text.className = `todo-text ${todo.completed ? 'completed' : ''}`;
    text.textContent = todo.text;
    
    header.appendChild(checkbox);
    header.appendChild(text);
    
    const details = document.createElement('div');
    details.className = 'todo-details';
    
    if (todo.dueDate) {
        const dueDate = document.createElement('span');
        dueDate.className = 'tag';
        dueDate.innerHTML = `<i class="fas fa-calendar"></i> ${formatDate(todo.dueDate)}`;
        details.appendChild(dueDate);
    }
    
    if (todo.estimatedTime) {
        const time = document.createElement('span');
        time.className = 'tag';
        time.innerHTML = `<i class="fas fa-clock"></i> ${todo.estimatedTime}m`;
        details.appendChild(time);
    }
    
    if (todo.category) {
        const category = document.createElement('span');
        category.className = 'tag';
        category.innerHTML = `<i class="fas fa-folder"></i> ${todo.category}`;
        details.appendChild(category);
    }
    
    todo.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.innerHTML = `<i class="fas fa-tag"></i> ${tag}`;
        details.appendChild(tagSpan);
    });
    
    content.appendChild(header);
    content.appendChild(details);
    
    const actions = document.createElement('div');
    actions.className = 'todo-actions';
    
    const pinBtn = document.createElement('button');
    pinBtn.className = `icon-btn pin-btn ${todo.id.toString() === pinnedTaskId ? 'active' : ''}`;
    pinBtn.innerHTML = '<i class="fas fa-thumbtack"></i>';
    pinBtn.dataset.id = todo.id;
    pinBtn.addEventListener('click', () => togglePinTask(todo.id));
    
    const editBtn = document.createElement('button');
    editBtn.className = 'icon-btn edit-btn';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.addEventListener('click', () => editTodo(todo.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'icon-btn delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    actions.appendChild(pinBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    li.appendChild(content);
    li.appendChild(actions);
    
    return li;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: settings.timeFormat === '12'
    });
}

// Filter and Sort Functions
function filterTodos(todos) {
    return todos.filter(todo => {
        switch (currentFilter) {
            case 'active':
                return !todo.completed;
            case 'completed':
                return todo.completed;
            case 'today':
                return todo.dueDate ? isToday(new Date(todo.dueDate)) : false;
            case 'upcoming':
                return todo.dueDate ? isFuture(new Date(todo.dueDate)) : false;
            default:
                return true;
        }
    });
}

function sortTodos(todos) {
    return [...todos].sort((a, b) => {
        switch (currentSort) {
            case 'due-date':
                return new Date(a.dueDate) - new Date(b.dueDate);
            case 'priority':
                return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
            case 'alphabetical':
                return a.text.localeCompare(b.text);
            case 'estimated-time':
                return b.estimatedTime - a.estimatedTime;
            default:
                return new Date(b.dateAdded) - new Date(a.dateAdded);
        }
    });
}

// Utility Functions
function getPriorityWeight(priority) {
    const weights = { urgent: 4, high: 3, normal: 2, low: 1 };
    return weights[priority] || 0;
}

function isToday(date) {
    if (!date || isNaN(date.getTime())) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

function isFuture(date) {
    if (!date || isNaN(date.getTime())) return false;
    const now = new Date();
    return date > now;
}

function calculateSubtasksProgress(subtasks) {
    if (subtasks.length === 0) return 0;
    return (subtasks.filter(s => s.completed).length / subtasks.length) * 100;
}

// Stats and Progress
function updateStats() {
    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    const remainingTasks = totalTasks - completedTasks;
    const percentComplete = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    
    tasksCount.textContent = remainingTasks;
    completedCount.textContent = completedTasks;
    updateProgressRing(percentComplete);
    
    updateCategoryProgress();
}

function updateCategoryProgress() {
    const categoriesOverview = document.querySelector('.categories-overview');
    categoriesOverview.innerHTML = '';
    
    const categories = {};
    todos.forEach(todo => {
        if (!todo.category) return;
        if (!categories[todo.category]) {
            categories[todo.category] = { total: 0, completed: 0 };
        }
        categories[todo.category].total++;
        if (todo.completed) categories[todo.category].completed++;
    });
    
    Object.entries(categories).forEach(([category, stats]) => {
        const progress = Math.round((stats.completed / stats.total) * 100);
        
        const div = document.createElement('div');
        div.className = 'category-progress';
        div.dataset.category = category;
        div.innerHTML = `
            <div class="category-label">
                <span>${category}</span>
                <span>${stats.completed}/${stats.total}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        `;
        
        categoriesOverview.appendChild(div);
    });
}

// Pomodoro Timer
function startPomodoro() {
    if (isPaused) {
        isPaused = false;
        startTimer.textContent = 'Pause';
        
        if (!timeLeft) {
            timeLeft = isBreak
                ? breakDuration.value * 60
                : workDuration.value * 60;
        }
        
        pomodoroInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft === 0) {
                clearInterval(pomodoroInterval);
                isBreak = !isBreak;
                timeLeft = null;
                playNotification();
                showNotification(
                    isBreak ? 'Time for a break!' : 'Break is over!'
                );
                startPomodoro();
            }
        }, 1000);
    } else {
        pausePomodoro();
    }
}

function pausePomodoro() {
    isPaused = true;
    startTimer.textContent = 'Start';
    clearInterval(pomodoroInterval);
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    isPaused = true;
    isBreak = false;
    timeLeft = null;
    startTimer.textContent = 'Start';
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerMinutes.textContent = minutes.toString().padStart(2, '0');
    timerSeconds.textContent = seconds.toString().padStart(2, '0');
}

// Settings Management
function loadSettings() {
    defaultViewSetting.value = settings.defaultView;
    timeFormatSetting.value = settings.timeFormat;
    notificationsSetting.checked = settings.notifications;
    soundSetting.checked = settings.sound;
    
    isGridView = settings.defaultView === 'grid';
}

function updateSettings() {
    settings.defaultView = defaultViewSetting.value;
    settings.timeFormat = timeFormatSetting.value;
    settings.notifications = notificationsSetting.checked;
    settings.sound = soundSetting.checked;
    
    localStorage.setItem('settings', JSON.stringify(settings));
    applySettings();
}

function applySettings() {
    if (settings.defaultView !== (isGridView ? 'grid' : 'list')) {
        toggleView();
    }
}

// Notifications
function showNotification(message) {
    if (!settings.notifications) return;
    
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Todo App', { body: message });
            }
        });
    }
}

function playNotification() {
    if (!settings.sound) return;
    
    const audio = new Audio('notification.mp3');
    audio.play();
}

// Theme and View Toggle
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    localStorage.setItem('isDarkTheme', isDarkTheme);
    applyTheme();
}

function applyTheme() {
    document.body.classList.toggle('dark-theme', isDarkTheme);
    themeToggle.innerHTML = `<i class="fas fa-${isDarkTheme ? 'sun' : 'moon'}"></i>`;
}

function toggleView() {
    isGridView = !isGridView;
    localStorage.setItem('isGridView', isGridView);
    applyView();
}

function applyView() {
    todoList.classList.toggle('grid-view', isGridView);
    viewToggle.innerHTML = `<i class="fas fa-${isGridView ? 'list' : 'th-large'}"></i>`;
}

// Data Management
function saveTodos() {
    console.log('Saving todos to localStorage:', todos);
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log('Todos saved successfully');
    } catch (error) {
        console.error('Error saving todos:', error);
        showNotification('Error saving tasks. Please try again.');
    }
}

function exportData() {
    const data = {
        todos,
        settings
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);
                todos = data.todos;
                Object.assign(settings, data.settings);
                
                saveTodos();
                localStorage.setItem('settings', JSON.stringify(settings));
                
                loadSettings();
                renderTodos();
                updateStats();
                
                showNotification('Data imported successfully');
            } catch (err) {
                console.error('Error importing data:', err);
                alert('Error importing data. Please check the file format.');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Toggle Complete
function toggleComplete(id) {
    console.log('Toggling completion for todo:', id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        todo.lastUpdated = new Date().toISOString();
        saveTodos();
        renderTodos();
        updateStats();
        
        if (settings.notifications) {
            showNotification(todo.completed ? 'Task completed!' : 'Task uncompleted');
        }
    }
}

// Delete Todo
function deleteTodo(id) {
    console.log('Deleting todo:', id);
    const todo = todos.find(t => t.id === id);
    if (todo && confirm(`Are you sure you want to delete "${todo.text}"?`)) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
        updateStats();
        
        if (settings.notifications) {
            showNotification('Task deleted');
        }
    }
}

function editTodo(id) {
    console.log('Editing todo:', id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        // Fill the form with todo data
        todoInput.value = todo.text;
        if (categorySelect) categorySelect.value = todo.category;
        if (prioritySelect) prioritySelect.value = todo.priority;
        if (repeatSelect) repeatSelect.value = todo.repeat;
        if (dueDateInput) dueDateInput.value = todo.dueDate;
        if (estimateTime) estimateTime.value = todo.estimatedTime;
        if (tagsInput) tagsInput.value = todo.tags.join(', ');
        if (notesInput) notesInput.value = todo.notes;
        
        // Remove the old todo
        todos = todos.filter(t => t.id !== id);
        
        // Scroll to form
        todoForm.scrollIntoView({ behavior: 'smooth' });
        
        saveTodos();
        renderTodos();
        updateStats();
    }
}

// Update the progress ring
function updateProgressRing(percent) {
    const circle = progressRingCircle;
    const text = progressRingText;
    if (!circle || !text) return;
    
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    text.textContent = `${percent}%`;
}

// Update quote
function updateQuote() {
    if (!quoteText) return;
    
    currentQuote = (currentQuote + 1) % quotes.length;
    quoteText.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = quotes[currentQuote];
        quoteText.style.opacity = '1';
    }, 300);
}

// Pin/unpin task
function togglePinTask(id) {
    if (pinnedTaskId === id.toString()) {
        // Unpin
        pinnedTaskId = null;
        localStorage.removeItem('pinnedTaskId');
        focusTask.style.display = 'none';
    } else {
        // Unpin previous task if exists
        if (pinnedTaskId) {
            const prevPinBtn = document.querySelector(`.pin-btn[data-id="${pinnedTaskId}"]`);
            if (prevPinBtn) prevPinBtn.classList.remove('active');
        }
        
        // Pin new task
        pinnedTaskId = id.toString();
        localStorage.setItem('pinnedTaskId', pinnedTaskId);
    }
    
    renderTodos();
    updateFocusTask();
}

// Update focus task display
function updateFocusTask() {
    if (!focusTask || !focusContent) return;
    
    const pinnedTodo = todos.find(todo => todo.id.toString() === pinnedTaskId);
    
    if (pinnedTodo) {
        focusTask.style.display = 'block';
        focusContent.innerHTML = `
            <div class="todo-content">
                <div class="todo-header">
                    <input type="checkbox" 
                           ${pinnedTodo.completed ? 'checked' : ''} 
                           onchange="toggleComplete(${pinnedTodo.id})">
                    <span class="todo-text ${pinnedTodo.completed ? 'completed' : ''}">${pinnedTodo.text}</span>
                </div>
            </div>
            <button class="icon-btn pin-btn active" onclick="togglePinTask(${pinnedTodo.id})">
                <i class="fas fa-thumbtack"></i>
            </button>
        `;
    } else {
        focusTask.style.display = 'none';
    }
}

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    // Set initial quote
    if (quoteText) {
        quoteText.textContent = quotes[currentQuote];
    }
    
    // Update focus task
    updateFocusTask();
    
    // Update quote on page refresh
    updateQuote();
}); 