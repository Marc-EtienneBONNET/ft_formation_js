/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   backend_pong.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 10:15:03 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 16:24:27 by mbonnet          ###   ########.fr       */
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
	mouvGameRaquette1,mouvGameRaquette2,mouvGameBall,mouvGameCanvasX,mouvGameCanvasY,mouvGameBlocksize,mouvGameDificult,mouvGamePointPlayer1,mouvGamePointPlayer2
} = require('./../../database/apiPong/mouv');

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

function drawScor()
{
	

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
		await mouvGamePointPlayer1(0, game.game_id);
		await mouvGamePointPlayer2(0, game.game_id);
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

async function chooseGame(socket)
{
	var tmp = await takeAllGame();
	var game;
	var raqId = 0;
	for (var x = 0; tmp && tmp.rows[x]; x++)
	{
		var raquette1 = await takeRaquette(tmp.rows[x].raquette1_id);
		var raquette2 = await takeRaquette(tmp.rows[x].raquette2_id);
		if (raquette1.rows[0].connect == null) 
		{
			raqId = raquette1.rows[0].raquette_id;
			game = tmp.rows[x];
			await mouvRaquetteConnect(true,raquette1.rows[0].raquette_id);
			break ;
		}
		else if (raquette2.rows[0].connect == null)
		{
			raqId = raquette2.rows[0].raquette_id;
			game = tmp.rows[x];
			await mouvRaquetteConnect(true,raquette2.rows[0].raquette_id);
			break ;
		}
		else
		raqId = 0;
		
	}
	if (raqId == 0)
	{
		await initNewMembre();
		await insertInitValue();
		var raq = await takeAllRaquetteDes();
		var tmp2 =  await takeAllGameDes();
		game = tmp2.rows[0];
		raqId = raq.rows[1].raquette_id;
		await mouvRaquetteConnect(true,raq.rows[1].raquette_id);
	}
	return ({game:game, raqId:raqId});	
}

exports.initGames = async function(socket)
{
	await createTab();
	//await showTables();
	var tmp = await chooseGame(socket)
	socket.emit('sendGameValue', tmp)
	var tmp2 = {ball:await takeBall(tmp.game.ball_id), game:tmp.game}
	socket.emit('checkPlay')
	socket.emit('drawScorAndDeco', {game:tmp.game})
}

exports.drawScorAndDeco = async function(socket, data){
	var tmp = await takeGame(data.game.game_id);
	var game = tmp.rows[0]
	socket.emit('drawScorAndDeco', {game:game})
}




exports.checkPlay = async function(socket, data)
{
	var checkRaquette1 = await takeRaquette(data.game.raquette1_id);
	var checkRaquette2 = await takeRaquette(data.game.raquette2_id);
	var tmp2 = {ball:await takeBall(data.game.ball_id), game:data.game}
	if (checkRaquette1.rows[0].connect == true && checkRaquette2.rows[0].connect == true)
	{
		socket.emit('sendBall', tmp2);
		return ;
	}
	else 
		socket.emit('checkPlay')
}


exports.sendRaquette = async function(socket, data)
{
	var raq1 = await takeRaquette(data.game.raquette1_id);
	var raq2 = await takeRaquette(data.game.raquette2_id);
	socket.emit('sendRaquette', {raq1:raq1.rows[0], raq2:raq2.rows[0]})
}

exports.mouvRaquette = async function(socket, data)
{
	var game = await takeGame(data.game.game_id);
	var raquette = await takeRaquette(data.raquette);
	var raquette2;
	if (data.raquette%2 == 0)
		raquette2 = await takeRaquette(data.raquette - 1);
	else 
		raquette2 = await takeRaquette(data.raquette + 1);
	if ((raquette.rows[0].p_y > 0 || data.sence > 0) 
	&& (raquette.rows[0].p_y + raquette.rows[0].t_y < game.rows[0].canvasy || data.sence < 0))
	{
		await mouvRaquettePy(raquette.rows[0].p_y + data.sence, raquette.rows[0].raquette_id)
		raquette = await takeRaquette(data.raquette);
	}		
}

function calY(ball)
{
	var bm_y = ball.rows[0].m_y;
	var bm_x = ball.rows[0].m_x;
	var tmp2 = ball.rows[0].m_y; 
	var tmp = ball.rows[0].m_x; 
	if ( tmp < 0)
		tmp *= -1;
		bm_y = Math.round(tmp * Math.tan(30 * Math.PI / 100));
	if (tmp2 < 0 && bm_y > 0)
		bm_y *= -1;
	bm_x *= -1;
	return ({bm_y:bm_y, bm_x:bm_x});
}
function calX(ball)
{
	var bm_y = ball.rows[0].m_y;
	var bm_x = ball.rows[0].m_x;
	var tmp2 = ball.rows[0].m_x;
	var tmp = ball.rows[0].m_y;
	if ( tmp < 0)
		tmp *= -1;
	bm_x = -1 * Math.round(tmp/Math.tan(30 * Math.PI / 100));
	if (tmp2 > 0 && bm_x < 0)
		bm_x *= -1;
	bm_y *= -1;
	return ({bm_y:bm_y, bm_x:bm_x});
}

async function percut(game)
{
	var ball = await takeBall(game.rows[0].ball_id);
	var tmp = 0;
	if (ball.rows[0].p_x <= 0)
	{ 
		tmp = calY(ball);
		await mouvBallPx(game.rows[0].canvasx/2, ball.rows[0].ball_id)
		await mouvBallPy(game.rows[0].canvasy/2, ball.rows[0].ball_id)
		await mouvGamePointPlayer2(game.rows[0].pointplayer2 + 1, game.rows[0].game_id)
	}
	else if (ball.rows[0].p_x >= game.rows[0].canvasx)
	{ 
		tmp = calY(ball);
		await mouvBallPx(game.rows[0].canvasx/2, ball.rows[0].ball_id)
		await mouvBallPy(game.rows[0].canvasy/2, ball.rows[0].ball_id)
		await mouvGamePointPlayer1(game.rows[0].pointplayer1 + 1, game.rows[0].game_id)
	}
	else if (ball.rows[0].p_y <= 0 )
	{
		tmp = calX(ball);
		await mouvBallPy(1, ball.rows[0].ball_id)	
	}
	else if (ball.rows[0].p_y >= game.rows[0].canvasy)
	{
		tmp = calX(ball);
		await mouvBallPy(game.rows[0].canvasy - 1, ball.rows[0].ball_id)	
	}
	if (tmp != 0)
	{
		await mouvBallMx(tmp.bm_x, ball.rows[0].ball_id)	 
		await mouvBallMy(tmp.bm_y, ball.rows[0].ball_id)
	}
}

async function percutRaq(game)
{
	var tmp = await takeRaquette(game.rows[0].raquette1_id);
	var raquette1 = tmp.rows[0];
	tmp = await takeRaquette(game.rows[0].raquette2_id);
	var raquette2 = tmp.rows[0];
	tmp = await takeBall(game.rows[0].ball_id);
	var ball = tmp.rows[0]
	tmp = 0;
	if ((ball.p_x >= raquette1.p_x && ball.p_x <= raquette1.p_x + game.rows[0].blocksize
		&& ball.p_y >= raquette1.p_y && ball.p_y <= raquette1.p_y + raquette1.t_y)
		|| (ball.p_x >= raquette2.p_x && ball.p_x <= raquette2.p_x + game.rows[0].blocksize
		&& ball.p_y >= raquette2.p_y && ball.p_y <= raquette2.p_y + raquette2.t_y))
	{
		tmp = calY(await takeBall(game.rows[0].ball_id));
	}
	if (tmp != 0)
	{
		await mouvBallMx(tmp.bm_x, ball.ball_id)	 
		await mouvBallMy(tmp.bm_y, ball.ball_id)
	}
}

exports.mouvBall = async function(socket, data)
{
	var game = await takeGame(data.game.game_id);
	if (data.raq%2 == 0)
	{
		await percut(game);
		await percutRaq(game);
		var ball = await takeBall(game.rows[0].ball_id);
		await mouvBallPx(ball.rows[0].p_x + ball.rows[0].m_x, ball.rows[0].ball_id)	
		await mouvBallPy(ball.rows[0].p_y + ball.rows[0].m_y, ball.rows[0].ball_id)	
	}
	game = await takeGame(data.game.game_id);
	if (game.rows[0].pointplayer1 == 5 || game.rows[0].pointplayer2 == 5)
	{
		socket.emit('end', {game:game.rows[0]});
		return ;
	}
	var ball = await takeBall(game.rows[0].ball_id);
	socket.emit('sendBall', {ball:ball,game:game.rows[0]});
}