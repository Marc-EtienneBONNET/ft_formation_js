/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:09:27 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/14 16:23:28 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const mod = require('../database/model/user');


router.post('/', (req, res ) => {
	var newUser = new mod.user({
		mail:req.body.mail,
		password:req.body.password
	});
	newUser.save();
	res.end('coucou');
});

module.exports = router;