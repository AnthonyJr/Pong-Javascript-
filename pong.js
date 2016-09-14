var pong1; 
var pong2; 
var ball; 
var balldir = 0; 
var speed = 1;
var pong2speed = 2;
var ping; 



function start() {
	pong1 = new paddle(15,90, "white", 0, 120);
	pong2 = new paddle(15,90, "white", 605, 200);
	ball = new paddle(25,25, "ball.png", 310,135, "image");
   	gameArea.start();

}

var gameArea = {
	canvas: document.createElement("canvas"), 
	start: function(){
		this.canvas.width = 620; 
		this.canvas.height = 270; 
		this.context = this.canvas.getContext("2d"); 
		document.body.insertBefore(this.canvas, document.body.childNodes[0]); 
		this.interval = setInterval(updateGameArea,20);
	}, 

	clear : function() {
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}
}


function paddle(width, height, color, x, y, type){
	this.type = type;
	if (type == "image"){
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width; 
	this.height = height; 
	this.x = x; 
	this.y = y; 
    this.update = function(){
        ctx = gameArea.context;
        if (type == "image"){
        	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
	        ctx.fillStyle = color;
	        ctx.fillRect(this.x, this.y, this.width, this.height);	
        }

    }

}



function updateGameArea(){
	 gameArea.clear();
	 listen();
	 showCoords();
	 movePong2();
	 pong1.update();
	 pong2.update();
	 moveBall();
}

function keycode(event){
	var x = event.which || event.keyCode; 
	document.getElementById("unicode").innerHTML = "The unicode value is: " + x;
	console.log(typeof(event.which));
}

function showCoords(event){
	document.onclick = function(e){
		var x = e.clientX;
		var y = e.clientY;
		var coor = "X coords: " + x + ", Y coords: " + y;
		console.log(coor);
	}

}

function listen() {
	document.onkeypress= function(e){
		var x = e.which || e.keyCode; 
		if (x == 119){
			pong1.y -=10;
		} else if (x == 115) {
			pong1.y +=10;
		}
	}
}



function moveBall(){
	if (ball.x == 310 && ball.y == 135){
		balldir = 315;
	}
	switch (balldir) {
		case 45:
			upRight();
			if (ball.y <0) {
				balldir = 315;
			}

			if (ball.x == 600 && ball.y >= pong2.y  -90 ) {
				balldir = 135;
			}



			break; 

		case 135:
			upLeft();
			if (ball.y < 0){
				balldir = 225;
			} 

			if (ball.x == pong1.x && ball.y >= (pong1.y - 90)) {
				balldir = 45;
			}
			break;

		case 225: 
			downLeft();
			if (ball.y > 270) {
				balldir = 135;
			} 

			if ((ball.x == pong1.x) && ball.y >= (pong1.y - 90)) {
				balldir = 315;
			}
			break;
		case 315:
			downRight();
			if (ball.y > 270) {
				balldir = 45;
			}
			if (ball.x == 600 && ball.y >= pong2.y  -90 ) {
				balldir = 225;
			}
			break;
		default:
			break;			

	}
}






function movePong2(){
	while (ball.y < pong2.y  +45){
		pong2.y-=pong2speed;
	}
	while (ball.y> pong2.y +45){
		pong2.y+=pong2speed;
	}


}





// move ball functions
function downRight(){
	ball.y+=speed;
	ball.x +=speed;
	ball.update();
}

function upLeft(){
	ball.y -=speed;
	ball.x -=speed;
	ball.update();
}

function upRight(){
	ball.y -=speed; 
	ball.x +=speed;
	ball.update();
}

function downLeft(){
	ball.y +=speed; 
	ball.x -=speed;
	ball.update();
}





