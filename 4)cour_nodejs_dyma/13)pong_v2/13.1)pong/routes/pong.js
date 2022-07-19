/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 15:03:10 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/19 19:09:18 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const raquetteMod = require('./../database/model');
const {takeRaquettes, newRaquette, mouvRaquettePosYMoin, mouvRaquettePosYPlus, chooseRaquette, closePlay, controleRaquette} = require('./../controllers/controllers');


router.post('/mousRaquettePosYPlus', mouvRaquettePosYPlus);
router.post('/mousRaquettePosYMoin', mouvRaquettePosYMoin);
router.get('/chooseMyRaquette', chooseRaquette);
router.get('/controleRaquette', controleRaquette);
router.post('/takeRaquette', takeRaquettes);
router.get('/closePlay', closePlay);
router.get('/', newRaquette);

module.exports = router;