var canvas;
var ctx;
var canvasWidth = 1000;
var canvasHeigth = 600;
var blocksize = 20;
var delayBall = 1;
var delayRaquette = 0.5;
var ball;
var raquette1;
var raquette2;
var w = 0;
var dificulte = 0;
var myRaquette;
var point1 = 0;
var point2 = 0;
var victoire = 3;


function init()
{
	canvas = document.createElement('canvas');
	canvas.width = canvasWidth;
	canvas.height = canvasHeigth;
	canvas.style.border = "1px solid";
	document.body.appendChild(canvas);
	ctx = canvas.getContext('2d');
	ball = new Ball();
	raquette1 = new Raquette();
	raquette2 = new Raquette();
	raquette1.init("droite");
	raquette2.init("gauche");
	raquette1.draw();
	raquette2.draw();
}	

function Ball()
{
	this.posX = canvasWidth - 30;//canvasWidth/2;
	this.posY = canvasHeigth - 40;//canvasHeigth/2;
	this.xmouv = 0;
	this.ymouv = -1;
	this.angle = 30;
	this.radius = (blocksize)/2;
	this.draw = function()
	{
		ctx.fillStyle = "#555555";
		ctx.beginPath();
		var x = this.posX;
		var y = this.posY;
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
		if (this.posX + blocksize/2>= canvasWidth)
		{
			this.calY();
			point2++;
			return (-2);
		}
		else if (this.posX - blocksize/2 <= 0)
		{
			this.calY();
			point1++;
			return (-1);
		}
		else if (this.posY + blocksize/2 >= canvasHeigth)
			this.calX();
		else if (this.posY - blocksize/2 <= 0)
			this.calX();
	}
	this.percuteRaquette = function()
	{
		var taille = raquette1.taille; 
		var body = raquette1.body;
		if (this.posY <= body[1] + taille[1] && this.posY >= body[1] && this.posX <= body[0] + taille[0] && this.posX >= body[0])
		{
			if ((this.posY - blocksize/2 <= body[1] + taille[1] && this.posY + blocksize/2 > body[1] + taille[1]) ||
			(this.posY + blocksize/2 >= body[1] + taille[1] && this.posY - blocksize/2 < body[1] + taille[1]))
				this.calX();
			else 
				this.calY();
		}
		taille = raquette2.taille; 
		body = raquette2.body;
		if (this.posY <= body[1] + taille[1] && this.posY >= body[1] && this.posX <= body[0] + taille[0] && this.posX >= body[0])
		{
			if ((this.posY - blocksize/2 <= body[1] + taille[1] && this.posY + blocksize/2 > body[1] + taille[1]) ||
			(this.posY + blocksize/2 >= body[1] + taille[1] && this.posY - blocksize/2 < body[1] + taille[1]))
				this.calX();
			else 
				this.calY();
		}		
	}
	this.advence = function()
	{
		ctx.clearRect(ball.posX - blocksize/2, ball.posY - blocksize/2, blocksize, blocksize);
		this.posX += this.xmouv;
		this.posY += this.ymouv;
		if (this.percute() < 0)
		{
			//this.posX = canvasWidth/2
			//this.posY = canvasHeigth/2
		}
		if (point1 == victoire || point2 == victoire)
			return (1);
		this.percuteRaquette();
		this.draw();
	}
}

function Raquette()
{
	this.taille = [blocksize,blocksize * (5 - dificulte)];
	this.body = [];
	this.mouv = 0;
	this.init = function(coter)
	{
		if (coter === "droite")
			this.body[0] = canvasWidth - (blocksize * 2);
		else 
			this.body[0] = blocksize;
		this.body[1] = (canvasHeigth - this.taille[1])/2;
	}
	this.draw = function()
	{
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.body[0], this.body[1], this.taille[0], this.taille[1]);
	}
}

document.onkeydown = function mouvRaquette(e)
{
	if (e.keyCode == 39)
		myRaquette.mouv = -1;	
	else if (e.keyCode == 37 )
		myRaquette.mouv = 1;	
}

document.onkeyup = function mouvRaquette(e)
{
	if (e.keyCode == 39)
		myRaquette.mouv = 0;	
	else if (e.keyCode == 37)
		myRaquette.mouv = 0;	
}

function takeInfo()
{
	ctx.clearRect(10, 10, 100, 100);
	ctx.font = "15pt Calibri,Geneva,Arial";
	ctx.strokeStyle = "#000000";
	ctx.strokeText(point2 + " | " + point1, 30 , 30);
	ctx.fillRect(canvasWidth/2, 0, 1, canvasHeigth);
}

function refrechBall()
{
	takeInfo();
	ctx.clearRect(raquette1.body[0], raquette1.body[1], raquette1.taille[0], raquette1.taille[1]);
	ctx.clearRect(raquette2.body[0], raquette2.body[1], raquette2.taille[0], raquette2.taille[1]);
	if ((raquette1.body[1] <= 0  && raquette1.mouv == -1) || (raquette1.body[1] + raquette1.taille[1] >= canvasHeigth && raquette1.mouv == 1))
		raquette1.mouv = 0;
	if ((raquette2.body[1] == 0  && raquette2.mouv == -1) || (raquette2.body[1] + raquette2.taille[1] >= canvasHeigth && raquette2.mouv == 1))
		raquette2.mouv = 0;
	if (raquette1.mouv != 0)
		raquette1.body[1] += raquette1.mouv;
	if (raquette2.mouv != 0)
		raquette2.body[1] += raquette2.mouv;
	raquette1.draw();
	raquette2.draw();
	if (ball.advence() == 1 || w > 1000)
	{
		ctx.font = "100pt Calibri,Geneva,Arial";
		ctx.strokeStyle = "#000000";
		ctx.strokeText(point2 + " | " + point1, canvasWidth/2 - 150 , canvasHeigth/2);
		return (-1);
	}
	setTimeout(refrechBall, delayBall);
	//w++;
}

function refrechRaquette()
{
	
	setTimeout(refrechRaquette, delayRaquette);
	//w++;
}

window.onload = function()
{
	init();
	myRaquette = raquette1;
	//refrechRaquette();
	refrechBall();

}