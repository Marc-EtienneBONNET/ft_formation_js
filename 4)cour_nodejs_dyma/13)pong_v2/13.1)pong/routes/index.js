/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:37:39 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/19 11:00:36 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const api = require('./api');


router.use("/pong", api);
router.get("/", (req, res) => {
	res.render('home');
});

module.exports = router;