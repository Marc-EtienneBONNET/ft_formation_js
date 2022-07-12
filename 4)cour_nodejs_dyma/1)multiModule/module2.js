

var test = "bonjour"

var test2 = function()
{
	console.log("salut les gas");
}

module.exports = {
	test: test,
	test2: test2,
	test3: test2()
}