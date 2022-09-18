const express = require('express');
const path = require('path');
const fs = require('fs');

const port = 3001
const app = express();

app.use(express.json());
app.use(express.static('assets'));


app.get('./')
