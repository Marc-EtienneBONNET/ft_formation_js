var express = require('express');
var path = require('path');
var fs = require('fs');
var fnMiddle = require('./fnMiddleware');
var app = express();

app.set('views', path.join(__dirname + "/views"));
app.set('view engine', 'ejs');


app.use('/foo', fnMiddle.testMiddle1, fnMiddle.testMiddle2);

app.get('/foo', (req, res) => {
	res.render('index', {name:"Marco"});
});
app.listen(3000);