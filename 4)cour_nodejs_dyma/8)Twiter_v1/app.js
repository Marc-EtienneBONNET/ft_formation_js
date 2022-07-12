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
app.use(express.urlencoded({ extended:true}));
app.use(morgan('short'));
app.use(express.json());
app.use(index);

app.listen(port);