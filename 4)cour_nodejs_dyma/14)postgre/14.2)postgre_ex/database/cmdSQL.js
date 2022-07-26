exports.SQLcreateNewGame = `CREATE TABLE game(
	game_id SERIAL PRIMARY KEY,
	canvasX INT,
	canvasY INT,
	blocksize INT,
	dificult INT,
	delay INT	
);`;

exports.SQLseeAllGames = `SELECT * FROM game;`;