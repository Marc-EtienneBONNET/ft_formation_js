const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chaptersShema = schema({
	title:String,
	index:String,
	nbrOfLessons:Number,
	lessons:{ type:mongoose.Types.ObjectId , ref:'lessons'}
});
const lessonsShema = schema({
	title:String
});

const chaptersMod = mongoose.model('chapters', chaptersShema);
const lessonsMod = mongoose.model('lessons', lessonsShema, 'lessons');

mongoose.connect('mongodb://Dyma:Dyma@localhost:27017/dyma')
		.then( doc => {
			console.log("Connecter");
			const newLessons = new lessonsMod({title:"Bonjour"});
			newLessons.save()
						.then(() => {
							console.log("Bien creer");

						})
						.catch(err => {
							throw err;
						})
			const newchapter = new chaptersMod({
				title:"Marco",
				index:"1",
				nbrOfLessons:10,
				lessons:newLessons._id
			});
			newchapter.save()
						.then(() => {console.log("bien executer")})
						.catch((err) => {throw err})
		})
		.catch(err => {
			throw err;
		});