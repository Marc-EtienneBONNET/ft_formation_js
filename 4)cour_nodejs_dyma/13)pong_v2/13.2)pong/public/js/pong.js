/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:56:12 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/21 17:19:23 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//variable d init
var canvas;
var ctx;
var b_xTmp;
var b_yTmp;
var witchRaquette = 0;
var end = 0;
var myNameGame;


function init()
{
	axios.post('/PlayPong/takeGame', {name:myNameGame})
		.then((res) => {
			console.log(res);
			canvas = document.createElement('canvas');
			canvas.width =  res.data.canvasX;
			canvas.height = res.data.canvasY;;
			canvas.style.border = "1px solid";
			document.body.appendChild(canvas);
			ctx = canvas.getContext('2d');
			chooseRaquette();
		})
}

function writeDecoAndInfo()
{
	axios.post('/PlayPong/takeGame', {name:myNameGame})
	.then((res) => {
			ctx.fillStyle = "#000000";
			ctx.fillRect(res.data.canvasX/2,0 ,1 ,res.data.canvasY);
			ctx.font = "20pt Calibri,Geneva,Arial";
			ctx.clearRect(10, 0, 100 , 45);
			ctx.fillText(res.data.pointPlayerOne + " | " + res.data.pointPlayerTwo , 10, 40);
			if (res.data.pointPlayerOne >= 5 || res.data.pointPlayerTwo >= 5)
				end = 1;
		})
		.catch(err => {
			return (err);
		});
}

function theEnd()
{
	var str = "Looser";
	axios.post('/PlayPong/takeGame', {name:myNameGame})
	.then((res) => {
			ctx.fillStyle = "#000000";
			ctx.font = "40pt Calibri,Geneva,Arial";
			if ((witchRaquette == 1 && res.data.pointPlayerOne >= 5) ||
				(witchRaquette == 2 && res.data.pointPlayerTwo >= 5))
				str = "Winner"
			else if (witchRaquette != 1 && witchRaquette != 2)
				str = "  End"
			ctx.fillText(str, res.data.canvasX/2 - 80 , res.data.canvasY/2 - 50);
			ctx.fillText(res.data.pointPlayerOne + " | " + res.data.pointPlayerTwo , res.data.canvasX/2 - 60 , res.data.canvasY/2 + 50);
		})
		.catch(err => {
			return (err);
		});
}

function drawBall()
{
	axios.post('/PlayPong/takeGame', {name:myNameGame})
	.then((res) => {
			ctx.fillStyle = "#000000";
			ctx.clearRect(b_xTmp, b_yTmp, res.data.blockSize, res.data.blockSize);
			ctx.beginPath();
			ctx.arc(res.data.b_X,res.data.b_Y, res.data.blockSize/2, 0, Math.PI*2, true);
			ctx.fill();
			b_xTmp = res.data.b_X - res.data.blockSize/2;
			b_yTmp = res.data.b_Y - res.data.blockSize/2;
			if (witchRaquette == 1 && res.data.nb_player >= 2)
				axios.post('/PlayPong/mouvB', {gameName:myNameGame})
		})
		.catch(err => {
			return (err);
		});
}

function drawRaquettes()
{
	axios.post('/PlayPong/takeGame', {name:myNameGame})
	.then((res) => {
			ctx.fillStyle = "#000000";
			ctx.clearRect(res.data.blockSize, res.data.r1_Y - res.data.blockSize * 2, res.data.blockSize, (res.data.blockSize * 3) + res.data.t_Y);
			ctx.clearRect(res.data.canvasX - (2 * res.data.blockSize), res.data.r2_Y - res.data.blockSize * 2, (res.data.blockSize), (res.data.blockSize * 3) + res.data.t_Y);
			ctx.fillRect(res.data.r1_X, res.data.r1_Y, res.data.t_X, res.data.t_Y);
			ctx.fillRect(res.data.r2_X, res.data.r2_Y, res.data.t_X, res.data.t_Y);
		})
		.catch(err => {
			return (err);
		});
}

function chooseRaquette()
{
	axios.post('/PlayPong/takeGame', {name:myNameGame})
			.then((res) => {
				if (res.data.nb_player == 0)
					witchRaquette = 1;
				else if (res.data.nb_player == 1)
					witchRaquette = 2;
				else
				 	witchRaquette = 3;
				axios.post('/PlayPong/addPlayer', {name:myNameGame})
			})
}



function myRefresh()
{
	drawBall();
	drawRaquettes();
	writeDecoAndInfo();
	console.log(myNameGame);
	if (end == 1)
	{
		theEnd();
		return ;
	}
 	setTimeout(myRefresh, 10);
}

document.onkeydown = function mouvRaquette(e)
{
	if (witchRaquette != 1 && witchRaquette != 2)
		return ;
	axios.post('/PlayPong/takeGame', {name:myNameGame})
 		.then((res) => {
			if (witchRaquette == 1)
 			{
				 if (res.data.r1_Y > 0 && e.keyCode == 39)
				 	axios.post('/PlayPong/mouvR_Y', {raquette:witchRaquette, mouv:-5, gameName:myNameGame})
				 else if (res.data.r1_Y < res.data.canvasY - res.data.t_Y && e.keyCode == 37 )
				 	axios.post('/PlayPong/mouvR_Y', {raquette:witchRaquette, mouv:+5, gameName:myNameGame})
			}
			else if (witchRaquette == 2)
			{
				if (res.data.r2_Y > 0 && e.keyCode == 39)
					axios.post('/PlayPong/mouvR_Y', {raquette:witchRaquette, mouv:-5, gameName:myNameGame})
				else if (res.data.r2_Y < res.data.canvasY - res.data.t_Y && e.keyCode == 37 )
					axios.post('/PlayPong/mouvR_Y', {raquette:witchRaquette, mouv:+5, gameName:myNameGame})
			} 
			//else if ((witchRaquette == 1 || witchRaquette == 2) && e.keyCode == 13)
	});
}

window.onload = function() // function playPong()
{
	axios.post('/PlayPong/wichName')
			.then((res) => {
				myNameGame = res.data.name;
				init();
				myRefresh();
			})
}