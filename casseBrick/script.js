var canvas;
var ctx;
var canvasWidth = 800;
var canvasHeigth = 900;
var blocksize = 20;
var delay = 50;
var vmouv = 0.5;
var ball = new Ball();
var wall = new Wall(2);
var raquette = new Raquette();
var w = 0;
	
function init()
{
	canvas = document.createElement('canvas');
	canvas.width = canvasWidth - 1;
	canvas.height = canvasHeigth;
	canvas.style.border = "1px solid";
	document.body.appendChild(canvas);
	ctx = canvas.getContext('2d');
}

function Brick(x, y)
{
	this.life = 3;
	this.sizeX = 4;
	this.body = [x,y];
	this.borderHaut = [this.body[0], this.body[0] + this.sizeX * blocksize - 1, this.body[1] * blocksize];
	this.borderBas = [this.body[0], this.body[0] + this.sizeX * blocksize - 1, this.body[1] * blocksize + blocksize];
	this.borderGauche = [this.body[1], this.body[1] + blocksize - 1, this.body[0] * blocksize * this.sizeX];
	this.borderDroite = [this.body[1], this.body[1] + blocksize - 1, this.body[0] * blocksize * this.sizeX + blocksize];
	
	this.draw = function()
	{
		switch(this.life)
		{
			case 3:
				ctx.fillStyle = "#123456";
				break;
			case 2:
				ctx.fillStyle = "#654321";
				break;
			case 1:
				ctx.fillStyle = "#777777";
				break;
			case 0:
				ctx.fillStyle = "#ffffff";
				break; 

		}
		ctx.fillRect(this.body[0] * blocksize * this.sizeX, this.body[1] * blocksize, this.sizeX * blocksize - 1, blocksize - 1);
	};
}

function Wall(nb)
{
	this.nbL = nb * 11;
	this.wall = [];
	this.y = 0;
	this.x = 0;
	this.init = function()
	{
		for (var x = 0; x < this.nbL; x++)
		{
			if (this.x > canvasWidth/blocksize/4)
			{
				this.y++;
				this.x = 0;
			}
			this.wall.push(new Brick(this.x, this.y));
			this.x++;
		}
		for (var x = 0; x < this.nbL; x++)
			this.wall[x].draw();
	}
	this.draw = function()
	{
		for (var x = 0; x < this.nbL; x++)
			this.wall[x].draw();
	}

}

function Ball()
{
	this.posX = 300;
	this.posY = 300;
	this.xmouv = -15;
	this.ymouv = -15;
	this.angle = 30;
	this.radius = (blocksize)/2;
	this.draw = function()
	{
		ctx.fillStyle = "#555555";
		ctx.beginPath();
		var x = this.posX + this.radius;
		var y = this.posY + this.radius;
		ctx.arc(x,y, this.radius, 0, Math.PI*2, true);
		ctx.fill();
	}
	this.calY = function()
	{
		var tmp2 = this.ymouv; 
		var tmp = this.xmouv; 
		if ( tmp < 0)
			tmp *= -1;
		this.ymouv = Math.round(tmp * Math.tan(this.angle * Math.PI / 100));
		if (tmp2 < 0 && this.ymouv > 0)
			this.ymouv *= -1;
		this.xmouv *= -1;
	}
	this.calX = function()
	{
		var tmp2 = this.xmouv;
		var tmp = this.ymouv;
		if ( tmp < 0)
			tmp *= -1;
		this.xmouv = -1 * Math.round(tmp/Math.tan(this.angle * Math.PI / 100));
		if (tmp2 > 0 && this.xmouv < 0)
			this.xmouv *= -1;
		this.ymouv *= -1;
	}
	this.percute = function()
	{
		if (this.posX + blocksize >= canvas.width)
			this.calY();
		else if (this.posX <= 0)
			this.calY();
		else if (this.posY + blocksize >= canvas.height)
			return (-1);
		else if (this.posY <= 0)
			this.calX();
	}
	this.percuteBrick = function()
	{
		if (this.posY > (wall.nbL/11) * blocksize)
			return ;
		for (var v = 0; v < wall.wall.length; v++)
		{
			if (wall.wall[v].life == 0)
				continue ;
			var body = wall.wall[v].body;
			var debx = body[0] * 4 * blocksize;
			var finx = debx + 4 * blocksize; 
			var posy = (body[1] + 1) * blocksize;
			if ((this.posX >=  debx && this.posX <= finx && this.posY <= posy && this.posY >= posy - blocksize) ||
				(this.posX >= debx && this.posX <= finx && this.posY <= (posy - blocksize) && this.posY >= posy -blocksize -blocksize))
			{
				this.calX();
				wall.wall[v].life -= 1;
			}
			if ((this.posX == body[0] * blocksize && this.posY >= (body[1] * blocksize) && this.psY <= (body[1] * blocksize) + blocksize) || 
				(this.posX == (body[0] + 1) * blocksize && this.posY >= (body[1] * blocksize) && this.psY <= (body[1] * blocksize) + blocksize))
			{
				this.calX();
				wall.wall[v].life -= 1;
			}
			ctx.clearRect(0, 0, canvas.width, wall.nbL/11 * blocksize);
			wall.draw();
		}
	}
	this.percuteRaquette = function()
	{
		if ((this.posY + blocksize >= raquette.body[1] && this.posX >= raquette.body[0] && this.posX <= raquette.body[0] + blocksize * raquette.sizeX)
		|| this.posY >= raquette.body[1] && this.posX >= raquette.body[0] && this.posX <= raquette.body[0] + blocksize * raquette.sizeX)
			this.calX();
		else if ((this.posY >= raquette.body[1] && this.posY <= raquette.body[1] + blocksize && this.posX >= raquette.body[0]) ||
		this.posY >= raquette.body[1] && this.posY <= raquette.body[1] + blocksize && this.posX >= raquette.body[0] + raquette.sizeX * blocksize)
			this.calY();
	}
	this.advence = function()
	{
		this.posX += this.xmouv;
		this.posY += this.ymouv;
		if (this.percute() == -1)
			return (-1);
		this.percuteRaquette();
		this.draw();
		this.percuteBrick();
	}
}

function Raquette()
{
	var test = canvasHeigth - 40;
	this.body = [0, test];
	this.sizeX = 5;

	this.draw = function()
	{
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.body[0], this.body[1], this.sizeX * blocksize, blocksize);
	}
}
document.onkeydown = function mouvRaquette(e)
{
	if (e.keyCode == 39 && raquette.body[0] < canvasWidth - (blocksize * raquette.sizeX))
		raquette.body[0] += 15;
	else if (e.keyCode == 37 && raquette.body[0] > 0)
		raquette.body[0] -= 15;
}

function refrech()
{
	ctx.clearRect(0, wall.nbL/11 * blocksize, canvas.width, canvas.height);
	raquette.draw();
	if (ball.advence() == -1)
		return (-1);
	setTimeout(refrech, delay);
}

window.onload = function()
{
	init();
	wall.init();
	refrech();
}