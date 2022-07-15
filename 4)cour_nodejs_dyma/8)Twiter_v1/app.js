const index = require('./routes/index');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'pug');

app.use('/', express.static(path.join(__dirname, "/public")));
app.use(express.json());//permet de recup des post json sous forma json
app.use(express.urlencoded({ extended:true})); //permet de recup des post autre sous forma json
app.use(morgan('short'));
app.use(index);

app.listen(port);