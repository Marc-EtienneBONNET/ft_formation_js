/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   model.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 11:06:27 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/15 12:24:58 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');

const validatorMail1 = {
	validator:function(post) {
		if (post.search('@') == -1)
			return (false);
		else 
			return (true);
	},
	message: "doit contenir un @"
}

const validatorMail2 = {
	validator:function(post) {
		if (post.search('.com') == -1 && post.search('.fr') == -1)
			return (false);
		else 
			return (true);
	},
	message: "doit contenir un .com ou .fr"
}

const schema = mongoose.Schema({
	mail:{
		validate:[validatorMail1, validatorMail2],
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