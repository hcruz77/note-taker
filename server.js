const express = require('express');
const path = require('path');
const fs = require('fs');


const PORT = process.env.PORT || 3001;
const app = express();



const getData = (filepath) => { 
    const data = fs.readFileSync(filepath, 'utf-8');
    if (!data) throw Error('no data present');
    return JSON.parse(data);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));


app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);



app.get('/api/notes', (req, res) =>  res.json(getData('./db/db.json')));

app.post('/api/notes', (req, res) => {
    const data = getData('./db/db.json');
    data.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));
    res.json(data);
});



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));