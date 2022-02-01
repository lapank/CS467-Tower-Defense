let gameOver = false;		// When True, game is lost.
let victory = false;
let running;				// When true, gameloop runs.
let select = 0;				// Controls which screen to open 0:Title, -1:LevelSelect, 1:GameRunning
const winningScore = 100;	// Points needed to win

const title = {
	x: 40,
	y: 150,
	fontSize: 80,
	spacing: 5,
};

const levelSelect = {
	x: 160,
	y: 150,
	fontSize: 80,
};

const titleButton1 = {
	// text attributes
	x2: 100,
	y2: 350,
	fontSize: 60,
	textColor: "black",
	text: 'New Game',
	// button attributes
	x: 90,
	y: 290,
	width: 410,
	height: 80,
	color: "white", 
	borderColor: "black",
};

const titleButton2 = {
	// text attributes
	x2: 100,
	y2: 460 ,
	fontSize: 60,
	textColor: "black",
	text: 'Load Game',
	// button attributes
	x: 90,
	y: 400,
	width: 410,
	height: 80,
	color: "white", 
	borderColor: "black",
};

const levelButton1 = {
	// text attributes
	x2: 50,
	y2: 460 ,
	fontSize: 50,
	textColor: "black",
	text: 'Level 1',
	// button attributes
	x: 40,
	y: 210,
	width: 256,
	height: 256,
	color: "white", 
	borderColor: "black",
};

const levelButton2 = {
	// text attributes
	x2: 276 + 50,
	y2: 460 ,
	fontSize: 50,
	textColor: "black",
	text: 'Level 2',
	// button attributes
	x: 276 + 40,
	y: 210,
	width: 256,
	height: 256,
	color: "white", 
	borderColor: "black",
};

const levelButton3 = {
	// text attributes
	x2: 276*2 + 50,
	y2: 460 ,
	fontSize: 50,
	textColor: "black",
	text: 'Level 3',
	// button attributes
	x: 276*2 + 40,
	y: 210,
	width: 256,
	height: 256,
	color: "white", 
	borderColor: "black",
};

// Update Menu display
function updateGameStatus(){
	// Menu Display
	context.fillStyle = 'gold';
	context.font = '30px Orbitron';
	// Display Current Score
	context.fillText('Score: ' + score, 20, 45);				 
	// Display Current Resources
	context.fillText('Gold: ' + numberOfResources, 20, 80); 
	// Display Current Health
	context.fillStyle = 'red';
	context.fillRect(320, 50, 300, 35);
	context.fillStyle = 'green';
	context.fillRect(320, 50, 300*(playerHealth/maxPlayerHealth), 35);
	context.fillStyle= 'gold';
	context.fillText('Health: ' + Math.floor(playerHealth), 200, 80);
	// Checks for Game Over
	if(gameOver){
		console.log('gameover');
		context.fillStyle = 'black';
		context.font = '90px Orbitron';
		context.fillText('GAME OVER', 135, 330);
		setTimeout(goToTitle, 5000);
	}
	// Checks for win condition
	if (score >= winningScore && enemies.length === 0){
		console.log('win met');
		victory = true;
		context.fillStyle = 'black';
		context.font = '60px Orbitron';
		context.fillText('LEVEL COMPLETE', 130, 300);
		context.font = '30px Orbitron';
		context.fillText('You win with ' + score + ' points!', 134, 340);
		//resetGameObjects();
		setTimeout(goToTitle, 5000);
	}
}

// Take two game objects. Return true if they are colliding.
function collision(first, second){
	if (	!(	first.x > second.x + second.width ||
				first.x + first.width < second.x ||
				first.y > second.y + second.height ||
				first.y + first.height < second.y)
		) return true;
}

// Take a button struct. Create draw a button with that button's properties.
//   Required properties: x, y, fontSize, textColor, text,
//   x2, y2, width, height, color, borderColor
function drawButton(button){
	context.fillStyle = button.color;
	context.fillRect(button.x,button.y, button.width, button.height);
	context.beginPath();
	context.strokeStyle = button.borderColor;
	context.lineWidth = "6";
	context.rect(button.x, button.y, button.width, button.height);
	context.stroke();
	context.fillStyle = button.textColor;
	context.font = button.fontSize +'px Orbitron';
	context.fillText(button.text, button.x2, button.y2);
}

// Delete all existing game objects, reset all values.
function resetGameObjects(){
	enemies.splice(0, enemies.length);
	enemyPositions.splice(0, enemyPositions.length);
	projectiles.splice(0, projectiles.length);
	towers.splice(0, towers.length);
	resources.splice(0, resources.length);
	victory = false;
	gameOver = false;
	score = 0;
	numberOfResources = 500;
	playerHealth = maxPlayerHealth;
}

// Takes a number. Prepares and go to title screen after that many seconds.
function goToTitle(){
	select = 0;
	resetGameObjects();
	removeBoardEvents();
	addTitleEvents();
	titleScreen();
}
