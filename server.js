const express = require('express');
const path = require('path');
const fs = require('fs');


const port = 3001
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('assets'));


app.get('./', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('api/notes', (req, res) => {
    res.json(`${req.method} request received to get notes`);

console.info(`${req.method} request received to get notes`);
});

