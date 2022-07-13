const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chaptersShe = schema({
	title:String,
	index:String,
	nbrOfLessons:Number
});

const chaptersMode = mongoose.model('chapters', chaptersShe);

mongoose.connect('mongodb://Dyma:Dyma@localhost:27017/dyma').then( () => {
	console.log("Bien connecter !");
	chaptersMode.findOneAndUpdate({title:"Mongodb"}, {$set: {nbrOfLessons:20}})
				.exec()
				.then(() => {
					console.log("Modification est effective");
				})
				.catch(() => {
					console.log("Modification n est pas effective");
				})
	chaptersMode.find({})
				.sort({ nbrOfLessons: -1, index: -1})
				.skip(1)
				.limit(3)
				.select('title nbrOfLessons')
				.exec()
				.then( (doc) => {
					console.log(doc);
				})
				.catch((err) => {
					throw err;
				});

}).catch( (err) => {
	throw err;
});