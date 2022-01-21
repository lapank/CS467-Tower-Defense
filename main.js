
function main(){
	context.clearRect(0,0,canvas.width,canvas.height);
	
	
}

function animate(){
	context.clearRect(0,0,canvas.width,canvas.height);
	// Draw the Menu bar
	context.fillStyle = 'blue';
	context.fillRect(0,0,menuBar.width, menuBar.height);

	handleGameGrid();
	handleTowers();
	handleProjectiles();
	handleEnemies();
	handleResources();
	handleGameStatus();
	frame++;
	if(!gameOver)requestAnimationFrame(animate); // creates recursive loop that redraws animation
}

function addEvents(){
	canvas.addEventListener('mousemove', trackMouse);
	canvas.addEventListener('mouseleave', disableMouse);
}

function addBoardEvents(){
	canvas.addEventListener('click', placeTower);
}

createGrid();
addEvents();
addBoardEvents();
animate();

