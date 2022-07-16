const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("ok !");
	}, 3000);
})

const promise2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("ok 2!");
	}, 3000);
})

const promise3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("ok 3!");
	}, 3000);
})


const promise4 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject("ko 4!");
	}, 3000);
})

async function test()
{
	try{
		const test = await promise;
		var test2 = await Promise.all([promise2, promise3])
		const test3 = await promise4;
		console.log(test);
		console.log(test2);
		console.log(test3);
		return (test);
	}
	catch (err)
	{
		console.log(err)	
	}
}

test();