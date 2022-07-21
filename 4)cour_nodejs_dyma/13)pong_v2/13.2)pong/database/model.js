/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   model.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:56:08 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/21 15:42:46 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const gameSch = schema({
	name:{
		type:String,
		require:[true, "name please"]	
	},
	canvasX:{
		type:Number,
		require:[true, "position x demander!"]
	},
	canvasY:{
		type:Number,
		require:[true, "position x demander!"]
	},
	blockSize:{
		type:Number,
		require:[true, "position x demander!"]
	},
	r1_X:{
		type:Number,
		require:[true, "position x demander!"]
	},
	r1_Y:{
		type:Number,
		require:[true, "position y demander!"]
	},
	r2_X:{
		type:Number,
		require:[true, "position x demander!"]
	},
	r2_Y:{
		type:Number,
		require:[true, "position y demander!"]
	},
	t_X:{
		type:Number,
		require:[true, "position x demander!"]
	},
	t_Y:{
		type:Number,
		require:[true, "position x demander!"]
	},
	b_Y:{
		type:Number,
		require:[true, "position x demander!"]
	},
	b_X:{
		type:Number,
		require:[true, "position x demander!"]
	},
	nb_player:{
		type:Number,
		require:[true, "position x demander!"]
	},
	pointPlayerOne:{
		type:Number,
		require:[true, "position x demander!"]
	},
	pointPlayerTwo:{
		type:Number,
		require:[true, "position x demander!"]
	},
});

const gameMod = mongoose.model('game', gameSch, 'game');

module.exports = gameMod;