var http = require('http');
var fs = require('fs');
var server = http.createServer();

server.on('request', (req, res) => { 
	var url = req.url;
	var file;
	res.writeHead(200, {
		'content-type':'text/html'
	});
	if (url === '/home')
		file = fs.readFileSync("./index.html", "utf8");
	else if (url === '/info')
		file = fs.readFileSync("./info.html", "utf8");
	else 
	{
		res.writeHead(404, {
			'content-type':'text/html'
		});
		file = fs.readFileSync("./notfound.html", "utf8");
	}
	res.end(file);	
})
server.listen(8080);