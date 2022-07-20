/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controllers.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 17:09:00 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/20 18:37:14 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const gameMod = require('./../database/model');

// exports.controleRaquette = async function(req, res){
	
// 	try{
// 		var raquette;
// 		raquette = await raquetteMod.findOne({name:2}).exec();
// 		if (raquette.use == true)
// 		{
// 			raquette = await raquetteMod.findOne({name:2}).exec();
// 				if (raquette.use == true)
// 					res.json({start:1});
// 				else 
// 					res.json({start:0});
// 		}
// 		else
// 			res.json({start:0});
// 		}catch(e){console.log("erreur l or de la recherche de start")}
// }

// exports.closePlay = async function(req, res){
	
// 	try{
// 		await raquetteMod.findOneAndDelete({name:1}).exec();
// 		await raquetteMod.findOneAndDelete({name:2}).exec()
// 	}catch(e){console.log("erreur l or de la supretion de la databaise")}
// 	res.render('home');
// }

// exports.chooseRaquette = async function(req, res){
// 	try{
// 		var raquette;
// 		raquette = await raquetteMod.findOne({name:1}).exec();
// 		if (raquette.use == false)
// 		{
// 			raquette.use = true;
// 			raquette.save();
// 			res.json({use:1});
// 		}
// 		else
// 		{
// 			raquette = await raquetteMod.findOne({name:2}).exec();
// 			if (raquette.use == false)
// 			{
// 				raquette.use = true;
// 				raquette.save();
// 				res.json({use:2});
// 			}
// 			else
// 				res.json({use:-1});
// 		}
// 	}
// 	catch(e){console.log("erreur l or de la celection de la raquette")}
// }

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
		game.b_X = game.canvasX - 1;
		calY();
	}
	else if (game.b_X <= 0)
	{
		game.b_X = 1;
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
		var game = await gameMod.findOne({name:req.query.name});
		game.nb_player += 1;
		game.save();
		res.json({});
	}catch(e){console.log("erreur l or de l ajoue de player")}
}

exports.takeGame = async function(req, res){
	try{
		var game = await gameMod.findOne({name:req.query.name}).exec();
		res.json(game);
	}
	catch(e){console.log("erreur l or du renvoie de l objet gameMod")}
}

function initValueGame(game, canvasWidth, dificulter)
{
	var canvasWidth = canvasWidth;
	var canvasHeigth = canvasWidth * 0.6;
	var blockSize = canvasWidth/50;
	var newgame;
	if (game == null)
	{
		newgame = new gameMod({
			name:1,
			canvasX:canvasWidth,
			canvasY:canvasHeigth,
			blockSize:blockSize,
			t_Y: (5 - dificulter) * blockSize,
			t_X: blockSize,
			r1_X: blockSize,
			r1_Y: canvasHeigth/2 - ((5 - dificulter) * blockSize),
			r2_X: canvasWidth - (2 * blockSize),
			r2_Y: canvasHeigth/2 - ((5 - dificulter) * blockSize),
			b_Y: canvasHeigth/2,
			b_X: canvasWidth/2,
			nb_player: 0,
		})		
		newgame.save();
	}
}

exports.newGame = async function(req, res){
	try{
		var game = await gameMod.findOne({});
		initValueGame(game, req.body.x, req.body.dificulter);
		res.render('pong');
	}
	catch(e){
		console.log("erreur l or de l init des valeur de partie")
	}
}

