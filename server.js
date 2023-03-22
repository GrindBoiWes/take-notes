// This section imports its corresponding module
const express = require('express');
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
// Express creates a new application instance, while PORT sets the port number for the server
const app = express();
const PORT = process.env.PORT || 3001;
// This section will serve static files from the public folder, and then will use middleware functions for parsing the incoming requests
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended:true}));
app.use((express.json()));
// This section defines routes for serving the HTML files
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/assets/notes.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/assets/index.html'));
})
// Empty array to store notes data
const notes = [];
// This section defines API endpoints for retrieving and creating data
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
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes));
    res.json(newNote)
})
// Defines an API endpoint for deleting a note by the notes ID
app.delete('/api/notes/:id', (req, res) => {
    const noteIndex = notes.findIndex(note => note.id === req.params.id);
        if (noteIndex !== -1) {
            notes.splice(noteIndex, 1);
            fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes));
        }
        res.sendStatus(204);
});
// This section listens to the PORT the page is being deployed on
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});

