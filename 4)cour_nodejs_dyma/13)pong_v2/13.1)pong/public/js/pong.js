/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:56:12 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/19 19:08:20 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//variable d init
var canvas;
var ctx;
var canvasWidth = 1000;
var canvasHeigth = 600;
witchRaquette = 1;

function init()
{
	canvas = document.createElement('canvas');
	canvas.width = canvasWidth;
	canvas.height = canvasHeigth;
	canvas.style.border = "1px solid";
	document.body.appendChild(canvas);
	ctx = canvas.getContext('2d');
	chooseRaquette();
}

function drawRaquettes()
{
	axios.post('/pong/takeRaquette?str=1')
	.then((res) => {
			ctx.fillStyle = "#000000";
			ctx.clearRect(20, 0, 40, canvasHeigth);
			ctx.fillRect(res.data.posX, res.data.posY, res.data.tailleX, res.data.tailleY);
		})
		.catch(err => {
			return (err);
		});
	axios.post('/pong/takeRaquette?str=2')
	.then((res) => {
			ctx.fillStyle = "#000000";
			ctx.clearRect(960, 0, 980, canvasHeigth);
			ctx.fillRect(res.data.posX, res.data.posY, res.data.tailleX, res.data.tailleY);
		})
		.catch(err => {
			return (err);
		});
}

function chooseRaquette()
{
	axios.get('/pong/chooseMyRaquette')
			.then((res) => {
				if (res.data.use == 1)
					witchRaquette = 1;
				else if (res.data.use == 2)
					witchRaquette = 2;
			})
}


function myRefresh()
{
	drawRaquettes();
	setTimeout(myRefresh, 2);
}

document.onkeydown = function mouvRaquette(e)
{
	axios.post('/pong/takeRaquette?str=' + witchRaquette)
		.then((res) => {
			if (res.data.posY > 0 && e.keyCode == 39)
				axios.post('/pong/mousRaquettePosYMoin?str=' + witchRaquette)
			else if (res.data.posY < 600 - res.data.tailleY && e.keyCode == 37 )
				axios.post('/pong/mousRaquettePosYPlus?str=' + witchRaquette)	
			else if (e.keyCode == 13)
				axios.get('/pong/closePlay')
	});
}

window.onload = function() // function playPong()
{
	init();
	drawRaquettes();
	myRefresh();
}