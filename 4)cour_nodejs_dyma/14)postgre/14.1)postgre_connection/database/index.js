/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:40:34 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/22 11:52:02 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const contentDisposition = require('content-disposition');
const {Client} = require('pg');

const client1 = new Client({
	host:"localhost",
	user:"postgres",
	port:5432,
	password:"root",
	database:"postgres"
})

client1.connect()
		.then(() => {
			console.log("Bien connectez !");
		})

const query = `CREATE TABLE TEST(
	MATRICULE int PRIMARY KEY,
	NOM varchar(30) NOT NULL,
	NOMJF varchar(30),
	PRENOM varchar(30) NOT NULL,
	NUMSECU varchar(15) NOT NULL,
	CIVILITE varchar(3) NOT NULL,
	SEXE varchar(1) NOT NULL,
	DATENAISSANCE DATE,
	SITFAM varchar(1) NOT NULL,
	PAYSNAISSANCE varchar(3) NOT NULL,
	NATIONALITE varchar(3) NOT NULL
	);`;
		
client1.query(query, (err, res) => {
 	if (err) {console.log("domage" + err)}
	 else {console.log("bien jouer")}
 	client1.end();
 });