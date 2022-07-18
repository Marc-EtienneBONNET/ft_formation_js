/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 08:32:20 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/18 08:32:21 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const  {getUsers, addUser} = require('./../queries/user');

exports.addUser = async(req, res) => {
	try{
		const promise = await addUser(req.body.mail, req.body.password);
		res.redirect('/');
	}catch (err) {
		const errors =  Object.keys(err.errors).map(key => {return err.errors[key].message});
		res.status(400).render('home', { errors });
	}
}

exports.seeUser = async(req, res) => {
	try{
		const users = await getUsers();
		res.render('home', { users });
	}catch(e){
	}
}