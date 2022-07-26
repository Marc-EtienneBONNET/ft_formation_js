/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:36:04 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/25 11:27:18 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const {SQLcreateGames, SQLcreatePlayers, SQLcreateRaquettes, SQLcreateBall, SQLsupTable, SQLselectTable, SQLaddBall, SQLaddRaquette, SQLaddPlayer, SQLaddGame} = require('./database/cmdQuery');
const router = require('./routes/index');
const express = require('express');
const path = require('path');
const app = express();
require('./database/index');
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



server.listen(port, () => {
	
});

io.on('connection', (socket) => {
	console.log("test reussie !");
	client1.query(SQLselectTable("games"), (err, res) => {
		if (err){console.log(err);}
		else
		{
			socket.emit('takeGame', res.rows[0])
		}
	});
	socket.on('takeRaquette', (data) => {
		client1.query(SQLselectTable("games"),(err, res) => {
			client1.query(`SELECT * FROM raquettes WHERE raquette_id=`+ res.rows[0].raquette1_id +`;`,(err, raq) => {
				socket.emit('takeRaquette', raq.rows[0]);	
			});	
		});
	})
	socket.on('Rmouv', (data) => {
		client1.query(SQLselectTable("games"),(err, res) => {
			client1.query(`SELECT * FROM raquettes WHERE raquette_id=`+ res.rows[0].raquette1_id +`;`,(err, raq) => {
				client1.query(`UPDATE raquettes SET p_y=`+  (raq.rows[0].p_y + data.sence) +` WHERE raquette_id = `+ res.rows[0].raquette1_id +`;`, () => {	
				});	
			});	
		});
	});
		
		//const raquettes = client1.query(SQLselectTable("raquettes"))
		
		
		//console.log(games.rows);
		// , (err, res) => {
		// 	if (err){console.log(err);}
		// 	else
		// 	{
		// 		console.log("coucou");
		// 		client1.query(`UPDATE raquettes SET p_y+=`+ data.sence +` WHERE raquette_id = `+ + res.rows[0].raquette1_id +`;`, (err , retour) => {
		// 			if (err) console.log("coucou");
		// 			console.log(retour.rows);
		// 		})
		// 		// client1.query( `SELECT * FROM raquettes WHERE raquette_id=` + res.rows[0].raquette1_id +`;`, (err, retour) => {
		// 		// 	socket.emit('drawRaquette', retour.rows)
		// 		// })
			 
		// 	}
		// });
})



