// Handle game loops and overall canvas display
function main(){
	createGrid();
	addEvents();

	//canvas.addEventListener('click', startGame);
	//titleScreen();
	addBoardEvents();
	animate();
}


// Maintain Level-related game loop.
function animate(){
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
	if(!gameOver)requestAnimationFrame(animate); // creates recursive loop that redraws animation
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

	requestAnimationFrame(titleScreen);
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

// Opens selected Level on Click
function startGame() {
	canvas.removeEventListener( )
	addBoardEvents();
	animate();
}

main();
