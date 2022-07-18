/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   model.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:56:08 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/18 16:51:54 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const raquetteSch = schema({
	name:{
		type:Number,
		require:[true, "name demander!"]
	},
	posX:{
		type:Number,
		require:[true, "position x demander!"]
	},
	posY:{
		type:Number,
		require:[true, "position y demander!"]
	},
	tailleX:{
		type:Number,
		require:[true, "position x demander!"]
	},
	tailleY:{
		type:Number,
		require:[true, "position x demander!"]
	},
	
});

const raquetteMod = mongoose.model('raquette', raquetteSch, 'raquette');

module.exports = raquetteMod;