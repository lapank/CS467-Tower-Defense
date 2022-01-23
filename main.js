// Handle game loops and overall canvas display
function main(){
	createGrid();
	addEvents();
	select = 0;
	addTitleEvents();
	titleScreen();
	//levelSelectScreen();
}

// Level 1-related game loop.
function level1(){
	context.clearRect(0,0,canvas.width,canvas.height);
	// Draw the Menu bar
	context.fillStyle = 'blue';
	context.fillRect(0,0, menuBar.width, menuBar.height);
	// Update Game Objects 
	updateGameGrid();
	updateTowers();
	updateProjectiles();
	updateEnemies();
	updateResources();
	updateGameStatus();
	// Increment time passing
	frame++;
	// Ends game loop at game over. 
	if(!(gameOver || victory) && select === 1 )requestAnimationFrame(level1); // creates recursive loop that redraws animation
}

// Level 2-related game loop.
function level2(){
	context.clearRect(0,0,canvas.width,canvas.height);
	// Draw the Menu bar
	context.fillStyle = 'black';
	context.fillRect(0,0, menuBar.width, menuBar.height);
	// Update Game Objects 
	updateGameGrid();
	updateTowers();
	updateProjectiles();
	updateEnemies();
	updateResources();
	updateGameStatus();
	// Increment time passing
	frame++;
	// Ends game loop at game over. 
	if(!(gameOver || victory) && select === 1 )requestAnimationFrame(level2); // creates recursive loop that redraws animation
}

// Level 3-related game loop.
function level3(){
	context.clearRect(0,0,canvas.width,canvas.height);
	// Draw the Menu bar
	context.fillStyle = 'violet';
	context.fillRect(0,0, menuBar.width, menuBar.height);
	// Update Game Objects 
	updateGameGrid();
	updateTowers();
	updateProjectiles();
	updateEnemies();
	updateResources();
	updateGameStatus();
	// Increment time passing
	frame++;
	// Ends game loop at game over. 
	if(!(gameOver || victory) && select === 1 )requestAnimationFrame(level3); // creates recursive loop that redraws animation
}

// Title Screen game loop
function titleScreen(){
	// Draw the Title Screen
	context.fillStyle = 'blue';
	context.fillRect(0,0, canvas.width, canvas.height);
	// Title Display
	context.fillStyle = 'gold';
	context.font = title.fontSize +'px Orbitron';
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
	context.font = levelSelect.fontSize +'px Orbitron';
	context.fillText('Level Select', levelSelect.x, levelSelect.y);
	// Button Displays
	drawButton(levelButton1);
	drawButton(levelButton2);
	drawButton(levelButton3);

	if (select === -1) requestAnimationFrame(levelSelectScreen);
}

// Initiate Event Listeners related to System functions.
function addEvents(){
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
}

// Remove Event Listeners related to a Level.
function removeBoardEvents(){
	canvas.removeEventListener('click', placeTower);
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
}

// Terminate Event Listeners for Level Select Screen
function removeLevelSelectEvents(){
	canvas.removeEventListener('click', startGame);
}

// Opens Level Select Screen on Click
function newLoadGame() {
	if (collision(mouse, titleButton1)) {
		select = -1;
		removeTitleEvents();
		removeBoardEvents();
		addLevelSelectEvents();
		levelSelectScreen();
	}else if (collision(mouse, titleButton2)) {
		select = -1;
		removeTitleEvents();
		removeBoardEvents();
		addLevelSelectEvents();
		levelSelectScreen();
	}
}

// Opens selected Level on Click
function startGame() {
	if (collision(mouse, levelButton1)) {
		select = 1;
		victory = false;
		gameOver = false;
		removeTitleEvents();
		removeLevelSelectEvents();
		addBoardEvents();
		level1();
	} else if (collision(mouse, levelButton2)) {
		select = 1;
		victory = false;
		gameOver = false;
		removeTitleEvents();
		removeLevelSelectEvents();
		addBoardEvents();
		level2();
	} else if (collision(mouse, levelButton3)) {
		select = 1;
		victory = false;
		gameOver = false;
		removeTitleEvents();
		removeLevelSelectEvents();
		addBoardEvents();
		level3()
	}
}

main();
