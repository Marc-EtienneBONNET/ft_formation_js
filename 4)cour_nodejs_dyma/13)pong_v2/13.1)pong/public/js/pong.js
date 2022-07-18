/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:56:12 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/18 17:05:47 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

//variable d init
var canvas;
var ctx;
var canvasWidth = 1000;
var canvasHeigth = 600;

//varaibel qu il faudra envoyer perpetuellement a la base de donner 
	//position x et y de la raquette adverse + 

function init()
{
	canvas = document.createElement('canvas');
	canvas.width = canvasWidth;
	canvas.height = canvasHeigth;
	canvas.style.border = "1px solid";
	document.body.appendChild(canvas);
	ctx = canvas.getContext('2d');
}

function mouvBlockMoin()
{
	axios.get('/pong/mouvPosMoin')
			.then(() => {
				console.log("on y est");
			})
			.catch(err => {
				return (err);
			})
}

function mouvBlockPlus()
{
	axios.get('/pong/mouvPosPlus')
			.then(() => {
				console.log("on y est");
			})
			.catch(err => {
				return (err);
			})
}

function drawBlock()
{
	axios.get('/pong/takePos')
	.then((res) => {
			ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
			ctx.fillStyle = "#000000";
			ctx.fillRect(res.data.posX, res.data.posY, res.data.tailleX, res.data.tailleY);
		})
		.catch(err => {
			return (err);
		});
	setTimeout(drawBlock, 50);
}

document.onkeydown = function mouvRaquette(e)
{
	if (e.keyCode == 39)
		mouvBlockMoin();
	else if (e.keyCode == 37)
		mouvBlockPlus();

}

window.onload = function() // function playPong()
{
	init();
	drawBlock();
}