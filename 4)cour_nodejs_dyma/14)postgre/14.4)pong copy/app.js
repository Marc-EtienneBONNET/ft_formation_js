/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:36:04 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/26 18:06:50 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//const {SQLcreateGames, SQLcreatePlayers, SQLcreateRaquettes, SQLcreateBall, SQLsupTable, SQLselectTable, SQLaddBall, SQLaddRaquette, SQLaddPlayer, SQLaddGame} = require('./database/cmdQuery');
const router = require('./routes/index');
const path = require('path');
require('./database/index');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {client1} = require('./database/index');

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + "/public")))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);



server.listen(port, () => {});

var {initGames, sendRaquette, mouvRaquette} = require('./backend/backend_pong/backend_pong');

io.on('connection', (socket) => {
	initGames(socket);
	socket.on('callRaquette', () => {
		sendRaquette(socket);
	})
	socket.on('callMouvRaq', (data) => {
		mouvRaquette(socket, data);
	})
})



