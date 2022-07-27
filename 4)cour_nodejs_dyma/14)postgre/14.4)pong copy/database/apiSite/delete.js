/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   delete.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 11:20:47 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 17:00:25 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var client1 = require('./../index');

exports.DeleteAllTableUsers = async function()
{
	await client1.client1.query(`DROP TABLE users;`);
}

exports.DeleteOneRaquette = async function(user_id)
{
	await client1.client1.query(`DELETE FROM users WHERE user_id=` + user_id + `;`);
}