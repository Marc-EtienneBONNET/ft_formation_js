var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.set('views', [path.join(__dirname, "/views"),path.join(__dirname, "/views2")]);
app.set('view engine', 'toto');
app.engine('toto', (path, option, callback) => {
	fs.readFile(path, (err, data) => {
		if (err){callback(err)};
		var template = data.toString().replace('%name', option.name);
		callback(null, template);
	});
});

app.get('/', (req, res) => {
	res.render('index.toto', {name: "Marco"});
});
app.get('/page2', (req, res) => {
	res.render('index2', {name: "Marco"});
});
app.listen(3000);