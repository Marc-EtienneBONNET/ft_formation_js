/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:41:31 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/15 11:53:01 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const mod = require('./../database/module');

router.post('/', (req, res) => {
	var newUser = new mod.userMod({
		mail:req.body.mail,
		password:req.body.password
	});
	newUser.save()
			.then(() => {
				res.render("home");
			})
			.catch(err => {
				console.log(err);
				res.status(404);
			});
	
});

module.exports = router;