function testMiddle1(req, res, next)
{
	req.user = {
		name :"Marco",
		authentifier: true
	}
	console.log("coucou");
	next();
}

function testMiddle2(req, res, next)
{
	console.log("Marco");
	if (req.user.authentifier)
		next();
	else
		res.sendStatus(403);
}

module.exports = {
	testMiddle1:testMiddle1,
	testMiddle2:testMiddle2
}