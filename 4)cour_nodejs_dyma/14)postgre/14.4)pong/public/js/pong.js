/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:56:12 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/25 11:35:40 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var socket = io();

socket.on('takeGame', init)
socket.on('takeRaquette', drawRaquette)


function init(data)
{
	var parent = document.getElementById('pong');
	canvas = document.createElement('canvas');
	canvas.width =  data.canvasx;
	canvas.height = data.canvasy;;
	canvas.style.border = "1px solid";
	parent.appendChild(canvas);
	ctx = canvas.getContext('2d');
	//drawRaquette();
}

function drawRaquette(raquette)
{
	console.log(raquette);
	ctx.fillStyle = "#000000";
	ctx.clearRect(raquette.p_x, raquette.p_y - raquette.t_y/5, raquette.t_y/5, raquette.t_y/5);
	ctx.clearRect(raquette.p_x, raquette.p_y + raquette.t_y, raquette.t_y/5, raquette.t_y/5);
	ctx.fillRect(raquette.p_x, raquette.p_y,  raquette.t_y/5, raquette.t_y);
}

document.onkeydown = function mouvRaquette(e)
{
	if (e.keyCode == 39 || e.keyCode == 37)

	if (e.keyCode == 39)
		socket.emit('Rmouv',{sence:-5,raquette:"1"});
	else if (e.keyCode == 37)
		socket.emit('Rmouv',{sence:+5,raquette:"1"});	
	if (e.keyCode == 39 || e.keyCode == 37)
		socket.emit('takeRaquette');
}

// // function writeDecoAndInfo()
// // {
// // 	axios.post('/PlayPong/takeGame', {name:myNameGame})
// // 	.then((res) => {
// // 			ctx.fillStyle = "#000000";
// // 			ctx.fillRect(res.data.canvasX/2,0 ,1 ,res.data.canvasY);
// // 			ctx.font = "20pt Calibri,Geneva,Arial";
// // 			ctx.clearRect(10, 0, 100 , 45);
// // 			ctx.fillText(res.data.pointPlayerOne + " | " + res.data.pointPlayerTwo , 10, 40);
// // 			if (res.data.pointPlayerOne >= 5 || res.data.pointPlayerTwo >= 5)
// // 				end = 1;
// // 		})
// // 		.catch(err => {
// // 			return (err);
// // 		});
// // }

// // function theEnd()
// // {
// // 	var str = "Looser";
// // 	axios.post('/PlayPong/takeGame', {name:myNameGame})
// // 	.then((res) => {
// // 			ctx.fillStyle = "#000000";
// // 			ctx.font = "40pt Calibri,Geneva,Arial";
// // 			if ((witchRaquette == 1 && res.data.pointPlayerOne >= 5) ||
// // 				(witchRaquette == 2 && res.data.pointPlayerTwo >= 5))
// // 				str = "Winner"
// // 			else if (witchRaquette != 1 && witchRaquette != 2)
// // 				str = "  End"
// // 			ctx.fillText(str, res.data.canvasX/2 - 80 , res.data.canvasY/2 - 50);
// // 			ctx.fillText(res.data.pointPlayerOne + " | " + res.data.pointPlayerTwo , res.data.canvasX/2 - 60 , res.data.canvasY/2 + 50);
// // 		})
// // 		.catch(err => {
// // 			return (err);
// // 		});
// // }

// // function drawBall()
// // {
// // 	axios.post('/PlayPong/takeGame', {name:myNameGame})
// // 	.then((res) => {
// // 			ctx.fillStyle = "#000000";
// // 			ctx.clearRect(b_xTmp, b_yTmp, res.data.blockSize, res.data.blockSize);
// // 			ctx.beginPath();
// // 			ctx.arc(res.data.b_X,res.data.b_Y, res.data.blockSize/2, 0, Math.PI*2, true);
// // 			ctx.fill();
// // 			b_xTmp = res.data.b_X - res.data.blockSize/2;
// // 			b_yTmp = res.data.b_Y - res.data.blockSize/2;
// // 			if (witchRaquette == 1 && res.data.nb_player >= 2)
// // 				axios.post('/PlayPong/mouvB', {gameName:myNameGame})
// // 		})
// // 		.catch(err => {
// // 			return (err);
// // 		});
// // }



// // function chooseRaquette()
// // {
// // 	axios.post('/PlayPong/takeGame', {name:myNameGame})
// // 			.then((res) => {
// // 				if (res.data.nb_player == 0)
// // 					witchRaquette = 1;
// // 				else if (res.data.nb_player == 1)
// // 					witchRaquette = 2;
// // 				else
// // 				 	witchRaquette = 3;
// // 				axios.post('/PlayPong/addPlayer', {name:myNameGame})
// // 			})
// // }



// // function myRefresh()
// // {
// // 	drawBall();
// // 	drawRaquettes();
// // 	writeDecoAndInfo();
// // 	console.log(myNameGame);
// // 	if (end == 1)
// // 	{
// // 		theEnd();
// // 		return ;
// // 	}
// //  	setTimeout(myRefresh, 10);
// // }



// window.onload = function() // function playPong()
// {
	
// 	init();
// 	myRefresh();
// }