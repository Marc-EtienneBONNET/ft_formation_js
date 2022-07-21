/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:37:39 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/21 16:13:51 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const api = require('./api');


router.use("/PlayPong", api);
router.get("/", (req, res) => {
	res.render('home');
});

module.exports = router;