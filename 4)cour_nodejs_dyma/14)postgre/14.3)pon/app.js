/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:36:04 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/25 09:09:01 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('./routes/index');
const express = require('express');
const path = require('path');
const app = express();
require('./database/index');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + "/public")))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);



app.listen(port);
console.log(server);
console.log(app);