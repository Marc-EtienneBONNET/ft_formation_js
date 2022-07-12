var path = require('path');
var express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.status(200);
	res.send("<html><body><h1>Coucou</h1></body></html>");
});

app.get('/page1', (req, res) => {
	res.send("Salut");
});

app.get('/page2', (req, res) => {
	res.send({ name: "test"});
});

app.get('/page3', (req, res) => {
	res.json({ name: "test"});
});

app.get('/page4', (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"), (err) => {
		if (err)
		{
			res.sendStatus(500);
		}
	});
});

app.get('/page5', (req, res) => {
	res.sendFile(path.join(__dirname + "index.html"), (err) => {
		if (err)
		{
			res.sendStatus(500);
		}
	});
});

app.listen(3000);