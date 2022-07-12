

window.onload = function()
{
	var canvas;
	var ctx;
	var blocksize = 30;
	var DELAY = 100;
	var sneck;
	var pomme;
	var deplaceX = 1;
	var deplaceY = 0;
	var point = 0;
	
	function init()
	{
		canvas = document.createElement('canvas');
		canvas.width = 900;
		canvas.height = 600;
		pomme = new Pomme();
		sneck = new Sneck();
		canvas.style.border = "1px solid";
		document.body.appendChild(canvas);
		ctx = canvas.getContext('2d');
		consigne();
	}
	function refrech()
	{
		sneck.eat(pomme);
		ctx.clearRect(0,0, canvas.width, canvas.height);
		sneck.draw();
		pomme.draw();
		if (sneck.avance(deplaceX,deplaceY) === -1)
		{
			gameover();
			return ;
		}
		setTimeout(refrech, DELAY);
	};
	function Pomme()
	{
		this.poseX = Math.round(Math.random() * (canvas.width/blocksize - 1));
		this.poseY = Math.round(Math.random() * (canvas.height/blocksize - 1));

		this.draw = function()
		{
			ctx.save();
			ctx.fillStyle = "#33cc33";
			ctx.beginPath();
			var radius = blocksize/2;
			var x = this.poseX * blocksize + radius;
			var y = this.poseY * blocksize + radius;
			ctx.arc(x,y, radius, 0, Math.PI*2, true);
			ctx.fill();
			ctx.restore();
		}
		this.newPosition = function()
		{
			this.poseX = Math.round(Math.random() * (canvas.width/blocksize - 1));
			this.poseY = Math.round(Math.random() * (canvas.height/blocksize - 1));
			for (var i = 0; i < sneck.body.length; i++)
			{
				while (this.poseX == sneck.body[i][0] && this.poseY == sneck.body[i][1])
				{
					this.poseX = Math.round(Math.random() * (canvas.width/blocksize - 1));
					this.poseY = Math.round(Math.random() * (canvas.height/blocksize - 1));
				}
			}
			console.log("px : " + this.poseX + " py : " + this.poseY);
			ctx.clearRect(0,0, canvas.width, canvas.height);
			this.draw();
		}
	}
	function Sneck()
	{
		this.body = [[4,0],[3,0],[2,0],[1,0],[0,0]];
		this.draw = function()
		{
			ctx.fillStyle = "#ff0000";
			for (var i = 0; i < this.body.length ; i++)
			{
				ctx.fillRect(this.body[i][0] * blocksize, this.body[i][1] * blocksize, blocksize, blocksize);
			}
			this.poseX += 1;
		};
		this.avance = function(x , y)
		{
			var tmp = this.body[0].slice();
			tmp[0] += x;
			tmp[1] += y;
			this.body.unshift(tmp);
			this.body.pop();
			if (tmp[0] * blocksize >= canvas.width || tmp[1] * blocksize >= canvas.height || tmp[0] * blocksize < 0 || tmp[1] * blocksize < 0)
				return (-1);
			for (var x = 1; x < this.body.length; x++)
				if (this.body[x][0] == tmp[0] && this.body[x][1] == tmp[1])
					return (-1);
			
		};
		this.eat = function(pomme)
		{
			var tmp = this.body[0].slice();
			if (tmp[0] == pomme.poseX && tmp[1] == pomme.poseY)
			{
				pomme.newPosition();
				this.body.push(this.body[this.body.length - 1]);
				point += 1;
			}
		}
	}
	function gameover()
	{
		ctx.fillStyle = "#000000";
		ctx.fillText("Game over " + point + "point !", canvas.width/2, canvas.height/2);
	}
	function consigne()
	{
		ctx.fillStyle = "#000000";
		ctx.fill
		ctx.fillText("Tapez sur entrer pour jouer", canvas.width/2 - 100, canvas.height/2);
	}
	document.onkeydown = function handleKeyDown(e)
	{
		var test = e.keyCode;
		if (test == 13)
			refrech();
		else if (deplaceX === 0)
		{
			if (test == 37)
			deplaceX = -1;
			else if (test == 39)
				deplaceX = 1;
			else 
				return ;
			deplaceY = 0;
		}
		else if (deplaceY === 0)
		{
			if (test === 38)
				deplaceY = -1;
			else if (test === 40)
				deplaceY = 1;
			else 
				return ;
			deplaceX = 0;
		}
		}
		init();
}