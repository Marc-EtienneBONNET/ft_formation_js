const mongoose = require('mongoose');
const { doesNotMatch } = require('node:assert');
const schema = mongoose.Schema;

const chaptersShe = schema({
	title:String,
	index:String,
	nbrOfLessons:Number
});

var chaptersMod = mongoose.model('chapters', chaptersShe, 'chapters');

mongoose.connect("mongodb://Dyma:Dyma@localhost:27017/dyma")
		.then(() => {
			console.log("bien connecter !");
			chaptersMod.findOne({title:"Sakura"}, (err, doc) => {
				if (err){console.log(err)};
				if (doc === null)
				{
					const newchapter = new chaptersMod({});
					newchapter.title = "Sakura";
					newchapter.index = "1";
					newchapter.save((err, doc) => {
						console.log("Sakura a etait enrogistrer");
					});
				}
				else 
					console.log("Sakura existe deja");
			});
			chaptersMod.findOne({title:"Naruto"}, (err, data) => {
				if (err){console.log(err)};
				if (data !== null)
				{
					chaptersMod.findOneAndUpdate({title:"Naruto"}, { $set: {index:'1'}}).exec()
								.then(() => {
									console.log("C est tout bon");
								}). catch(err => {
									if (err){console.log(err);};
								});
				}
			});
			chaptersMod.find({index:"1"}, (err, doc) => {
				if (err){console.log(err)};
				console.log("ici : " + doc);
			});
			}).catch( (err) => {
			console.log(err);
		});