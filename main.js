// Handle game loops and overall canvas display
function main(){
	createGrid();
	addEvents();
	select = 0;
	addTitleEvents();
	titleScreen();
}

// Level 1-related game loop.
function level1(){
	drawMenu('blue');
	context.drawImage(grassBackground, 0, 100, 900, 500);
	// Update Game Objects 
	updateGameGrid();
	updateTowers();
	updateProjectiles();
	updateResources();
	updateEnemies();
	chooseTower();
	updateGameStatus();
	// Increment time passing
	frame++;
	// Ends game loop at game over. 
	if(!(gameOver || victory) && select === 1 )requestAnimationFrame(level1); // creates recursive loop that redraws animation
}

// Level 2-related game loop.
function level2(){
	drawMenu('green');
	// Update Game Objects 
	updateGameGrid();
	updateTowers();
	updateProjectiles();
	updateResources();
	updateEnemies();
	chooseTower();
	updateGameStatus();
	// Increment time passing
	frame++;
	// Ends game loop at game over. 
	if(!(gameOver || victory) && select === 2 )requestAnimationFrame(level2); // creates recursive loop that redraws animation
}

// Level 3-related game loop.
function level3(){
	drawMenu('violet');
	context.drawImage(lavaBackground, 0, 100, 900, 500);
	// Update Game Objects 
	updateGameGrid();
	updateTowers();
	updateProjectiles();
	updateResources();
	updateEnemies();
	chooseTower();
<<<<<<< HEAD
	updateLava();
=======
>>>>>>> 1c093453e76ac538a3480593bfcbd60a891c10c5
	updateGameStatus();
	// Increment time passing
	frame++;
	// Ends game loop at game over. 
	if(!(gameOver || victory) && select === 3 )requestAnimationFrame(level3); // creates recursive loop that redraws animation
}

// Title Screen game loop
function titleScreen(){
	// Draw the Title Screen
	context.fillStyle = 'blue';
	context.fillRect(0,0, canvas.width, canvas.height);
	// Title Display
	context.fillStyle = 'gold';
	context.font = title.fontSize +'px Arial';
	context.fillText('HTML5', title.x, title.y);
	context.fillText('TOWER DEFENSE', title.x, title.y + title.fontSize + title.spacing);
	// Button Displays
	drawButton(titleButton1);
	drawButton(titleButton2);

	if (select === 0) requestAnimationFrame(titleScreen);
}

// Title Screen game loop
function levelSelectScreen(){
	// Draw the Title Screen
	context.fillStyle = 'blue';
	context.fillRect(0,0, canvas.width, canvas.height);
	// Title Display
	context.fillStyle = 'gold';
	context.font = levelSelect.fontSize +'px Arial';
	context.fillText('Level Select', levelSelect.x, levelSelect.y);
	// Button Displays
	drawButton(levelButton1);
	context.drawImage(grassBackground, 40, 210, 256, 256);
	strokedText('Level 1', 50, 460, '70px', 'white');
	drawButton(levelButton2);
	strokedText('Level 2', 326, 460, '70px', 'white');
	drawButton(levelButton3);
	context.drawImage(lavaBackground, 592, 210, 256, 256);
	strokedText('Level 3', 602, 460, '70px', 'white');
	drawButton(saveQuitButton);
	drawButton(noSaveQuitButton);
	// Display High Scores
	drawHighScores();

	if (select === -1) requestAnimationFrame(levelSelectScreen);
}

// Displays current high scores on the level screen
function drawHighScores(){
	strokedText('Best: ' + highscore3, 600, 250, 30, 'gold');

	strokedText('Best: ' + highscore2, 330, 250, 30, 'gold');

	strokedText('Best: ' + highscore1, 50, 250, 30, 'gold');
}


// Opens Level Select Screen on Click
function newLoadGame() {
	if (collision(mouse, titleButton1)) {
		// Reset data for new game
		resetScores();
		goToLevelSelect();
	}else if (collision(mouse, titleButton2)) {
		// Load stored data, if any.
		getCookie();
		goToLevelSelect();
	}
}

// Opens selected Level on Click
function startGame() {
	if (collision(mouse, levelButton1)) {
		select = 1;
		resetGameObjects();
		removeTitleEvents();
		removeLevelSelectEvents();
		addBoardEvents();
		level1();
	} else if (collision(mouse, levelButton2)) {
		select = 2;
		resetGameObjects();
		levelTime = SLOW_TIME;	// Reduced level time for level 2
		removeTitleEvents();
		removeLevelSelectEvents();
		addBoardEvents();
		level2();
	} else if (collision(mouse, levelButton3)) {
		select = 3;
		resetGameObjects();
		removeTitleEvents();
		removeLevelSelectEvents();
		addBoardEvents();
		level3();
	}
}

// Quits active game and goes to level select on click
function inGameQuit_press() {
	if (collision(mouse, inGameQuitButton)) {
		goToLevelSelect();
}}

// Restarts current Level on click
function tryAgain_press() {
	if ( (gameOver || victory) && (collision(mouse, tryAgainButton))) {
		console.log('try again clicked');
		restartLevel();
}}

// Return to Level Select on click
function quit_press() {
	if ( (gameOver || victory) && (collision(mouse, quitButton))) {
		console.log('quit clicked');
		goToLevelSelect();
}}

// Return to TitleScreen on click
function titleScreen_press() {
	if (collision(mouse, saveQuitButton)) {
		setCookie(); // Save game data
		goToTitle();
	}
	else if (collision(mouse, noSaveQuitButton)){
		goToTitle();
	}
}

// Check whether a tower was triggered to explode
function checkExplosion(){
	for (let i =0; i < towers.length; i++){
		if (collision(mouse, towers[i])){
			explodeTower(i);
		}
	}
}

// Starts the next wave on click
function rushWave_press(){
	if (collision(mouse, rushButton)) {
		rushWave = true;
	}
}

// Initiate Event Listeners related to System functions.
function addEvents(){
	canvas.addEventListener('mousedown', clickDown);
	canvas.addEventListener('mouseup', clickUp);
	canvas.addEventListener('mousemove', trackMouse);
	canvas.addEventListener('mouseleave', disableMouse);
	// Fix mouse offset when browser window resized
	window.addEventListener('resize', function(){
		canvasPosition = canvas.getBoundingClientRect();
	});
}

// Initiate Event Listeners related to a Level.
function addBoardEvents(){
	canvas.addEventListener('click', placeTower);
	canvas.addEventListener('click', inGameQuit_press);
	canvas.addEventListener('click', tryAgain_press);
	canvas.addEventListener('click', quit_press);
	canvas.addEventListener('click', rushWave_press);
	canvas.addEventListener('dblclick', checkExplosion);
}

// Remove Event Listeners related to a Level.
function removeBoardEvents(){
	canvas.removeEventListener('click', placeTower);
	canvas.removeEventListener('click', inGameQuit_press);
	canvas.removeEventListener('click', tryAgain_press);
	canvas.removeEventListener('click', quit_press);
	canvas.removeEventListener('click', rushWave_press);
	canvas.removeEventListener('dblclick', checkExplosion);
}

// Initiate Event Listeners for Title Screen
function addTitleEvents(){
	canvas.addEventListener('click', newLoadGame);
}

// Terminate Event Listeners for Title Screen
function removeTitleEvents(){
	canvas.removeEventListener('click', newLoadGame);
}

// Initiate Event Listeners for Level Select Screen
function addLevelSelectEvents(){
	canvas.addEventListener('click', startGame);
	canvas.addEventListener('click', titleScreen_press);
}

// Terminate Event Listeners for Level Select Screen
function removeLevelSelectEvents(){
	canvas.removeEventListener('click', startGame);
	canvas.removeEventListener('click', titleScreen_press);
}

main();
