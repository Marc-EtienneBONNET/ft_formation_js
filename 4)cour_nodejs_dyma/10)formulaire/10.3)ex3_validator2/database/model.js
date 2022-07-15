/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   model.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 11:06:27 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/15 12:02:15 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');
const schema = mongoose.Schema({
	mail:{
		required:[true, 'mail is obligatoire'],
		type:String
	},
	password:{
		required:[true, 'password is obligatoire'],
		type:String
	}
});

const user = mongoose.model('user', schema, 'user');

module.exports = {user:user};