/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:40:34 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/22 18:00:16 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const {Client} = require('pg');
const {SQLcreateNewGame, SQLseeAllGames} = require('./cmdSQL');

const client1 = new Client({
	host:"localhost",
	user:"postgres",
	port:5432,
	password:"root",
	database:"pong"
})

client1.connect()
		.then(() => {
			console.log("Bien connectez !");
		})


		
client1.query(SQLseeAllGames, (err, res) => {
	console.log(res.rows);
});