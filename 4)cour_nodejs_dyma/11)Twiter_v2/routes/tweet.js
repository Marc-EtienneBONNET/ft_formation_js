/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tweet.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/16 15:18:43 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/16 16:18:44 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const router = require('express').Router();
const tweetMod = require('./../database/module/tweet');

router.post('/', (req, res) => {
	var newTweet = new tweetMod(req.body)
	newTweet.save()
			.then(() => {
				console.log("data bien envoyer");
				res.redirect('/');
			})
			.catch(err => {
				const errors = Object.keys(err.errors).map(key => {return err.errors[key].message});
				res.status(200).render('tweets/tweet-form', { errors });
			});
});

module.exports = {router:router};