/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controllers.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 17:09:00 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/21 17:30:35 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const gameMod = require('./../database/model');

var bm_x = 1;
var bm_y = 1;
var angle = 30;

function calY()
{
	var tmp2 = bm_y; 
	var tmp = bm_x; 
	if ( tmp < 0)
		tmp *= -1;
		bm_y = Math.round(tmp * Math.tan(angle * Math.PI / 100));
	if (tmp2 < 0 && bm_y > 0)
		bm_y *= -1;
	bm_x *= -1;
}
function calX()
{
	var tmp2 = bm_x;
	var tmp = bm_y;
	if ( tmp < 0)
		tmp *= -1;
	bm_x = -1 * Math.round(tmp/Math.tan(angle * Math.PI / 100));
	if (tmp2 > 0 && bm_x < 0)
		bm_x *= -1;
	bm_y *= -1;
}
function percute(game)
{
	if (game.b_X >= game.canvasX)
	{
		game.b_X = game.canvasX/2;
		game.b_Y = game.canvasY/2;
		game.pointPlayerOne += 1;
		calY();
	}
	else if (game.b_X <= 0)
	{
		game.b_X = game.canvasX/2;
		game.b_Y = game.canvasY/2;
		game.pointPlayerTwo += 1;
		calY();
	}
	else if (game.b_Y >= game.canvasY)
	{
		game.b_Y = game.canvasY -1;
		calX();
	}
	else if (game.b_Y <= 0)
	{
		game.b_Y = 1;
		calX();
	}
}

function percuteRaquette(game)
{
	if (game.b_Y >= game.r1_Y && 
		game.b_Y <= game.r1_Y + game.t_Y && 
		game.b_X >= game.r1_X && 
		game.b_X <= game.r1_X + game.blockSize)
		calY();
	else if (game.b_Y >= game.r2_Y && 
		game.b_Y <= game.r2_Y + game.t_Y && 
		game.b_X >= game.r2_X && 
		game.b_X <= game.r2_X + game.blockSize)
		calY();
	
	
}

exports.mouvB = async function(req, res){
	var gameName = req.body.gameName;
	try{
		var game = await gameMod.findOne({name:gameName});
		percute(game);
		percuteRaquette(game);	
		game.b_X += bm_x;
		game.b_Y += bm_y;
		game.save();
		res.json({});
	}
	catch(e){console.log("erreur l or du deplacement de la ball")}
}

exports.mouvR_Y = async function(req, res){
	var gameName = req.body.gameName;
	var mouv = req.body.mouv;
	var raquette = req.body.raquette;
	try{
		var game = await gameMod.findOne({name:gameName});
		if (raquette == 1)
			game.r1_Y += mouv;
		else if (raquette == 2)
			game.r2_Y += mouv;
		game.save();
		res.json({});
	}
	catch(e){console.log("erreur l or du changememnt des valeur y de raquette")}
}

exports.addPlayer = async function(req, res){
	try{
		var game = await gameMod.findOne({name:req.body.name});
		game.nb_player += 1;
		game.save();
		res.json({});
	}catch(e){console.log("erreur l or de l ajoue de player")}
}

exports.takeGame = async function(req, res){
	try{
		var game = await gameMod.findOne({name:req.body.name}).exec();
		res.json(game);
	}
	catch(e){console.log("erreur l or du renvoie de l objet game")}
}

function initValueGame()
{
	var canvasHeigth = 500 * 0.6;
	var blockSize = 500/50;
	var newgame;
		newgame = new gameMod({
			name:new Date(),
			canvasX:500,
			canvasY:canvasHeigth,
			blockSize:blockSize,
			t_Y: 5 * blockSize,
			t_X: blockSize,
			r1_X: blockSize,
			r1_Y: canvasHeigth/2 - 5 * blockSize,
			r2_X: 500 - (2 * blockSize),
			r2_Y: canvasHeigth/2 - 5 * blockSize,
			b_Y: canvasHeigth/2 - 1,
			b_X: 500/2 - 1,
			nb_player: 0,
			pointPlayerOne: 0,
			pointPlayerTwo: 0,
		})		
		newgame.save();
}

exports.takeGames = async function(req, res)
{
	try{
		var game = await gameMod.find({});
		for (var x = 0; game[x]; x++)
			if (game[x].nb_player < 2)
				break;
		if (game[x] === undefined)
		{
			console.log("nouvel partie");
			initValueGame()
		}
		res.render('pong');
	}
	catch(e){console.log("erreur l or du renvoie de la page pong")}	
}

exports.wichName = async function(req, res)
{
	try{
		var game = await gameMod.find({});
		for (var x = 0; game[x]; x++)
			if (game[x].nb_player < 2)
			{
				res.json(game[x]);
				break ;
			}
	}
	catch(e){console.log("erreur l or du renvoie de l objet gameMod 1")}	
}

