/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:36:01 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/14 16:36:02 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require('mongoose');

mongoose.connect('mongodb://Dyma:Dyma@localhost:27017/dyma')
		.then(() => {
			console.log("connecter a la base de donner !");
		})
		.catch(err => {
			throw err;
		});