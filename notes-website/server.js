const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const marked = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data file path
const NOTES_FILE = path.join(__dirname, 'data', 'notes.json');

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir);
    }
}

// Load notes from file
async function loadNotes() {
    try {
        const data = await fs.readFile(NOTES_FILE, 'utf8');
        const notes = JSON.parse(data);
        // Convert old id format to _id format
        return notes.map(note => {
            if (note.id && !note._id) {
                note._id = note.id;
                delete note.id;
            }
            return note;
        });
    } catch (error) {
        return [];
    }
}

// Save notes to file
async function saveNotes(notes) {
    await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
}

// API Routes
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await loadNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load notes' });
    }
});

app.post('/api/notes', async (req, res) => {
    try {
        const notes = await loadNotes();
        const newNote = {
            _id: uuidv4(),
            title: req.body.title,
            content: req.body.content,
            category: req.body.category || '',
            tags: req.body.tags || [],
            isPinned: req.body.isPinned || false,
            isFavorite: req.body.isFavorite || false,
            collaborators: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        notes.push(newNote);
        await saveNotes(notes);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
});

app.put('/api/notes/:id', async (req, res) => {
    try {
        const notes = await loadNotes();
        const index = notes.findIndex(note => note._id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const updatedNote = {
            ...notes[index],
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            tags: req.body.tags,
            isPinned: req.body.isPinned,
            isFavorite: req.body.isFavorite,
            updatedAt: new Date().toISOString()
        };

        notes[index] = updatedNote;
        await saveNotes(notes);
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
});

app.delete('/api/notes/:id', async (req, res) => {
    try {
        const notes = await loadNotes();
        const filteredNotes = notes.filter(note => 
            note._id !== req.params.id && note.id !== req.params.id
        );
        if (filteredNotes.length === notes.length) {
            return res.status(404).json({ error: 'Note not found' });
        }
        await saveNotes(filteredNotes);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

// Collaboration endpoints
app.post('/api/notes/:id/collaborators', async (req, res) => {
    try {
        const { email, role } = req.body;
        const notes = await loadNotes();
        const noteIndex = notes.findIndex(note => note._id === req.params.id);
        
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const collaborator = {
            id: uuidv4(),
            email,
            role,
            addedAt: new Date().toISOString()
        };

        if (!notes[noteIndex].collaborators) {
            notes[noteIndex].collaborators = [];
        }

        notes[noteIndex].collaborators.push(collaborator);
        await saveNotes(notes);
        res.status(201).json({ collaborators: notes[noteIndex].collaborators });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add collaborator' });
    }
});

app.delete('/api/notes/:id/collaborators/:collaboratorId', async (req, res) => {
    try {
        const notes = await loadNotes();
        const noteIndex = notes.findIndex(note => note._id === req.params.id);
        
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const collaborators = notes[noteIndex].collaborators.filter(
            c => c.id !== req.params.collaboratorId
        );

        notes[noteIndex].collaborators = collaborators;
        await saveNotes(notes);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove collaborator' });
    }
});

// Share endpoints
app.post('/api/notes/:id/share', async (req, res) => {
    try {
        const { permission } = req.body;
        const notes = await loadNotes();
        const note = notes.find(n => n._id === req.params.id);
        
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const shareId = uuidv4();
        note.shareLink = {
            id: shareId,
            permission,
            createdAt: new Date().toISOString()
        };

        await saveNotes(notes);
        res.json({ shareLink: `${req.protocol}://${req.get('host')}/shared/${shareId}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create share link' });
    }
});

app.get('/shared/:shareId', async (req, res) => {
    try {
        const notes = await loadNotes();
        const note = notes.find(n => n.shareLink?.id === req.params.shareId);
        
        if (!note) {
            return res.status(404).json({ error: 'Shared note not found' });
        }

        const { content, ...noteData } = note;
        const htmlContent = marked.parse(content);
        
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${noteData.title}</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
                <style>
                    .markdown-body {
                        box-sizing: border-box;
                        min-width: 200px;
                        max-width: 980px;
                        margin: 0 auto;
                        padding: 45px;
                    }
                    @media (max-width: 767px) {
                        .markdown-body {
                            padding: 15px;
                        }
                    }
                </style>
            </head>
            <body class="markdown-body">
                <h1>${noteData.title}</h1>
                ${htmlContent}
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve shared note' });
    }
});

// Initialize and start server
async function init() {
    await ensureDataDir();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

init(); 