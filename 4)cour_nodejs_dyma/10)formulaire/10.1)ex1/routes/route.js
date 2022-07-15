const route = require('express').Router();
const api = require('./api')



route.use('/api', api);

route.get('/', (req, res) => {
	res.render('home');
})

module.exports = {
	route:route
}