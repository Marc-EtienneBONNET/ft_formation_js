/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 11:03:07 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/15 12:29:31 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const  model = require('./../database/model');
const  utile = require('util');

router.post('/', (req, res) => {
	var newmodel = new model.user({
		mail:req.body.mail,
		password:req.body.password
	});
	newmodel.save()
			.then(() => {})
			.catch(err => {
				
				console.log(utile.inspect(err, {compact: true, depth: 5, breakLength:80, colors:true}));
			});
	res.render('home');
});

module.exports = router;
