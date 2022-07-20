/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:56:12 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/20 18:46:16 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//variable d init
var canvas;
var ctx;
var b_xTmp;
var b_yTmp;
witchRaquette = 1;

function init()
{
	axios.post('/api/takeGame?name=1')
		.then((res) => {
			canvas = document.createElement('canvas');
			canvas.width =  res.data.canvasX;
			canvas.height = res.data.canvasY;;
			canvas.style.border = "1px solid";
			document.body.appendChild(canvas);
			ctx = canvas.getContext('2d');
			drawRaquettes();
		})
	axios.post('/api/addPlayer?name=1')
	chooseRaquette();
}

function drawBall()
{
	axios.post('/api/takeGame?name=1')
	.then((res) => {
			ctx.fillStyle = "#000000";
			ctx.clearRect(b_xTmp, b_yTmp, res.data.blockSize, res.data.blockSize);
			ctx.beginPath();
			ctx.arc(res.data.b_X,res.data.b_Y, res.data.blockSize/2, 0, Math.PI*2, true);
			ctx.fill();
			b_xTmp = res.data.b_X - res.data.blockSize/2;
			b_yTmp = res.data.b_Y - res.data.blockSize/2;
			if (witchRaquette == 1)
			{
				axios.post('/api/mouvB', {gameName:1})
			}
		})
		.catch(err => {
			return (err);
		});
}

function drawRaquettes()
{
	axios.post('/api/takeGame?name=1')
	.then((res) => {
			ctx.fillStyle = "#000000";
			ctx.clearRect(res.data.blockSize, res.data.r1_Y - res.data.blockSize, res.data.blockSize, (res.data.blockSize * 2) + res.data.t_Y);
			ctx.clearRect(res.data.canvasX - (2 * res.data.blockSize), res.data.r2_Y - res.data.blockSize, (res.data.blockSize), (res.data.blockSize * 2) + res.data.t_Y);
			ctx.fillRect(res.data.r1_X, res.data.r1_Y, res.data.t_X, res.data.t_Y);
			ctx.fillRect(res.data.r2_X, res.data.r2_Y, res.data.t_X, res.data.t_Y);
		})
		.catch(err => {
			return (err);
		});
}

function chooseRaquette()
{
	axios.post('/api/takeGame?name=1')
			.then((res) => {
				if (res.data.nb_player == 0)
					witchRaquette = 1;
				else if (res.data.nb_player == 1)
					witchRaquette = 2;
			})
}


function myRefresh()
{
	drawBall();
	drawRaquettes()
 	setTimeout(myRefresh, 2);
}

document.onkeydown = function mouvRaquette(e)
{
	axios.post('/api/takeGame?name=1')
 		.then((res) => {
			if (witchRaquette == 1)
 			{
				 if (res.data.r1_Y > 0 && e.keyCode == 39)
				 	axios.post('/api/mouvR_Y', {raquette:witchRaquette, mouv:-5, gameName:1})
				 else if (res.data.r1_Y < 600 - res.data.t_Y && e.keyCode == 37 )
				 	axios.post('/api/mouvR_Y', {raquette:witchRaquette, mouv:+5, gameName:1})
			}
			else if (witchRaquette == 2)
			{
				if (res.data.r2_Y > 0 && e.keyCode == 39)
					axios.post('/api/mouvR_Y', {raquette:witchRaquette, mouv:-5, gameName:1})
				else if (res.data.r2_Y < 600 - res.data.t_Y && e.keyCode == 37 )
					axios.post('/api/mouvR_Y', {raquette:witchRaquette, mouv:+5, gameName:1})
			} 
			//else if ((witchRaquette == 1 || witchRaquette == 2) && e.keyCode == 13)
	});
}

window.onload = function() // function playPong()
{
	init();
	myRefresh();
}