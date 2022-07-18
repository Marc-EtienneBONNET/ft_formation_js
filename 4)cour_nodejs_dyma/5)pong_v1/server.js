/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/10 14:30:48 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/12 18:02:34 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//les include : 
//les include : 
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.use('/', express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "/index.html"));
});
app.listen(3000);

 
