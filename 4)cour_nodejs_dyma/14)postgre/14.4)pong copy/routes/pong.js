/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 15:03:10 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/26 12:12:57 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const test = require('./../backend/backend_pong/backend_pong');

router.post('/', (req, res) => {
	res.render('pong');
});

module.exports = router;