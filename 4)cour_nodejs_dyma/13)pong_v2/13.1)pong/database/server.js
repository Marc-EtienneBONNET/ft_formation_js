/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:40:34 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/18 14:42:00 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');

mongoose.connect("mongodb://Dyma:Dyma@localhost:27017/dyma")
		.then(() => {
			console.log("bien connecter !");
		}).catch(err => {
			throw err;
		});