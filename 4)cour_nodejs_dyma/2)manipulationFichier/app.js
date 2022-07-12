var fs = require('fs');

fs.mkdir("./test/test2", {recursive: true} ,(err) => {
	if (err) throw err;
	console.log("les dossiers a bien etait creer");
	fs.writeFile("./test/test2/test.txt", "salut les gas", (err) => {
		if (err) throw err;
		console.log("le fichier a bien etait creer");
		fs.copyFile("./test/test2/test.txt", "./test/test2/test2.txt", (err) => {
			if (err) throw err;
			console.log("le fichier a bien etait copier");
			fs.readFile("./test/test2/test.txt", (err, data) => {
				if (err) throw err;
				console.log(data.toString());
				fs.readFile("./test/test2/test2.txt", (err, data) => {
					if (err) throw err;
					console.log(data.toString());
					fs.stat("./test/test2/test2.txt", (err, stats) => {
						console.log(stats);
					});
					fs.readdir("./test/test2/", (err, data) => {
						if (err) throw err;
						console.log(data);
						fs.unlink("./test/test2/test.txt", (err) => {
							fs.unlink("./test/test2/test2.txt", (err) => {
								fs.rmdir("./test/test2", (err) => {
									fs.rmdir("./test", (err) => {
										console.log("fin du test");
									});
								});
							});
						});
					});
				});
			});
		});
	});
});