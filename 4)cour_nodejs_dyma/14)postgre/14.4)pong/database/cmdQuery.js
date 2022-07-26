exports.SQLcreateGames = `CREATE TABLE games(
	game_id SERIAL PRIMARY KEY,
	raquette1_id INT REFERENCES raquettes,
	raquette2_id INT REFERENCES raquettes,
	ball_id INT REFERENCES balls,
	canvasX INT,
	canvasY INT,
	blocksize INT,
	dificult INT
);`;



exports.SQLcreatePlayers = `CREATE TABLE players(
	player_id SERIAL PRIMARY KEY,
	type VARCHAR(10),
	raquette_id INT REFERENCES raquettes
);`;



exports.SQLcreateRaquettes = `CREATE TABLE raquettes(
	raquette_id SERIAL PRIMARY KEY,
	p_X INT,
	p_Y INT,
	t_Y INT
);`;

exports.SQLcreateBall = `CREATE TABLE balls(
	ball_id SERIAL PRIMARY KEY,
	p_X INT,
	p_Y INT,
	m_X INT,
	m_Y int
);`;

exports.SQLselectTable = function(table)
{
	return (`SELECT * FROM ` + table);
}
exports.SQLsupTable = function(table)
{
	return (`DROP TABLE ` + table);
}

exports.SQLaddRaquette = function(p_X, p_Y, t_Y)
{
	return (`INSERT INTO raquettes(p_X,p_Y,t_Y) 
			VALUES (`+ p_X + `,` + p_Y + `,`+ t_Y + `);`);
}
exports.SQLaddBall = function(p_X, p_Y, m_X, m_Y)
{
	return (`INSERT INTO balls(p_X,p_Y,m_X,m_Y) 
			VALUES (`+ p_X + `,` + p_Y + `,` + m_X + `,` + m_Y + `);`);
}

exports.SQLaddPlayer = function(type)
{
	return (`INSERT INTO players(type) 
			VALUES ( '`+ type +`' );`);
}

exports.SQLaddGame = function(canvasX, canvasY, blocksize, dificult)
{
	return (`INSERT INTO games(canvasX, canvasY, blocksize, dificult) 
			VALUES (` + canvasX + `,` + canvasY + `,` + blocksize + `,` + dificult + `);`);
}