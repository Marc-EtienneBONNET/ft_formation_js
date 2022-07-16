const  model = require('./../database/model');

exports.addUser = async(req, res) => {
	try{
		var newmodel = new model.user({
			mail:req.body.mail,
			password:req.body.password
		});
		const promise = await newmodel.save();
		res.redirect('/');
	}catch (err) {
		const errors =  Object.keys(err.errors).map(key => {return err.errors[key].message});
		res.status(400).render('home', { errors });
	}
}

exports.seeUser = async(req, res) => {
	try{
		const users = await model.user.find({}).exec()
		res.render('home', { users });
	}catch(e){
	}
}