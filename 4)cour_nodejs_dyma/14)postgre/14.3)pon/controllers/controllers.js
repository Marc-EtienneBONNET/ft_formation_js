/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controllers.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 17:09:00 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/25 08:36:29 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const {SQLcreateGames, SQLcreatePlayers, SQLcreateRaquettes, SQLcreateBall, SQLsupTable, SQLselectTable, SQLaddBall, SQLaddRaquette, SQLaddPlayer, SQLaddGame} = require('./../database/cmdQuery');
const {client1} = require('./../database/index');

async function showTables()
{
	try{
		await client1.query(SQLselectTable("balls"), (err, res) => {
			if (err){console.log(err);}
			else
			{
				console.log("Balls : ");
				console.log(res.rows);
			}
		});
		await client1.query(SQLselectTable("Players"), (err, res) => {
			if (err){console.log(err);}
			else{
				console.log("Players : ");
				console.log(res.rows);
			}
		});
		await client1.query(SQLselectTable("raquettes"), (err, res) => {
			if (err){console.log(err);}
			else
			{
				console.log("Raquettes : ");
				console.log(res.rows);
			}
		});
		await client1.query(SQLselectTable("games"), (err, res) => {
			if (err){console.log(err);}
			else
			{
				console.log("Games : ");
				console.log(res.rows);
			}
		});
	}catch(err){
		console.log(err);
	}
}

async function createAllTables()
{
	try {
		await client1.query(SQLcreateBall, (err, res) => {
			if (err){console.log("balls already exists")}
			else 
			{
				console.log("balls is create !")
			}
		})
		await client1.query(SQLcreateRaquettes, (err, res) => {
			if (err){console.log("raquettes already exists")}
			else 
			{
				console.log("raquettes is create !")
			}
		})
		await client1.query(SQLcreatePlayers, (err, res) => {
			if (err){console.log("Players already exists")}
			else 
			{
				console.log("Players is create !")
			}
		})
		await client1.query(SQLcreateGames, (err, res) => {
			if (err){console.log("Games already exists")}
			else 
			{
				console.log("Games is create !")
			}
		})
	}catch(err){
		console.log(err);
	}
}

async function supAllTables()
{
	try {
		await client1.query(SQLsupTable("games"), (err, res) => {
			console.log("Games is dead");
		});
		await client1.query(SQLsupTable("Players"), (err, res) => {
			console.log("Players is dead");
		});
		await client1.query(SQLsupTable("raquettes"), (err, res) => {
			console.log("Raquettes is dead");
			});
		await client1.query(SQLsupTable("balls"), (err, res) => {
			console.log("Balls is dead");
	});
	}catch(err){
		console.log(err);
	}
}

async function initNewGame()
{
	await createAllTables();
	var canvasX = 1000;
	await client1.query(SQLaddGame(canvasX,canvasX*0.6,canvasX/50,1));
	await client1.query(SQLaddBall(canvasX/2,(canvasX*0.6)/2,1,1));	
	await client1.query(SQLaddRaquette(canvasX/50,(canvasX*0.6)/2 - (2,5 * canvasX/50), 5 * (canvasX/50)));			
	await client1.query(SQLaddRaquette(canvasX - (canvasX/50) * 2,(canvasX*0.6)/2 - (2,5 * (canvasX/50)), 5 * (canvasX/50)));
	await client1.query(SQLaddPlayer("player1"));
	await client1.query(SQLaddPlayer('player2'));
	var raquettes_des = await client1.query(`SELECT * FROM raquettes ORDER BY raquette_id DESC`);
	var players_des = await client1.query(`SELECT * FROM players ORDER BY player_id DESC`);
	var balls_des = await client1.query(`SELECT * FROM balls ORDER BY ball_id DESC`);
	var games_des = await client1.query(`SELECT * FROM games ORDER BY game_id DESC`);
	await client1.query(`UPDATE players SET raquette_id=`+ raquettes_des.rows[0].raquette_id +` WHERE player_id = `+ players_des.rows[0].player_id +`;`).then(() => {console.log("Tout vas bien");}).catch(err => {console.log("il y a un probleme")});
	await client1.query(`UPDATE players SET raquette_id=`+ raquettes_des.rows[1].raquette_id +` WHERE player_id = `+ players_des.rows[1].player_id +`;`).then(() => {console.log("Tout vas bien");}).catch(err => {console.log("il y a un probleme")});
	await client1.query(`UPDATE games SET ball_id=`+ balls_des.rows[0].ball_id +` WHERE game_id = `+ games_des.rows[0].game_id +`;`).then(() => {console.log("Tout vas bien");}).catch(err => {console.log("il y a un probleme")});
	await client1.query(`UPDATE games SET raquette1_id=`+ raquettes_des.rows[1].raquette_id +` WHERE game_id = `+ games_des.rows[0].game_id +`;`).then(() => {console.log("Tout vas bien");}).catch(err => {console.log("il y a un probleme")});
	await client1.query(`UPDATE games SET raquette2_id=`+ raquettes_des.rows[0].raquette_id +` WHERE game_id = `+ games_des.rows[0].game_id +`;`).then(() => {console.log("Tout vas bien");}).catch(err => {console.log("il y a un probleme")});
	

}


exports.newGame = async function(myreq, myres)
{
	//await initNewGame();
	//await showTables();
	//supAllTables();
	myres.render('pong');
}

