/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   module.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:35:58 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/15 11:58:12 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


const mongoose = require('mongoose');
const Schema = mongoose.Schema({
	mail:{
		required:true,
		type:String
	},
	password:{
		required:true,
		type:String
	},
});

const userMod = mongoose.model('user', Schema, 'user');

module.exports = {userMod:userMod};
