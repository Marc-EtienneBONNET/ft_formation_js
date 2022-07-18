/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 15:03:10 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/18 17:26:02 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const raquetteMod = require('./../database/model');
const {mouvPosPlus, mouvPosMoin, takePose, newraquette} = require('./../controllers/controllers');

router.get('/pong/mouvPosMoin', (req, res) => {
	mouvPosMoin()
	.then((data) => {
		res.json(data);
	})
	.catch(err => {
		throw err;
	});
});

router.use('/pong/mouvPosPlus', (req, res) => {
	
	mouvPosPlus()
	.then((data) => {
		res.json(data);
	})
	.catch(err => {
		throw err;
	});		
});

router.use('/takePos', (req, res) => {
	takePose()
 	.then((data) => {
 		res.json(data);
 	})
 	.catch(err => {
 		throw err;
 	});
});

router.get('/', (req, res) => {
	newraquette()
	res.render('pong');
});

module.exports = router;