/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/15 11:02:01 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/15 11:06:09 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');

mongoose.connect('mongodb://Dyma:Dyma@localhost:27017/dyma')
		.then(() => {
			console.log("Bien connecter");
		})
		.catch(err => {
			throw err;
		});