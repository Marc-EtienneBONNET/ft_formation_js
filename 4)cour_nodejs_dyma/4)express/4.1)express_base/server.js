var express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.writeHead(200, {
		'content-type':'text/plain'
	});
	res.end("coucou les gas");
});

app.listen(3000);