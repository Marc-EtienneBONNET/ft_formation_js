/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/10 14:30:48 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/11 10:57:21 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//les include : 
var http = require('http');
var fs = require('fs');
// var js = require('./script');
var url = require('url');

var server = http.createServer();

server.on('request', (request, response) => {
	var script = url.parse(request.url, true);
	if (script.pathname == '/')
	{

		fs.readFile('index.html', (err, data) => {
			if (err)
			{
				console.log("impossible d'ouvrire le fichier");	
				throw err;
			}
			else 
			{
				console.log("fichier html en lecture");
				response.writeHead(200, {
					'content-type': 'text/html; charset=utf-8'
				})
				response.end(data)
			}
		})
	}
	else 
	{
		fs.readFile('script.js', (err, data) => {
			if (err)
			{
				console.log("impossible d'ouvrire le fichier");	
				throw err;
			}
			else 
			{
				console.log("fichier js en lecture");
				response.end(data)
			}
		})
	}
 })
 server.listen(8080);
 
 
