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

