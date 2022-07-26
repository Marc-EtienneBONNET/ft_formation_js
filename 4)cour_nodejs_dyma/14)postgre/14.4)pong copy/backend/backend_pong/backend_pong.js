/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   backend_pong.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 10:15:03 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/26 18:55:45 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var {
	DeleteAllTableByName, 
	DeleteOneRaquette,
	DeleteOneBall,
	DeleteOneGame
} = require('./../../database/apiPong/delete');
var {
	CreateTableGames, 
	CreateTableRaquettes,
	CreateTableBalls
} = require('./../../database/apiPong/create');
var {
	insertRaquette,
	insertBall,
	insertGame
} = require('./../../database/apiPong/insert');
var {
	takeRaquette, takeBall, takeGame,
	takeAllRaquette, takeAllBall, takeAllGame,
	takeAllRaquetteDes, takeAllBallDes, takeAllGameDes
} = require('./../../database/apiPong/take');
var {
	mouvRaquettePx, mouvRaquettePy, mouvRaquetteTy, mouvRaquetteConnect,
	mouvBallPx, mouvBallPy, mouvBallMx, mouvBallMy,
	mouvGameRaquette1,mouvGameRaquette2,mouvGameBall,mouvGameCanvasX,mouvGameCanvasY,mouvGameBlocksize,mouvGameDificult
} = require('./../../database/apiPong/mouv');

var wichRaquette = 0;

async function showTables()
{
	var raq = await takeAllRaquette();
	var ball = await takeAllBall();
	var game = await takeAllGame();
	console.log("raquettes : ")
	console.log(raq.rows);
	console.log("balls : ")
	console.log(ball.rows);
	console.log("Games : ")
	console.log(game.rows);
}


async function createTab()
{
	try{
		await CreateTableBalls();
		await CreateTableRaquettes();
		await CreateTableGames();
		console.log("the database is create")
	}
	catch(e){console.log("the database is already create")}
}

async function initNewMembre()
{
	try{
		await insertGame();
		await insertBall();
		await insertRaquette();
		await insertRaquette();
	   console.log("the game, raquette1 raquette2, player1 and player2 and the ball is init")
   }
   catch(e){console.log("erreur l or de l init des ellement du game " + e)}
}

async function insertInitValue()
{
	try{
		var tmp;
		var canvasX = 500;
		tmp = await takeAllRaquetteDes();
		var raquette1 = tmp.rows[1];
		var raquette2 = tmp.rows[0];
		tmp = await takeAllBallDes();
		var ball = tmp.rows[0];
		tmp = await takeAllGameDes();
		var game = tmp.rows[0];
		//init des valeur du game;
		await mouvGameRaquette1(raquette1.raquette_id, game.game_id);
		await mouvGameRaquette2(raquette2.raquette_id, game.game_id);
		await mouvGameBall(ball.ball_id, game.game_id);
		await mouvGameCanvasX(canvasX, game.game_id);
		await mouvGameCanvasY(canvasX*0.6, game.game_id);
		await mouvGameBlocksize(canvasX/50, game.game_id);
		await mouvGameDificult(1, game.game_id);
		tmp = await takeAllGameDes();
		var game = tmp.rows[0];
		//init des valeur des deux raquette
		await mouvRaquettePx(game.blocksize, raquette1.raquette_id);
		await mouvRaquettePy(game.canvasy/2 - (game.blocksize * 0.2), raquette1.raquette_id);
		await mouvRaquetteTy(game.blocksize * (5 - game.dificult), raquette1.raquette_id);
		await mouvRaquettePx(game.canvasx - (game.blocksize * 2), raquette2.raquette_id);
		await mouvRaquettePy(game.canvasy/2 - (game.blocksize * 0.2), raquette2.raquette_id);
		await mouvRaquetteTy(game.blocksize * (5 - game.dificult), raquette2.raquette_id);
		//init de la ball 
		await mouvBallPx(game.canvasx/2, ball.ball_id);
		await mouvBallPy(game.canvasy/2, ball.ball_id);
		await mouvBallMx(1, ball.ball_id);
		await mouvBallMy(1, ball.ball_id);		
	}
	catch(e){console.log("erreur l or de la rentrer des valeur d init " + e)}
}

async function chooseGame()
{
	var tmp = await takeAllGame();
	for (var x = 0; tmp && tmp.rows[x]; x++)
	{
		var raquette1 = await takeRaquette(tmp.rows[x].raquette1_id);
		var raquette2 = await takeRaquette(tmp.rows[x].raquette2_id);
		if (raquette1.rows[0].connect == null)
		{
			wichRaquette = 1;
			await mouvRaquetteConnect(true,raquette1.rows[0].raquette_id);
			break ;
		}
		else if (raquette2.rows[0].connect == null)
		{
			wichRaquette = 2;
			await mouvRaquetteConnect(true,raquette2.rows[0].raquette_id);
			break ;
		}
		else
			wichRaquette = 0;
		
	}
	if (wichRaquette == 0)
	{
		await initNewMembre();
		await insertInitValue();
		var raq = await takeAllRaquetteDes();
		wichRaquette = 1;
		await mouvRaquetteConnect(true,raq.rows[1].raquette_id);
	}
	console.log(wichRaquette);	
}

exports.initGames = async function(socket)
{
	await createTab();
	await chooseGame();
	//await showTables();
	console.log("ici : " + wichRaquette)
	socket.emit('sendGameValue', {games:await takeAllGameDes(), wichRaq:wichRaquette})
}

exports.sendRaquette = async function(socket)
{
	socket.emit('sendRaquette', await takeAllRaquetteDes())
}

exports.mouvRaquette = async function(socket, data)
{
	var raquettes = await takeAllRaquetteDes();
	var wichRaquette = data.raquette - 1;
	await mouvRaquettePy(raquettes.rows[wichRaquette].p_y + data.sence,raquettes.rows[wichRaquette].raquette_id)
	socket.emit('clearRaquette', {raquette:await takeAllRaquetteDes(), wichRaqu:data.raquette - 1, sence:data.sence})
	socket.emit('sendRaquette', await takeAllRaquetteDes())
}