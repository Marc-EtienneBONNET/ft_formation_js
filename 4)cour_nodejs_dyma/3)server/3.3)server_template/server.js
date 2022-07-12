var http = require('http');
var fs = require('fs');
var server = http.createServer();

server.on('request', (req, res) => {
	res.writeHead(200, {
		'content-type':'text/html'
	});
	var tmp = fs.readFileSync('./index.html', 'utf8');
	var html = tmp.replace('{{ name }}', 'Monsieur');
	res.end(html);
});
server.listen(8080);