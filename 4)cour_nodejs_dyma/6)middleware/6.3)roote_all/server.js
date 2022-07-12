var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();


app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json());
app.use(express.urlencoded({ extender:true}));

app.route("/")
	.post((req, res) => {
		console.log(req.body.name);
		res.end();
	})
	.delete((req, res) => {
		console.log(req.body.name);
		res.end();
	})

app.get('/', (req, res) => {
	res.render('index', {name:"Marco"});
});

app.listen(3000);