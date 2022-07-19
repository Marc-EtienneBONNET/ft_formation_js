/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controllers.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 17:09:00 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/19 18:59:34 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const raquetteMod = require('./../database/model');

// exports.changPosRaquette = async function(whichRaquette, data, direction){
// 	var raquette = await raquetteMod.findOneAndUpdate({name:whichRaquette}, {$set: {posY:data.posY + (5 * direction)}}).exec()
// 	return (raquette);
// }

exports.controleRaquette = async function(req, res){
	
	try{
		var raquette;
		raquette = await raquetteMod.findOne({name:2}).exec();
		if (raquette.use == true)
		{
			raquette = await raquetteMod.findOne({name:2}).exec();
				if (raquette.use == true)
					res.json({start:1});
				else 
					res.json({start:0});
		}
		else
			res.json({start:0});
		}catch(e){console.log("erreur l or de la recherche de start")}
}

exports.closePlay = async function(req, res){
	
	try{
		await raquetteMod.findOneAndDelete({name:1}).exec();
		await raquetteMod.findOneAndDelete({name:2}).exec()
	}catch(e){console.log("erreur l or de la supretion de la databaise")}
	res.render('home');
}

exports.chooseRaquette = async function(req, res){
	try{
		var raquette;
		raquette = await raquetteMod.findOne({name:1}).exec();
		if (raquette.use == false)
		{
			raquette.use = true;
			raquette.save();
			res.json({use:1});
		}
		else
		{
			raquette = await raquetteMod.findOne({name:2}).exec();
			if (raquette.use == false)
			{
				raquette.use = true;
				raquette.save();
				res.json({use:2});
			}
			else
				res.json({use:-1});
		}
	}
	catch(e){console.log("erreur l or de la celection de la raquette")}
}

exports.mouvRaquettePosYPlus = async function(req, res){
	try{
		var raquette = await raquetteMod.findOne({name:req.query.str}).exec();
		raquette.posY += 5;
		raquette.save();
		res.json({});
	}
	catch(e){console.log("erreur l or du changememnt des valeur y de raquette")}
}

exports.mouvRaquettePosYMoin = async function(req, res){
	try{
		var raquette = await raquetteMod.findOne({name:req.query.str}).exec();
		raquette.posY -= 5;
		raquette.save();
		res.json({});
	}
	catch(e){console.log("erreur l or du changememnt des valeur y de raquette")}
}

exports.takeRaquettes = async function(req, res){
	try{

		var raquette = await raquetteMod.findOne({name:req.query.str}).exec();
		res.json(raquette);
	}
	catch(e){console.log("erreur l or du renvoie de l objet raquette")}
}

function initValueRaqutte(raquette, name, posX, posY, tailleY, tailleX, use)
{
	var newbloc;
	if (raquette == null)
	{
		newbloc = new raquetteMod({
		name:name,
		posX:posX,
		posY:posY,
		tailleY:tailleY,
		tailleX:tailleX,
		use:use
		})		
		newbloc.save();
	}
}

exports.newRaquette = async function(req, res){
	try{
		var raquette1 = await raquetteMod.findOne({name:1});
		var raquette2 = await raquetteMod.findOne({name:2});
		initValueRaqutte(raquette1, 1, 20, 250, 100, 20, false);
		initValueRaqutte(raquette2, 2, 960, 250, 100, 20, false);
	}
	catch(e){console.log("erreur l or de l init des raquette")}
	res.render('pong');
}