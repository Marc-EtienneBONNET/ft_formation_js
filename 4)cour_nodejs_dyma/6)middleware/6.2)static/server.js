var express = require('express');
var path = require('path');
var fs = require('fs');
var fnMiddle = require('./fnMiddleware');
var app = express();


app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "/public/")));

app.get('/', (req, res) => {
	res.render('index', {name:"Marco"});
});
app.listen(3000);