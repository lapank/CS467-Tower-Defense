let gameOver = false;		// When True, game is lost.
let victory = false;
let running;				// When true, gameloop runs.
let select = 0;				// Controls which screen to open 0:Title, -1:LevelSelect, 1:GameRunning
							// Positive 'select' values correspond to each level (eg select = 3; Level 3 screen)
const maxWaves = 10;		// waves assigned to each level.
let waves = maxWaves;		// Player can only win when reaches 0.

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
	// button attributes
	x: 40,
	y: 210,
	width: 256,
	height: 256,
	borderColor: "black",
};

const levelButton2 = {
	x: 276 + 40,
	y: 210,
	width: 256,
	height: 256,
	color: "white", 
	borderColor: "black",
};

const levelButton3 = {
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

const saveQuitButton = {
	// text attributes
	x2: 370 - 150,
	y2: 515 + 30,
	fontSize: 40,
	textColor: "black",
	text: 'Save & Quit',
	// button attributes
	x: 360 - 150,
	y: 470 + 30,
	width: 480 - 200,
	height: 60,
	color: "white", 
	borderColor: "black",
};

const noSaveQuitButton = {
	// text attributes
	x2: 370 - 150,
	y2: 515 + 120,
	fontSize: 40,
	textColor: "black",
	text: 'Quit without Saving',
	// button attributes
	x: 360 - 150,
	y: 470 + 120,
	width: 390,
	height: 60,
	color: "white", 
	borderColor: "black",
};

const inGameQuitButton = {
	// text attributes
	x2: 820,
	y2: 35,
	fontSize: 20,
	textColor: "gold",
	text: 'Quit',
	// button attributes
	x: 810,
	y: 10,
	width: 70,
	height: 35,
	color: "red", 
	borderColor: "gray",
};

const rushButton = {
	// text attributes
	x2: 820 - 60,
	y2: 35 + 45,
	fontSize: 20,
	textColor: "red",
	text: 'RUSH WAVE',
	// button attributes
	x: 810 - 60,
	y: 10 + 45,
	width: 140,
	height: 35,
	color: "black", 
	borderColor: "red",
};

// Button where users select tower type
class TowerButton{
	constructor(x, bodyColor, fontColor, health, cost, sprite){
		this.x = x;
		this.y = 610;
		this.width = 170;
		this.height = 85;
		this.stroke = 'black';
		this.lineWidth = 5;
		this.bodyColor = bodyColor;
		this.fontColor = fontColor;
		this.font = '22px Arial';
		this.health = health;
		this.cost = cost;
		this.sprite = sprite;
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
		context.fillStyle = 'white';
		context.fillRect(this.x, this.y, this.width, this.height);
		context.fillStyle = this.bodyColor;
		context.fillRect(this.x, this.y, this.width/2, this.height);

		//Draw the appropriate sprite on the purchase menu button
		if (this.sprite == archerImage){
			context.drawImage(this.sprite, 0, 0, 32, 34, this.x + 15, this.y + 15, 85*0.7, this.height*0.7);
			plainText('Archer', this.x+90, this.y+20, '20px', 'black');
			plainText( 'Cost: ' + ARCHER_COST.toString() + 'g', this.x+90, this.y+40,'12px', 'black');
			plainText( 'HP: ' + Archer.staticHealth.toString(), this.x+90, this.y+55,'12px', 'black');
		}
		else if(this.sprite == dragonImage){
			context.drawImage(this.sprite, 0, 0, 82, 82, this.x-20, this.y-20, 85*1.5, this.height*1.5);
			plainText('Dragon', this.x+90, this.y+20, '20px', 'black');
			plainText( 'Cost: ' + DRAGON_COST.toString() + 'g', this.x+90, this.y+40,'12px', 'black');
			plainText( 'HP: ' + Dragon.staticHealth.toString(), this.x+90, this.y+55,'12px', 'black');
			plainText( 'Effect: Burn', this.x+90, this.y+70,'12px', 'black');
		}
		else if(this.sprite == wizardImage){
			context.drawImage(this.sprite, 0, 0, 82, 82, this.x-20, this.y-20, 85*1.8, this.height*1.8);
			plainText('Wizard', this.x+90, this.y+20, '20px', 'black');
			plainText( 'Cost: ' + WIZARD_COST.toString() + 'g', this.x+90, this.y+40,'12px', 'black');
			plainText( 'HP: ' + Wizard.staticHealth.toString(), this.x+90, this.y+55,'12px', 'black');
			plainText( 'Effect: Freeze', this.x+90, this.y+70,'12px', 'black');
		}

		context.strokeStyle = this.stroke;
		context.strokeRect(this.x, this.y, this.width, this.height);

	}
}

// Draw buttons
const tower1 = new TowerButton(180, 'saddlebrown', 'white', 100, ARCHER_COST, archerImage);
const tower2 = new TowerButton(370, 'lime', 'black', 150, DRAGON_COST, dragonImage);
const tower3 = new TowerButton(550, 'skyblue', 'gold', 75, WIZARD_COST, wizardImage);


// Create game menu and elements
function chooseTower(){
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

// Control Game text style from this function
function strokedText(text, x, y, fontSize, fontColor) {
    context.font = fontSize + ' Arial';
    context.strokeStyle = 'black';
    context.lineWidth = 8;
    context.strokeText(text, x, y);
    context.fillStyle = fontColor;
    context.fillText(text, x, y);
}

// Control Game text style from this function
function plainText(text, x, y, fontSize, fontColor) {
    context.font = fontSize + ' Arial';
    context.fillStyle = fontColor;
    context.fillText(text, x, y);

}

// Update Menu display
function updateGameStatus(){
	// Menu Display
	context.fillStyle = 'gold';
	context.font = '30px Arial';
	// Display Current Score
	context.fillText('Score: ' + score, 20, 45);				 
	// Display Current Resources
	context.fillText('Gold: ' + numberOfResources, 20, 80); 
	// Display Current Health
	drawHealth();
	// Display Game Timer
	updateTimes();
	drawTimer(mins, secs);
	// Checks for Game Over
	if(gameOver){
		console.log('gameover');
		strokedText('GAME OVER', 135, 330, '100px', 'white');
		// Exit the gameover screen
		saveHighScore();
		drawButton(tryAgainButton);
		drawButton(quitButton);
	}
	// Checks for win condition
	if ((waves <= 0) && (enemies.length === 0) && (playerHealth > 0)){
		console.log('win met');
		victory = true;
		strokedText('LEVEL COMPLETE', 130, 300, '70px', 'white');
		strokedText('You win with ' + score + ' points!', 280, 340, '30px', 'white');
		// Exit the win screen
		saveHighScore();
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

// Update the minutes and seconds of the current times
function updateTimes(){
	// Get time elapsed so far.
	let currentTime = performance.now();
	let secsElapsed = (currentTime - startTime) / 1000;
	// Determine time left in the level
	let remaining = levelTime - secsElapsed;
	// End game if no time left
	if (remaining <= 0.) gameOver = true;
	// Calculate remaining seconds and minutes
	secs = Math.floor( remaining % 60 );
	mins = Math.floor( (remaining - secs) / 60 );
}

// Pads an integer with zeros to two places
function pad2 (num){
	return String(num).padStart(2, '0');
}

// Draws the timer on the board
function drawTimer(mins, secs){
	context.font = 'bold 35px Arial';
	context.fillStyle = 'gold';
	if (mins < 2) context.fillStyle = 'red';
	if (mins < 1 && secs < 1) context.fillText('Time Out', 200, 40);
	else context.fillText(pad2(mins) + ':' + pad2(secs), 200, 40);
}

// Draws the player's health bar
function drawHealth(){
	context.font = '30px Arial';
	context.fillStyle = 'red';
	context.fillRect(300, 50, 300, 35);
	context.fillStyle = 'green';
	context.fillRect(300, 50, 300*(playerHealth/maxPlayerHealth), 35);
	context.fillStyle= 'gold';
	context.fillText('Health: ' + Math.floor(playerHealth), 200, 80);
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
	context.font = button.fontSize +'px Arial';
	context.fillText(button.text, button.x2, button.y2);
}

// Delete all existing game objects, reset all values.
function resetGameObjects(){
	enemies.splice(0, enemies.length);
	enemyPositions.splice(0, enemyPositions.length);
	projectiles.splice(0, projectiles.length);
	towers.splice(0, towers.length);
	lavaTarget.splice(0, lavaTarget.length);
	lavaPosition.splice(0, lavaPosition.length);
	victory = false;
	gameOver = false;
	score = 0;
	waves = maxWaves;
	numberOfResources = MAX_RESOURCES;
	playerHealth = maxPlayerHealth;
	waveMessageDisplay = 0;
	rushWave = false;
	adjustInterval = 0;
	frame = 0;
	startTime = performance.now();
	levelTime = TIME_LIMIT;
	lavaInterval = START_LAVA_INTERVAL;
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
			levelTime = SLOW_TIME;
			level2();
			break;
		case 3:

			level3();
			break;
	}
}
