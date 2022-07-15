require('./database/connection');
const express = require('express');
const path = require('path');
const model = require('./database/model/ninja');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
	model.ninja.findOne({})
		.exec()
		.then((doc) => {
			res.json(doc);
		});
});

app.listen(3000);