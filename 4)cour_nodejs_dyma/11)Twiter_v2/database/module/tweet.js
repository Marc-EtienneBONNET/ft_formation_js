/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tweet.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/16 15:08:28 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/16 16:41:25 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');
const schema = mongoose.Schema({
	content:{
		type:String, 
		maxlength:[540, "coco, il vas faloire racoursire"], 
		minlength:[1, "coco, il vas faloir t exprimer"], 
		required:[true, "coco, il vas faloir t exprimer"]
	}
});

const tweetMod = mongoose.model('tweet', schema, 'tweet');

module.exports = tweetMod;