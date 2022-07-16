/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/16 15:08:31 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/16 15:08:32 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');

console.log("coucou");
mongoose.connect('mongodb+srv://twitter1:twitter1@cluster0.uubffge.mongodb.net/twitter?retryWrites=true&w=majority')
		.then(() => {
			console.log("bien connecter");
		})
		.catch(err => {
			console.log("Non connecter");
			throw err;
		});