const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chapterShema = schema({
	title: {type: String, require:true},
	index: String,
	nbrOfLesson: String
});

var chapter = mongoose.model('chapters', chapterShema, 'chapters');

mongoose.connect('mongodb://Dyma:Dyma@localHost:27017/dyma', {
	useUnifiedTopology:true
}).then (() => {
	chapter.find({title:"mongoose"}, (err, document) => {
		if (err) throw err;
		console.log(document);
	});
	console.log("connection etablie !")
});