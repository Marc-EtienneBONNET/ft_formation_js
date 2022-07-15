/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/13 18:37:16 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/14 08:58:21 by mbonnet          ###   ########.fr       */
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

ninjaShe.statics.takeMyStructByNom = function(name, ct) {
	return ninjaMod.findOne({ nom:name }, ct);
}
ninjaShe.methods.takeNb = function() {
	return this.nb;
}


const ninjaMod = mongoose.model('ninja', ninjaShe, 'ninja');

mongoose.connect("mongodb://Dyma:Dyma@localhost:27017/dyma")
		.then(() => {
			console.log("Nous voila connecter")
			ninjaMod.takeMyStructByNom("Naruto")
					.exec()
					.then((doc) => {
						console.log(doc.takeNb());
					})
		})
		.catch(err => {
			throw err;
		});