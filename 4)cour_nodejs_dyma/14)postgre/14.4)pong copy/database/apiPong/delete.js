/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   delete.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 11:20:47 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/26 12:00:37 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var client1 = require('./../index');

exports.DeleteAllTableByName = async function(name)
{
	await client1.client1.query(`DROP TABLE ` + name + `;`);
}

exports.DeleteOneRaquette = async function(raquette_id)
{
	await client1.client1.query(`DROP TABLE raquettes  WHERE raquette_id=` + raquette_id + `;`);
}

exports.DeleteOnePlayer = async function(player_id)
{
	await client1.client1.query(`DROP TABLE players  WHERE raquette_id=` + player_id + `;`);
}

exports.DeleteOneBall = async function(ball_id)
{
	await client1.client1.query(`DROP TABLE balls  WHERE raquette_id=` + ball_id + `;`);
}

exports.DeleteOneGame = async function(game_id)
{
	await client1.client1.query(`DROP TABLE games  WHERE raquette_id=` + game_id + `;`);
}
