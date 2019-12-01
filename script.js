//canvas
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

//images
var slime = new Image();
var slame = new Image();
var background = new Image();
background.src = "back.png";//2000x2000
slime.src = "slime.png"; //1024x576
slame.src = "slame.png"; //1024x576
//audio
var bgSound = new Audio();
bgSound.src = "hall.mp3";
bgSound.volume = 0.5;
//hpBar colors
var colors = ["#00FF00","#FF971F","#FF0000"]
var barColor = "#00FF00";

var sprites = [slime, slame];
var spriteCount = 0;

//values of progress
var count = 0;
var lvl = 1;
var price = 10;
var clickValue = 1;
var currentHp = 10;
var totalHp = 10;

//coordinates
var x = 550;
var y = 270;
var w = 200;
var h = 300;
var px = x;
var py = y;
var ph = h;
var pw = w;
var xHpBar = 620;

//switches
var brah = false;
var grah = false;
var mrah = false;
var frah = false;
var vrah = false;
var death = false;

//counters
var mrahCount = 0;
var frahCount = 0;

var oldCurent = 2;
var hpBarDis = 0;

slame.onload = draw;

canvas.addEventListener("click", clicke);
document.onselectstart = falsee;

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	drawEnemy();
	countView();
	bgSound.play();
	vibratione(0.5,40);
	bigVibration();
	requestAnimationFrame(draw);
}

function vibratione(kof,frontier) {
	if (mrahCount == 0) {
		mrah = false;
	}
	if (mrahCount == frontier) {
		mrah = true;
	}
	if (mrah == false && frah != true) {
		x -= kof;
		y -= kof;
		h += 2*kof;
		w += 2* kof;
		mrahCount++;
	}
	if (mrah == true && frah != true) {
		x += kof;
		y += kof;
		h -= 2*kof;
		w -= 2* kof;
		mrahCount--;
	}
}

function damage() {
	frah = true;
}

function bigVibration() {
	if (frah == true) {
	x = px - 30;
	y = py - 30;
	w = pw + 60;
	h = ph + 60;
	frahCount++;
	if (frahCount == 30) {
		frah = false;
		frahCount = 0;
		x = px;
		y = py;
		w = pw;
		h = ph;
	}
	}
}

function drawEnemy() {
	if (death == false){
		context.drawImage(sprites[spriteCount], x, y, w, h);
		hpBarColor();
		context.fillStyle = barColor;
		context.fillRect(px+55-hpBarDis, y-34, pw-125+(hpBarDis*2), 24);
	   	context.fillStyle = "#000";
	    context.font = "normal 20px arial serif";
	    context.fillText(currentHp+"/"+totalHp, xHpBar, y-15);
	    if (currentHp <= 0) {   	
			totalHp = Math.floor(totalHp*2); 
			count = Math.floor(count + clickValue*2.5);
			currentHp = totalHp;
			spriteCount++;
			deathe();
			hpBarDisplacement();
			if (spriteCount == sprites.length) {
				spriteCount = 0;
			}
		}
	}
}
function hpBarDisplacement() {
	var newCurent = currentHp.toString().length;
	if (newCurent > oldCurent) {
		oldCurent = newCurent;
		xHpBar -= 10;
		hpBarDis +=10;
	}
}


function falsee() {
	return false;
}

function clicke(e) {
	if(e.clientX  < x+w+50 && e.clientX  > x-50 && e.clientY > y-50 && e.clientY < y+h+50 && death == false) {
	count += clickValue;
	damage();
	currentHp -= clickValue;
	}
	if(e.clientX  < 865 && e.clientX  > 605 && e.clientY > 125 && e.clientY <165) {
		lvlUpe();
	}
}

function countView() {
	context.fillStyle = "#000";
    context.font = "normal 30px arial serif";
    context.fillText("Деньги: "+count, 344, 40);
    context.fillText("Урон: "+clickValue, 860, 40);
    context.fillText("Для повышение уровня требуется "+price+" монет", 10, 80);
    context.fillText("Уровень даст +"+lvl+" к урону", 860, 80);
	context.fillStyle = '#FFF'; //button
	context.fillRect(575, 115, 245, 35);
	context.fillStyle = "#000";
    context.fillText("Повысить уровень", 580, 140);
    context.strokeStyle = '#FF0000';
    context.lineWidth = 2;
    context.strokeRect(575, 115, 245, 35);
}       


function lvlUpe() {
	if (count>=price){
		clickValue+=lvl;
		count -= price;
		lvl+=Math.floor(lvl*1.5);
		price *= 3;
		if (grah == false && lvl > 12){
			passiveEarning();
			grah = true;
		}
		if (vrah == false && clickValue > 20) {
			passiveDamage()
			vrah = true;
		}
	}
}

function passiveEarning() {
	setInterval(function() {count += Math.floor(lvl/16);},500);
}

function passiveDamage() {
	setInterval(function() {currentHp -= Math.floor(clickValue/16);},500);
}

function hpBarColor() {
	if (currentHp >  totalHp*0.5) {
		barColor = colors[0];
	}
	if (currentHp < totalHp*0.5) {
		barColor = colors[1];
	}
	if (currentHp < totalHp*0.2) {
		barColor = colors[2];
	}
}

function deathe() {
	death = true;
	setTimeout(function() {
		death = false;	
		requestAnimationFrame(draw);
	},500);
}