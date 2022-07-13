/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/13 18:37:16 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/13 19:23:03 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ninjaShe = schema({
	nom:String,
	niveau:String,
	nb:Number
}, {
	timestamps: true
});


ninjaShe.post('validate', function(doc, next) {
	return ninjaMod.countDocuments()
			.exec()
			.then(nbr => {
				doc.nb = nbr + 1;
				console.log("validtaite effectuer");
			})
			.catch(err => {
				throw err;
			})
});

ninjaShe.post('save', function() {
	console.log("sauvgarde effectuer");
});

const ninjaMod = mongoose.model('ninja', ninjaShe, 'ninja');

mongoose.connect("mongodb://Dyma:Dyma@localhost:27017/dyma")
		.then(() => {
			console.log("Nous voila connecter")
			const newNinja = new ninjaMod({
				nom:"Naruto",
				niveau:"chunin",
			});
			newNinja.save();
		})
		.catch(err => {
			throw err;
		});