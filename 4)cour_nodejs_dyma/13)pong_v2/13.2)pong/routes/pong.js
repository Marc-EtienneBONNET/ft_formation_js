/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 15:03:10 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/20 17:09:39 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const {takeGame, newGame, addPlayer, mouvR_Y, mouvB} = require('./../controllers/controllers');


router.post('/mouvB', mouvB);
router.post('/mouvR_Y', mouvR_Y);
//router.get('/chooseMyRaquette', chooseRaquette);
//router.get('/controleRaquette', controleRaquette);
//router.get('/closePlay', closePlay);
router.post('/addPlayer', addPlayer);
router.post('/takeGame', takeGame);
router.post('/', newGame);

module.exports = router;