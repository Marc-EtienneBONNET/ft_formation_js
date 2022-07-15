/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   connection.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/13 18:37:16 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/14 09:48:28 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const model = require('./model/ninja');

model.mongoose.connect("mongodb://Dyma:Dyma@localhost:27017/dyma")
		.then(() => {
			console.log("Nous voila connecter")
			model.ninja.find({});
		})
		.catch(err => {
			throw err;
		});