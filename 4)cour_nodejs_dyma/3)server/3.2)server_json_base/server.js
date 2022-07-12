var http = require('http');
var server = http.createServer();

var test = {
	text:"bonjour messieur"
}

server.on('request', (req, res) => {
	res.writeHead(200, {
		'content-type':'application/json'
	});
	res.end(JSON.stringify(test));
})
server.listen(8080);