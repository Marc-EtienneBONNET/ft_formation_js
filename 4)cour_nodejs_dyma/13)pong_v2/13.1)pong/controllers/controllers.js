/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controllers.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 17:09:00 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/18 17:30:31 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const raquetteMod = require('./../database/model');

exports.mouvPosPlus = async function(){
	raquetteMod.findOne({name:1})
						.exec()
						.then(data => {
							return raquetteMod.findOneAndUpdate({name:1}, { $set: {posY:(data.posY + 5)}}).exec()
						})
						.catch(err => {
							throw err;
						});
}

exports.mouvPosMoin = async function(){
	raquetteMod.findOne({name:1})
						.exec()
						.then(data => {
							return raquetteMod.findOneAndUpdate({name:1}, { $set: {posY:(data.posY - 5)}}).exec()
						})
						.catch(err => {
							throw err;
						});
}

exports.takePose = async function(){
	return raquetteMod.findOne({name:1}).exec();
}


exports.newraquette = async function(){
	var newbloc;
	raquetteMod.findOne({name:1})
				.exec()
				.then((data) => {
					if (data == null)
					{
						newbloc = new raquetteMod({
							name:1,
							posX:20,
							posY:300,
							tailleY:100,
							tailleX:20
							
						});
						return newbloc.save();
					}
					else
						raquetteMod.findOne({name:2})
									.exec()
									.then((data) => {
										if (data == null)
										{
											newbloc = new raquetteMod({
												name:2,
												posX:860,
												posY:300,
												tailleY:100,
												tailleX:20
												
											});
											return newbloc.save();
										}
										else 
											throw err;
									})
									.catch(err => {
										throw err;
									});
				})
				.catch(err => {
					throw err;
				});
	
}