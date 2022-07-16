/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 11:03:07 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/15 13:06:09 by mbonnet          ###   ########.fr       */
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
			.then(() => {
				res.redirect('/');
			})
			.catch(err => {
				const errors =  Object.keys(err.errors).map(key => {return err.errors[key].message});//utile.inspect(err, {compact: true, depth: 5, breakLength:80, colors:true}).error.
				console.log(errors);
				res.status(400).render('home', { errors });
			});
});

module.exports = router;
