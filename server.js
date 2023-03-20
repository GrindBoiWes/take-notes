const express = require('express');
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'Main/public')));
app.use(express.urlencoded({extended:true}));
app.use((express.json()));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main/public/notes.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main/public/index.html'));
})

const notes = [];

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };
    notes.push(newNote);
    res.json(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
    const noteIndex = notes.findIndex(note => note.id === req.params.id);
        if (noteIndex !== -1) {
            notes.splice(noteIndex, 1);
        }
        res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://locoalhost:${PORT}`)
});

