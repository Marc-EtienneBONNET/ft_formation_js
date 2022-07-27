/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:56:12 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 18:36:53 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var socket = io();
//socket.on('takeGame', init)
socket.on('takeRaquette', drawRaquette)
socket.on('sendGameValue', init);
socket.on('sendRaquette', drawRaquette);
socket.on('sendBall', drawBall);
socket.on('checkPlay', checkPlay);
socket.on('drawScorAndDeco', drawScorAndDeco);

var raqId = 0;
var game;
var ctx;
var ballx = 0;
var bally = 0;

function checkPlay()
{
	socket.emit('callPlay', {game:game});
}

function init(data)
{
	var parent = document.getElementById('pong');
	canvas = document.createElement('canvas');
	canvas.width =  data.game.canvasx;
	canvas.height = data.game.canvasy;
	canvas.style.border = "1px solid";
	ctx = canvas.getContext('2d');
	parent.appendChild(canvas);
	raqId = data.raqId;
	game = data.game;
	socket.emit('callRaquette', {game:game});
}

function end(data)
{
	var str = " Winner "
	if (data.game.pointplayer1 == 5 && raqId%2 == 0)
		str = "GameOver";
	ctx.fillStyle = "#000000";
	ctx.font = "30pt Calibri,Geneva,Arial";
	ctx.fillText(str, data.game.canvasx/2 - 80 , data.game.canvasy/2 - 30);
	ctx.font = "40pt Calibri,Geneva,Arial";
	ctx.fillText(data.game.pointplayer1 + " | " +  data.game.pointplayer2, data.game.canvasx/2 - 60 , data.game.canvasy/2 + 30);
	if (raqId == 1)
		socket.emit('end', {game:game});
}

function drawScorAndDeco(data)
{
	ctx.fillStyle = "#000000";
	ctx.font = "10pt Calibri,Geneva,Arial";
	ctx.clearRect(10,9, 50, 12);
	ctx.fillRect(data.game.canvasx/2, 0,  1, data.game.canvasy);
	ctx.fillText(data.game.pointplayer1 + " | " +  data.game.pointplayer2, 10 ,  20);
}

function drawRaquette(raquette)
{
	var raquette1 = raquette.raq1;
	var raquette2 = raquette.raq2;
	ctx.fillStyle = "#000000";
	ctx.clearRect(raquette1.p_x, raquette1.p_y - 10, raquette1.t_y/5, raquette1.t_y + 20);
	ctx.clearRect(raquette2.p_x, raquette2.p_y - 10, raquette2.t_y/5, raquette2.t_y + 20);
	ctx.fillRect(raquette1.p_x, raquette1.p_y,  raquette1.t_y/5, raquette1.t_y);
	ctx.fillRect(raquette2.p_x, raquette2.p_y,  raquette2.t_y/5, raquette2.t_y);
}


function drawBall(data)
{
	ctx.clearRect(ballx - (data.game.blocksize/2),bally - (data.game.blocksize/2), data.game.blocksize, data.game.blocksize);
	ctx.beginPath();
	ctx.arc(data.ball.rows[0].p_x,data.ball.rows[0].p_y, data.game.blocksize/2, 0, Math.PI*2, true);
	ballx = data.ball.rows[0].p_x;
	bally = data.ball.rows[0].p_y;
	ctx.fill();
	if (data.game.pointplayer1 < 5 && data.game.pointplayer2 < 5 && data.game.fin != true)
		setTimeout(callball,3);
	else
		end(data);
}

function callball()
{
	socket.emit('callMouvBall', {game:game, raq:raqId});
	socket.emit('callRaquette', {game:game});
	socket.emit('drawScorAndDeco', {game:game});
}

document.onkeydown = function mouvRaquette(e)
{
	if (e.keyCode == 39)
		socket.emit('callMouvRaq',{sence:-5, raquette:raqId, game:game});
	else if (e.keyCode == 37)
		socket.emit('callMouvRaq',{sence:+5, raquette:raqId, game:game});
}

