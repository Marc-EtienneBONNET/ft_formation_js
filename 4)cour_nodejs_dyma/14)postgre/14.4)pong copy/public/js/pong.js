/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:56:12 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/26 18:54:01 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var socket = io();
//socket.on('takeGame', init)
socket.on('takeRaquette', drawRaquette)
socket.on('sendGameValue', init);
socket.on('sendRaquette', drawRaquette);
socket.on('clearRaquette', clearRaquette);
var wichRaquette = 0;

function init(data)
{
	var parent = document.getElementById('pong');
	canvas = document.createElement('canvas');
	canvas.width =  data.games.rows[0].canvasx;
	canvas.height = data.games.rows[0].canvasy;
	canvas.style.border = "1px solid";
	ctx = canvas.getContext('2d');
	parent.appendChild(canvas);
	socket.emit('callRaquette');
	wichRaquette = data.wichRaq;
}

function drawRaquette(raquette)
{
	var raquette1 = raquette.rows[1];
	var raquette2 = raquette.rows[0];
	ctx.fillStyle = "#000000";
	ctx.fillRect(raquette1.p_x, raquette1.p_y,  raquette1.t_y/5, raquette1.t_y);
	ctx.fillRect(raquette2.p_x, raquette2.p_y,  raquette2.t_y/5, raquette2.t_y);
}

function clearRaquette(data)
{
	var tmp = data.raquette.rows[0];
	if (data.wichRaqu == 1)
		tmp = data.raquette.rows[1];
	if (data.sence < 0)
		ctx.clearRect(tmp.p_x, tmp.p_y + tmp.t_y , tmp.t_y/5, data.sence * -1);
	else 
		ctx.clearRect(tmp.p_x, tmp.p_y - data.sence, tmp.t_y/5, data.sence);

}

document.onkeydown = function mouvRaquette(e)
{		
	if (e.keyCode == 39)
		socket.emit('callMouvRaq',{sence:-5, raquette:wichRaquette});
	else if (e.keyCode == 37)
		socket.emit('callMouvRaq',{sence:+5, raquette:wichRaquette});
}

