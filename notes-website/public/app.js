// DOM Elements
const notesList = document.getElementById('notesList');
const noteEditor = document.getElementById('noteEditor');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const noteTags = document.getElementById('noteTags');
const noteCategory = document.getElementById('noteCategory');
const searchInput = document.getElementById('searchInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const sortSelect = document.getElementById('sortSelect');
const categoryFilter = document.getElementById('categoryFilter');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const viewToggleBtn = document.getElementById('viewToggleBtn');
const pinNoteBtn = document.getElementById('pinNoteBtn');
const previewToggleBtn = document.getElementById('previewToggleBtn');
const previewContent = document.getElementById('previewContent');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const saveStatus = document.getElementById('saveStatus');
const lastSaved = document.getElementById('lastSaved');
const trashBtn = document.getElementById('trashBtn');
const trashCount = document.getElementById('trashCount');
const exportModal = document.getElementById('exportModal');
const shareModal = document.getElementById('shareModal');
const shareLink = document.getElementById('shareLink');
const copyShareLink = document.getElementById('copyShareLink');
const collaboratorsList = document.getElementById('collaboratorsList');

// State
let currentNote = null;
let notes = [];
let categories = new Set();
let autoSaveTimeout = null;
let lastSavedTime = null;
let trashedNotes = [];
let currentFilter = 'all';
let currentView = 'grid';
let currentSort = 'updated';
let isPreviewMode = false;

// Constants
const AUTO_SAVE_DELAY = 2000; // 2 seconds
const TEMPLATES = {
    meeting: `# Meeting Notes
## Date: [Current Date]
## Attendees:
- 

## Agenda:
1. 
2. 
3. 

## Discussion Points:
- 

## Action Items:
- [ ] 
- [ ] 

## Next Steps:
- `,
    todo: `# To-Do List
## Priority Tasks:
- [ ] 
- [ ] 

## In Progress:
- [ ] 

## Completed:
- [x] `,
    journal: `# Journal Entry
## Date: [Current Date]

## Today's Highlights:
- 

## Thoughts and Reflections:


## Goals for Tomorrow:
- `
};

const DEFAULT_CATEGORIES = [
    'Work',
    'Personal',
    'Study',
    'Projects',
    'Ideas',
    'Tasks',
    'Meeting Notes',
    'Research',
    'Journal',
    'Other'
];

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    themeToggleBtn.querySelector('i').className = theme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
}

// API Functions
async function fetchNotes() {
    try {
        const response = await fetch('/api/notes');
        notes = await response.json();
        updateCategories();
        updateNotesList();
    } catch (error) {
        console.error('Error fetching notes:', error);
        showNotification('Error loading notes', 'error');
    }
}

async function saveNote() {
    try {
        const noteData = {
            title: noteTitle.value,
            content: noteContent.value,
            category: noteCategory.value,
            tags: noteTags.value.split(',').map(tag => tag.trim()).filter(Boolean),
            isPinned: currentNote?.isPinned || false
        };

        const method = currentNote?._id ? 'PUT' : 'POST';
        const url = currentNote?._id ? `/api/notes/${currentNote._id}` : '/api/notes';

        updateSaveStatus('Saving...');

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        });

        if (!response.ok) throw new Error('Failed to save note');

        const savedNote = await response.json();
        
        if (currentNote?._id) {
            const index = notes.findIndex(n => n._id === savedNote._id);
            if (index !== -1) notes[index] = savedNote;
        } else {
            notes.push(savedNote);
        }

        updateNotesList();
        updateCategories();
        showNotification('Note saved successfully');
        updateSaveStatus('Saved');
        lastSavedTime = new Date();
        updateLastSaved();
        hideEditor();
    } catch (error) {
        console.error('Error saving note:', error);
        showNotification('Error saving note');
        updateSaveStatus('Error saving');
    }
}

async function deleteNote(noteId) {
    try {
        const response = await fetch(`/api/notes/${noteId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete note');
        }

        notes = notes.filter(note => (note._id !== noteId && note.id !== noteId));
        updateNotesList();
        updateCategories();
        showNotification('Note deleted successfully');
    } catch (error) {
        console.error('Error deleting note:', error);
        showNotification('Error deleting note');
    }
}

// UI Functions
function updateNotesList() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let filteredNotes = notes.filter(note => {
        const titleMatch = note.title.toLowerCase().includes(searchTerm);
        const contentMatch = note.content.toLowerCase().includes(searchTerm);
        const tagsMatch = note.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        const categoryMatch = categoryFilter === 'all' || note.category === categoryFilter;
        return (titleMatch || contentMatch || tagsMatch) && categoryMatch;
    });

    // Sort notes
    filteredNotes.sort((a, b) => {
        switch (sortBy) {
            case 'updated':
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            case 'created':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    // Pin notes to top
    filteredNotes.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
    });

    notesList.innerHTML = '';
    filteredNotes.forEach(note => {
        const card = createNoteCard(note);
        notesList.appendChild(card);
    });

    notesList.className = `notes-${currentView}`;
}

function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'note-card';
    if (note.isPinned) card.classList.add('pinned');
    
    const noteId = note._id || note.id;
    const tags = note.tags?.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('') || '';
    const categoryClass = note.category ? note.category.toLowerCase().replace(/\s+/g, '-') : '';
    
    card.innerHTML = `
        <h3>${escapeHtml(note.title)}</h3>
        <div class="note-preview">${getPreviewText(note.content)}</div>
        <div class="note-tags">${tags}</div>
        <div class="note-meta">
            ${note.category ? `<span class="category ${categoryClass}">${note.category}</span>` : ''}
            <span>${formatDate(note.updatedAt)}</span>
        </div>
        <div class="card-actions">
            ${note.isPinned ? '<i class="ri-pushpin-fill"></i>' : ''}
            <button class="icon-button" title="Edit Note">
                <i class="ri-edit-line"></i>
            </button>
            <button class="icon-button danger" title="Delete Note">
                <i class="ri-delete-bin-line"></i>
            </button>
        </div>
    `;
    
    const editBtn = card.querySelector('.ri-edit-line').parentElement;
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showEditor(note);
    });
    
    const deleteBtn = card.querySelector('.ri-delete-bin-line').parentElement;
    deleteBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this note?')) {
            await deleteNote(noteId);
        }
    });
    
    card.addEventListener('click', () => showEditor(note));
    
    return card;
}

function showEditor(note = null) {
    currentNote = note;
    noteEditor.classList.remove('hidden');
    
    if (note) {
        noteTitle.value = note.title || '';
        noteContent.value = note.content || '';
        noteTags.value = note.tags?.join(', ') || '';
        noteCategory.value = note.category || '';
        pinNoteBtn.innerHTML = `<i class="ri-pushpin-${note.isPinned ? 'fill' : 'line'}"></i>`;
        lastSavedTime = new Date(note.updatedAt);
    } else {
        noteTitle.value = '';
        noteContent.value = '';
        noteTags.value = '';
        noteCategory.value = '';
        pinNoteBtn.innerHTML = '<i class="ri-pushpin-line"></i>';
        lastSavedTime = null;
    }
    
    updateWordCount();
    updateCharCount();
    updateLastSaved();
    noteTitle.focus();
}

function hideEditor() {
    noteEditor.classList.add('hidden');
    currentNote = null;
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = null;
    }
}

function updateCategories() {
    // Get unique categories from notes
    const userCategories = new Set(notes.map(note => note.category).filter(Boolean));
    
    // Combine default and user categories
    categories = new Set([...DEFAULT_CATEGORIES, ...userCategories]);
    
    // Update category filter dropdown
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    noteCategory.innerHTML = '<option value="">Select Category</option>';
    
    // Add all categories sorted alphabetically
    [...categories].sort().forEach(category => {
        const isDefault = DEFAULT_CATEGORIES.includes(category);
        const categoryHtml = `<option value="${category}">${category}${isDefault ? '' : ' (Custom)'}</option>`;
        categoryFilter.innerHTML += categoryHtml;
        noteCategory.innerHTML += categoryHtml;
    });
}

function toggleView() {
    currentView = currentView === 'grid' ? 'list' : 'grid';
    viewToggleBtn.innerHTML = `<i class="ri-layout-${currentView === 'grid' ? 'grid' : 'list'}-line"></i>`;
    updateNotesList();
}

function togglePreview() {
    isPreviewMode = !isPreviewMode;
    noteContent.classList.toggle('hidden');
    previewContent.classList.toggle('hidden');
    if (isPreviewMode) {
        const htmlContent = marked.parse(noteContent.value, {
            breaks: true,
            gfm: true
        });
        previewContent.innerHTML = htmlContent;
    }
    previewToggleBtn.innerHTML = `<i class="ri-eye-${isPreviewMode ? 'fill' : 'line'}"></i>`;
}

function handleFormat(format) {
    const textarea = noteContent;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    let result;

    switch (format) {
        case 'bold':
            result = `**${text.substring(start, end)}**`;
            break;
        case 'italic':
            result = `*${text.substring(start, end)}*`;
            break;
        case 'heading':
            result = `\n# ${text.substring(start, end)}`;
            break;
        case 'list':
            result = `\n- ${text.substring(start, end)}`;
            break;
        case 'code':
            result = `\`${text.substring(start, end)}\``;
            break;
        case 'link':
            result = `[${text.substring(start, end)}](url)`;
            break;
    }

    textarea.value = text.substring(0, start) + result + text.substring(end);
    textarea.focus();
    triggerAutoSave();
}

// Utility Functions
function updateWordCount() {
    const words = noteContent.value.trim().split(/\s+/).filter(Boolean).length;
    wordCount.textContent = `${words} words`;
}

function updateCharCount() {
    const chars = noteContent.value.length;
    charCount.textContent = `${chars} characters`;
}

function updateSaveStatus(status) {
    saveStatus.textContent = status;
}

function updateLastSaved() {
    if (lastSavedTime) {
        const timeAgo = getTimeAgo(lastSavedTime);
        lastSaved.textContent = `Last saved ${timeAgo}`;
    } else {
        lastSaved.textContent = '';
    }
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function getPreviewText(content) {
    return escapeHtml(content.substring(0, 100)) + (content.length > 100 ? '...' : '');
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Auto-save functionality
function triggerAutoSave() {
    if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
    updateSaveStatus('Unsaved changes...');
    autoSaveTimeout = setTimeout(async () => {
        await saveNote();
    }, 2000);
}

// Event Listeners
addNoteBtn.addEventListener('click', () => showEditor());
saveNoteBtn.addEventListener('click', saveNote);
cancelEditBtn.addEventListener('click', hideEditor);
searchInput.addEventListener('input', updateNotesList);
sortSelect.addEventListener('change', updateNotesList);
categoryFilter.addEventListener('change', updateNotesList);
themeToggleBtn.addEventListener('click', toggleTheme);
viewToggleBtn.addEventListener('click', toggleView);
pinNoteBtn.addEventListener('click', () => {
    if (currentNote) {
        currentNote.isPinned = !currentNote.isPinned;
        pinNoteBtn.innerHTML = `<i class="ri-pushpin-${currentNote.isPinned ? 'fill' : 'line'}"></i>`;
        triggerAutoSave();
    }
});
previewToggleBtn.addEventListener('click', togglePreview);

noteContent.addEventListener('input', () => {
    updateWordCount();
    updateCharCount();
    triggerAutoSave();
    if (isPreviewMode) {
        const htmlContent = marked.parse(noteContent.value, {
            breaks: true,
            gfm: true
        });
        previewContent.innerHTML = htmlContent;
    }
});

// Initialize
initializeTheme();
fetchNotes(); 