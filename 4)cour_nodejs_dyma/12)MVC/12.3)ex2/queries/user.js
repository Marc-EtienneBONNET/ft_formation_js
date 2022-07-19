/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/16 18:28:00 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/19 15:57:53 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const  model = require('./../database/model');

exports.getUsers = () => {
	return (model.user.find({}).exec());
}

exports.addUser = (mail, pass) => {
	var newmodel = new model.user({
		mail:mail, 
		password:pass
	});
	return (newmodel.save());
}