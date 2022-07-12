var http = require('http');
var server = http.createServer();

server.on('request', (req, res) => {
	res.writeHead(200, {
		'content-type':'text/plain'
	})
	res.end('Premier server');
});
server.listen(8080);