// Handle game loops and overall canvas display
function main(){
	context.clearRect(0,0,canvas.width,canvas.height);
	createGrid();
	addEvents();
	addBoardEvents();
	animate();
}

// Maintain Level-related game loop.
function animate(){
	context.clearRect(0,0,canvas.width,canvas.height);
	// Draw the Menu bar
	context.fillStyle = 'blue';
	context.fillRect(0,0,menuBar.width, menuBar.height);
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

main();
