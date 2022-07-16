/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/16 15:08:34 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/16 16:36:51 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const tweetMod = require('./../database/module/tweet');
const router = require('express').Router();
const api = require('./api')

router.use('/api', api.router);

router.get('/tweet/new', (req, res) => {
	res.render('tweets/tweet-form');
});


router.get('/', (req, res) => {
	tweetMod.find({})
				.exec()
				.then(tweets => {
					res.render('tweets/tweet-list', { tweets:tweets });
				})
});

module.exports = router;