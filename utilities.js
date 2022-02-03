let gameOver = false;		// When True, game is lost.
let victory = false;
let running;				// When true, gameloop runs.
let select = 0;				// Controls which screen to open 0:Title, -1:LevelSelect, 1:GameRunning
							// Positive 'select' values correspond to each level (eg select = 3; Level 3 screen)
const winningScore = 6;	// Points needed to win


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

const quitButton = {
	// text attributes
	x2: 370,
	y2: 530,
	fontSize: 60,
	textColor: "black",
	text: 'Quit',
	// button attributes
	x: 360,
	y: 470,
	width: 160,
	height: 80,
	color: "white", 
	borderColor: "black",
};

const tryAgainButton = {
	// text attributes
	x2: 370 - 90,
	y2: 530 - 100,
	fontSize: 60,
	textColor: "black",
	text: 'Try Again',
	// button attributes
	x: 360 - 90,
	y: 470 - 100,
	width: 345,
	height: 80,
	color: "white", 
	borderColor: "black",
};

const mainMenuButton = {
	// text attributes
	x2: 370 - 150,
	y2: 515 + 30,
	fontSize: 40,
	textColor: "black",
	text: 'Back to Title Screen',
	// button attributes
	x: 360 - 150,
	y: 470 + 30,
	width: 480,
	height: 60,
	color: "white", 
	borderColor: "black",
};

// Update Menu display and Handle EndGame
// Creat game menu and elements
function chooseTower(){

	// Button where users select tower type
	class TowerButton{
		constructor(x, bodyColor, fontColor, health, cost){
			this.x = x;
			this.y = 610;
			this.width = 85;
			this.height = 85;
			this.stroke = 'black';
			this.lineWidth = 5;
			this.bodyColor = bodyColor;
			this.fontColor = fontColor;
			this.font = '30px Orbitron';
			this.health = health;
			this.cost = cost;
		}
		draw(){
			// Changes the button's border to highlight the selected tower.
			if (towerSelector=== 1){
				tower1.stroke = 'gold';
				tower2.stroke = 'black';
				tower3.stroke = 'black';
			}else if (towerSelector === 2){
				tower1.stroke = 'black';
				tower2.stroke = 'gold';
				tower3.stroke = 'black';
			}else if (towerSelector === 3){
				tower1.stroke = 'black';
				tower2.stroke = 'black';
				tower3.stroke = 'gold';
			}else{
				tower1.stroke = 'black';
				tower2.stroke = 'black';
				tower3.stroke = 'black';
			}

			context.lineWidth = this.lineWidth;
			context.fillStyle = this.bodyColor;
			context.fillRect(this.x, this.y, this.width, this.height);
			context.strokeStyle = this.stroke;
			context.strokeRect(this.x, this.y, this.width, this.height);
			context.fillStyle = this.fontColor;
			context.font = this.font;
			context.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
			context.fillStyle = 'gold';
			context.font = '20px Orbitron';
			context.fillText(Math.floor(this.cost)  + 'g', this.x + 5, this.y + 75);

		}
	}

	let tower1 = new TowerButton(305, 'saddlebrown', 'white', 100, towerCost);
	let tower2 = new TowerButton(400, 'lime', 'black', 150, towerCost);
	let tower3 = new TowerButton(495, 'skyblue', 'gold', 75, towerCost);

	if(collision(mouse, tower1) && mouse.clicked){
		towerSelector = 1;
	} else if (collision(mouse, tower2) && mouse.clicked){
		towerSelector = 2;
	} else if (collision(mouse, tower3) && mouse.clicked){
		towerSelector = 3;
	}

	tower1.draw();
	tower2.draw();
	tower3.draw();


}

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

		// Exit the gameover screen
		drawButton(tryAgainButton);
		drawButton(quitButton);

	}
	// Checks for win condition
	if ((score >= winningScore) && (enemies.length === 0) && (playerHealth > 0)){
		console.log('win met');
		victory = true;
		context.fillStyle = 'black';
		context.font = '60px Orbitron';
		context.fillText('LEVEL COMPLETE', 130, 300);
		context.font = '30px Orbitron';
		context.fillText('You win with ' + score + ' points!', 134, 340);
		
		// Exit the win screen
		drawButton(tryAgainButton);
		drawButton(quitButton);

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

// Prepare and go to title screen.
function goToTitle(){
	select = 0;
	resetGameObjects();
	removeBoardEvents();
	removeLevelSelectEvents();
	addTitleEvents();
	titleScreen();
}

// Prepares and go to Level Select screen.
function goToLevelSelect(){
	select = -1;
	resetGameObjects();
	removeBoardEvents();
	removeTitleEvents();
	addLevelSelectEvents();
	levelSelectScreen();
}

// Prepares and go to Level Select screen.
function restartLevel(){
	resetGameObjects();
	switch (select){
		case 1:
			level1();
			break;
		case 2:
			level2();
			break;
		case 3:
			level3();
			break;
	}
}