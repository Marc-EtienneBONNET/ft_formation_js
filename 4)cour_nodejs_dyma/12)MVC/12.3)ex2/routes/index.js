/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 11:03:04 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/16 18:03:25 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const user = require('./user');

router.use('/user', user);

router.get('/',(req, res) => {
	res.render('home');
});

module.exports = router;