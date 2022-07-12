/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   script.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/10 14:30:48 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/12 17:54:15 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//les include : 
var http = require('http');
var fs = require('fs');

 var server = http.createServer();

 server.on('request', (request, response) => {
		
		fs.readFile('index.html', (err, data) => {
			if (err)
			{
				console.log("impossible d'ouvrire le fichier");	
				throw err;
			}
			else 
			{
				response.writeHead(200, {
					'content-type': 'text/html; charset=utf-8'
				})
				response.end(data)
			}
	})
 })
 server.listen(8080);
