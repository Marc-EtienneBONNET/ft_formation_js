var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.set('views',[path.join(__dirname, "/views"),path.join(__dirname, "/views2")]);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', {
		name:"Marco",
		xp:0,
		tab:[
			{title:1,content:"banane"},
			{title:2,content:"pomme"},
			{title:3,content:"peche"}
		]
	});
});


app.get('/page2', (req, res) => {
	res.render('index2', {
		name:"Marco",
	});
});

app.listen(3000);