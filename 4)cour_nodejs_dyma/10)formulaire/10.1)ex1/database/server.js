const mongoose = require('mongoose');
const model = require('./model/user');

mongoose.connect('mongodb://Dyma:Dyma@localhost:27017/dyma')
		.then(() => {
			console.log("connecter");
		})
		.catch(err => {

		});