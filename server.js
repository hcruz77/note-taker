const express = require('express');
const path = require('path');
const fs = require('fs');
const { readAndAppend, readFromFile } = require('./utils/fsUtils');


const PORT = 3001
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

// GET Routes
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// API Routes

app.get('api/notes', (req, res) => {
    readFromFile('db/db.json', 'utf8')
    .then((notes) => {
        let parsedNotes;

        try {
            parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNotes = [];
        }

        return parsedNotes;
    })
    .then((notes) => { return res.json(notes) })
    .catch((err) => res.status(500).json(err))

});

// app.post('/notes', (req, res) => {
//     readAndAppend(req.body, 'db/db.json')
//     .then((note) => res.json(note))
//     .catch((err) => res.status(500).json(err))
// })

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));